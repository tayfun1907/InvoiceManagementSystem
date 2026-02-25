using InvoiceApi.Data;
using InvoiceApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InvoiceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InvoiceController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("save")]
        public IActionResult Save([FromBody] Invoice invoice)
        {
            if (invoice == null) return BadRequest("Fatura verisi boş olamaz.");

            if (string.IsNullOrEmpty(invoice.InvoiceNumber))
                return BadRequest("Fatura numarası zorunludur.");

            if (invoice.CustomerId <= 0)
                return BadRequest("Geçerli bir müşteri seçilmelidir.");

            if (invoice.Lines == null || !invoice.Lines.Any())
                return BadRequest("En az bir fatura kalemi eklemelisiniz.");

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    invoice.RecordDate = DateTime.Now;

                    _context.Invoices.Add(invoice);

                    _context.SaveChanges();

                    transaction.Commit();

                    return Ok(invoice);
                }
                catch (Exception ex)
                {
                    transaction.Rollback();

                    return StatusCode(500, "Fatura kaydedilirken teknik bir hata oluştu.");
                }
            }
        }
        [HttpGet("get/{id}")]
        public IActionResult GetById(int id)
        {
            var invoice = _context.Invoices
                .Include(x => x.Lines)
                .FirstOrDefault(x => x.InvoiceId == id);

            if (invoice == null) return NotFound();

            return Ok(invoice);
        }
        [HttpPut("update")]
        public IActionResult Update(Invoice input)
        {
            var existingInvoice = _context.Invoices
                .Include(x => x.Lines)
                .FirstOrDefault(x => x.InvoiceId == input.InvoiceId);

            if (existingInvoice == null) return NotFound();

            existingInvoice.InvoiceNumber = input.InvoiceNumber;
            existingInvoice.InvoiceDate = input.InvoiceDate;
            existingInvoice.CustomerId = input.CustomerId;
            existingInvoice.TotalAmount = input.TotalAmount;

            _context.InvoiceLines.RemoveRange(existingInvoice.Lines);
            existingInvoice.Lines = input.Lines;

            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var invoice = _context.Invoices.Find(id);

                    if (invoice == null)
                    {
                        return NotFound(new { message = "Fatura bulunamadı." });
                    }

                    var lines = _context.InvoiceLines.Where(x => x.InvoiceId == id).ToList();
                    if (lines.Any())
                    {
                        _context.InvoiceLines.RemoveRange(lines);
                    }

                    _context.Invoices.Remove(invoice);

                    _context.SaveChanges();

                    transaction.Commit();

                    return Ok(new { message = "Fatura ve bağlı kalemler başarıyla silindi." });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(500, new { message = "Silme işlemi sırasında teknik bir hata oluştu." });
                }
            }
        }

        [HttpGet("list")]
        public IActionResult List(DateTime startDate, DateTime endDate)
        {
            var list = _context.Invoices
                .Where(x => x.InvoiceDate >= startDate && x.InvoiceDate <= endDate)
                .ToList();

            return Ok(list);
        }
    }
}
