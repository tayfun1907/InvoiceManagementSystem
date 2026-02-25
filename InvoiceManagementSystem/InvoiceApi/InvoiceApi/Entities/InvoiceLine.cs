namespace InvoiceApi.Entities
{
    public class InvoiceLine
    {
        public int InvoiceLineId { get; set; }
        public int InvoiceId { get; set; }
        public string ItemName { get; set; }
        public int Quentity { get; set; }
        public decimal Price { get; set; }
        public int UserId { get; set; }
        public DateTime RecordDate { get; set; }
    }
}
