using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeProfileAPI.ModelsDTO
{
    public class EmployeeInfoDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public int GenderId { get; set; }
        public string GenderName { get; set; }
    }
}
