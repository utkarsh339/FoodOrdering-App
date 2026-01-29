using System.ComponentModel.DataAnnotations;

namespace FoodOrdering.Backend.DTOs
{
    public class CreateRestaurantRequestDto
    {
        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [Required]
        [MaxLength(300)]
        public string Address { get; set; } = string.Empty;
    }
}
