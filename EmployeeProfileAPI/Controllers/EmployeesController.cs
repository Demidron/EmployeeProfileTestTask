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
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeProfileDBContext _context;

        public EmployeesController(EmployeeProfileDBContext context)
        {
            _context = context;
        }

      
        [HttpGet]
        [Route("EmployeesNames")]
        public async Task<ActionResult<IEnumerable<EmployeeNameDTO>>> GetEmployeesNames()
        {
            return await _context.Employees
                .Select(x=>new EmployeeNameDTO { Id=x.Id, LastName=x.LastName, FirstName=x.FirstName})
                .ToListAsync();
        }

      
        [HttpGet]
        [Route("EmployeeInfo/{id:int}")]
        public async Task<ActionResult<EmployeeInfoDTO>> GetEmployeeInfo(int id)
        {
            var employee = await _context.Employees.Where(x => x.Id == id)
                .Select(g => new EmployeeInfoDTO {
                    Id = g.Id, 
                    LastName = g.LastName, 
                    FirstName = g.FirstName,
                    City=g.City,
                    GenderName=g.Gender.GenderName})
                .FirstOrDefaultAsync();

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EmployeeInfoDTO employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry((Employee)employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmployeeInfoDTO>> PostEmployee(EmployeeInfoDTO employee)
        {
            var a = (Employee)employee;
            _context.Employees.Add(a);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeeInfo", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
