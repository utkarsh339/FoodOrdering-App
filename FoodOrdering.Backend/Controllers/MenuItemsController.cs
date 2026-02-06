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
    [Route("api/menu-items")]
    [Authorize(Roles ="Restaurant")]
    public class MenuItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MenuItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMenuItem(CreateMenuItemRequestDto request)
        {
            var ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if(ownerIdClaim == null)
            {
                return Unauthorized();
            }

            var ownerId = Guid.Parse(ownerIdClaim.Value);

            var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.OwnerId == ownerId);

            if(restaurant == null)
            {
                return BadRequest("Restaurant not found for this user");
            }

            var menuItem = new MenuItem
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                RestaurantId = restaurant.Id,
                IsAvailable = true
            };

            _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                menuItem.Id,
                menuItem.Name,
                menuItem.Price,
                menuItem.IsAvailable
            });
        }
    }
}
