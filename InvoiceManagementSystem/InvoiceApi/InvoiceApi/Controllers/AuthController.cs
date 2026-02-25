using InvoiceApi.Data;
using InvoiceApi.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace InvoiceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login(User input)
        {
            string hashedPassword = GetMd5Hash(input.Password);

            var user = _context.Users
                .FirstOrDefault(x => x.UserName == input.UserName && x.Password == hashedPassword);

            if (user == null)
                return Unauthorized("Kullanıcı bulunamadı");

            return Ok(user);
        }

        [HttpPost("register")]
        public IActionResult Register(User input)
        {
            if (_context.Users.Any(u => u.UserName == input.UserName))
            {
                return BadRequest("Bu kullanıcı adı zaten alınmış.");
            }

            string hashedPassword = GetMd5Hash(input.Password);

            var newUser = new User
            {
                UserName = input.UserName,
                Password = hashedPassword,
                RecordDate = DateTime.Now
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok(newUser);
        }

        private string GetMd5Hash(string input)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }
    }
}