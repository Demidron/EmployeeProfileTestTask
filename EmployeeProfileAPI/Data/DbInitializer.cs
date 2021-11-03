using EmployeeProfileAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeProfileAPI.Data
{
    public class DbInitializer
    {
        public static void Initialize(EmployeeProfileDBContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Genders.Any())
            {
                return; 
            }

            var genders = new Gender[]
            {
                new Gender{GenderName="Man"},
                new Gender{GenderName="Women"}
            };
            foreach (Gender g in genders)
            {
                context.Genders.Add(g);
            }
            context.SaveChanges();

            if (context.Employees.Any())
            {
                return;   
            }
            var employees = new Employee[]
            {
                new Employee{FirstName="Boris",LastName="Boisov",City="Kiev",GenderId=1},
                new Employee{FirstName="Andrey",LastName="Mich",City="Odessa",GenderId=1},
                new Employee{FirstName="Bogdana",LastName="Mazepa",City="Kiev",GenderId=2},

            };
            foreach (Employee e in employees)
            {
                context.Employees.Add(e);
            }
            context.SaveChanges();


        }
    
    }
}
