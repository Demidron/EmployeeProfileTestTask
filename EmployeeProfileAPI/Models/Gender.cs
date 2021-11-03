using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeProfileAPI.Models
{
    public class Gender
    {
        public int Id { get; set; }
        public string GenderName { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}
