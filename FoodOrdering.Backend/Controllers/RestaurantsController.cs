using FoodOrdering.Backend.Data;
using FoodOrdering.Backend.DTOs;
using FoodOrdering.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodOrdering.Backend.Controllers
{
    [ApiController]
    [Route("api/restaurants")]
    [Authorize(Roles = "Restaurant")]
    public class RestaurantsController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RestaurantsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateRestaurant(CreateRestaurantRequestDto request)
        {
            var ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if(ownerIdClaim == null)
            {
                return Unauthorized();
            }
            var ownerId = Guid.Parse(ownerIdClaim.Value);

            var restaurant = new Restaurant
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Description = request.Description,
                Address = request.Address,
                OwnerId = ownerId,
                IsOpen = true
            };
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                restaurant.Id,
                restaurant.Name,
                restaurant.Address,
                restaurant.IsOpen
            });
        }
    }
}
