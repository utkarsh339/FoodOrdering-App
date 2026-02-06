using System.ComponentModel.DataAnnotations;

namespace FoodOrdering.Backend.DTOs
{
    public class CreateMenuItemRequestDto
    {
        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [Required]
        [Range(1, 100000)]
        public decimal Price { get; set; }
    }
}
