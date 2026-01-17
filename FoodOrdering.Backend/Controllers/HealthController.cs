using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace FoodOrdering.Backend.Controllers
{
    [ApiController]
    [Route("api/health")]
    [Authorize]
    public class HealthController : ControllerBase
    {
        public IActionResult Get()
        {
            return Ok(new { status = "Healthy & Authorized" });
        }
    }
}
