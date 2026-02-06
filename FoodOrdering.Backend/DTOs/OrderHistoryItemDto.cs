namespace FoodOrdering.Backend.DTOs
{
    public class OrderHistoryItemDto
    {
        public Guid OrderId { get; set; }
        public decimal TotalAmount { get; set; }
        public int Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
