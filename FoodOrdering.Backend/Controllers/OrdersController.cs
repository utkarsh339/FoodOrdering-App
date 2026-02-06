using FoodOrdering.Backend.Data;
using FoodOrdering.Backend.DTOs;
using FoodOrdering.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FoodOrdering.Backend.Controllers
{
    [ApiController]
    [Route("api/orders")]
    [Authorize(Roles ="Customer")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromBody] CreateOrderRequestDto request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            var userId = Guid.Parse(userIdClaim.Value);

            var restaurant = await _context.Restaurants
                .FirstOrDefaultAsync(r => r.Id == request.RestaurantId && r.IsOpen);

            if (restaurant == null)
                return BadRequest("Invalid or closed restaurant");

            var menuItemIds = request.Items.Select(i => i.MenuItemId).ToList();

            var menuItems = await _context.MenuItems
                .Where(m => menuItemIds.Contains(m.Id) && m.RestaurantId == restaurant.Id && m.IsAvailable).ToListAsync();

            if (menuItems.Count != request.Items.Count)
                return BadRequest("One or more menu items are invalid");

            var order = new Order
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                RestaurantId = restaurant.Id,
                Status = OrderStatus.Placed
            };

            decimal totalAmount = 0;
            var orderItems = new List<OrderItem>();

            foreach (var item in request.Items)
            {
                var menuItem = menuItems.First(m => m.Id == item.MenuItemId);

                totalAmount += menuItem.Price * item.Quantity;

                orderItems.Add(new OrderItem
                {
                    Id = Guid.NewGuid(),
                    OrderId = order.Id,
                    MenuItemId = menuItem.Id,
                    ItemName = menuItem.Name,
                    Price = menuItem.Price,
                    Quantity = item.Quantity
                });
            }

            order.TotalAmount = totalAmount;

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                _context.Orders.Add(order);
                _context.OrderItems.AddRange(orderItems);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }

            return Ok(new
            {
                order.Id,
                order.Status,
                order.TotalAmount,
                order.CreatedAt
            });
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            var userId = Guid.Parse(userIdClaim.Value);

            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .Select(o => new OrderHistoryItemDto
                {
                    OrderId = o.Id,
                    TotalAmount = o.TotalAmount,
                    Status = (int)o.Status,
                    CreatedAt = o.CreatedAt
                })
                .ToListAsync();

            return Ok(orders);
        }
    }
}
