import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeesComponent } from './pages/employees-info/list-employees/list-employees.component';
import { EmployeeDetailsComponent } from './pages/employees-info/employee-details/employee-details.component';
import { EmployeesInfoComponent } from './pages/employees-info/employees-info.component';
import { RouterModule } from '@angular/router';

import { jqxListBoxModule } from 'jqwidgets-ng/jqxlistbox';
import { jqxTextAreaModule }    from 'jqwidgets-ng/jqxtextarea';
import { jqxSplitterModule } from 'jqwidgets-ng/jqxsplitter';
import { jqxPanelModule } from 'jqwidgets-ng/jqxpanel';
import { jqxButtonModule }   from 'jqwidgets-ng/jqxbuttons';
import { FormsModule } from "@angular/forms";
import { jqxFormModule } from 'jqwidgets-ng/jqxform';
import { HttpClientModule } from '@angular/common/http';
import { ChangeEmployeeGuard } from './guards/change-employee.guard';
@NgModule({
  declarations: [
    ListEmployeesComponent,
    EmployeeDetailsComponent,
    EmployeesInfoComponent
  ],
  imports: [
    CommonModule,
    jqxListBoxModule,
    jqxTextAreaModule,
    jqxSplitterModule,
    jqxPanelModule,
    jqxButtonModule,
    FormsModule,
    jqxFormModule,
    HttpClientModule,
    RouterModule.forChild([
      {path:'',pathMatch:'full',redirectTo:'employees'},
      {
        path: 'employees',
        component:EmployeesInfoComponent,
        children:[
          {
            path: 'emp-form',
            pathMatch: 'full',
            canLoad:[ChangeEmployeeGuard],
            loadChildren: () => import('./edit-employee/edit-employee.module')
              .then(module => module.EditEmployeeModule)
          },
        ]
      },
    ])
  ]
})
export class ProfilesInfoModule { }
