using FoodOrdering.Backend.Data;
using FoodOrdering.Backend.DTOs;
using FoodOrdering.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

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
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetOpenRestaurants()
        {
            var restaurants = await _context.Restaurants.Where(r => r.IsOpen).Select(r => new RestaurantListItemDto
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                Address = r.Address
            }).ToListAsync();
            return Ok(restaurants);
        }

        [HttpGet("{id:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRestaurantById(Guid id)
        {
            var restaurant = await _context.Restaurants.Where(r => r.Id == id && r.IsOpen).Select(r => new RestaurantDetailsDto
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                Address = r.Address,
                IsOpen = r.IsOpen
            }).FirstOrDefaultAsync();

            if(restaurant == null)
            {
                return NotFound("Restaurant not found");
            }
            return Ok(restaurant);
        }
    }
}
