using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeProfileAPI.Models
{
    public class EmployeeProfileDBContext : DbContext
    {
        public EmployeeProfileDBContext(DbContextOptions<EmployeeProfileDBContext> options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Gender> Genders { get; set; }
    }
}
