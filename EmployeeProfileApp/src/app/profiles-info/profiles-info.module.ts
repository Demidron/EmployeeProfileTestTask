import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeesComponent } from './pages/employees-info/list-employees/list-employees.component';
import { EmployeeDetailsComponent } from './pages/employees-info/employee-details/employee-details.component';
import { EmployeesInfoComponent } from './pages/employees-info/employees-info.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListEmployeesComponent,
    EmployeeDetailsComponent,
    EmployeesInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component:EmployeesInfoComponent
      }
    ])
  ]
})
export class ProfilesInfoModule { }
