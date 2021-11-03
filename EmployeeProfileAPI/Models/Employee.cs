using EmployeeProfileAPI.ModelsDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeProfileAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public int GenderId { get; set; }
        public Gender Gender { get; set; }

        public static explicit operator Employee(EmployeeInfoDTO v)
        {
            return new Employee() { Id = v.Id, FirstName = v.FirstName, LastName = v.LastName, City = v.City, GenderId = v.GenderId };

        }
    }
}
