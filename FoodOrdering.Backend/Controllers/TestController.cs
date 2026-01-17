using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrdering.Backend.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController: ControllerBase
    {
        [HttpGet("customer")]
        [Authorize(Roles = "Customer")]
        public IActionResult CustomerOnly()
        {
            return Ok("Customer access granted");
        }

        [HttpGet("restaurant")]
        [Authorize(Roles = "Restaurant")]
        public IActionResult RestaurantOnly()
        {
            return Ok("Restaurant Access Granted");
        }

        [HttpGet("admin")]
        [Authorize(Roles = "Admin")]
        public IActionResult AdminOnly()
        {
            return Ok("Admin access granted");
        }
    }
}
