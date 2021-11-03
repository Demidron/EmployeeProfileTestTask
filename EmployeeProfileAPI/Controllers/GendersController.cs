using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeProfileAPI.Models;
using EmployeeProfileAPI.ModelsDTO;

namespace EmployeeProfileAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GendersController : ControllerBase
    {
        private readonly EmployeeProfileDBContext _context;

        public GendersController(EmployeeProfileDBContext context)
        {
            _context = context;
        }

        // GET: api/Genders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenderDTO>>> GetGenders()
        {
            return await _context.Genders.Select(x=>new GenderDTO { Id=x.Id, GenderName=x.GenderName}).ToListAsync();
        }

        // GET: api/Genders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GenderDTO>> GetGender(int id)
        {
            var gender = await _context.Genders.FindAsync(id);

            if (gender == null)
            {
                return NotFound();
            }

            return genderToDTO(gender);
        }

        private static GenderDTO genderToDTO(Gender gender) =>
          new GenderDTO
          {
              Id = gender.Id,
              GenderName = gender.GenderName    
          };
    }
}
