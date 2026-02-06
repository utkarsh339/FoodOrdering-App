using System.ComponentModel.DataAnnotations;

namespace FoodOrdering.Backend.DTOs
{
    public class CreateOrderRequestDto
    {
        [Required]
        public Guid RestaurantId { get; set; }

        [Required]
        public List<OrderItemRequestDto> Items { get; set; } = new();
    }

    public class OrderItemRequestDto
    {
        [Required]
        public Guid MenuItemId { get; set; }

        [Required]
        [Range(1, 20)]
        public int Quantity { get; set; }
    }
}
