import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEmployeeFormComponent } from './new-employee-form/new-employee-form.component';
import { RouterModule } from '@angular/router';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxFormModule } from 'jqwidgets-ng/jqxform';


@NgModule({
  declarations: [
    NewEmployeeFormComponent
  ],
  imports: [
    CommonModule,
    jqxFormModule,
    jqxWindowModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewEmployeeFormComponent
      },
      {
        path: '**',
        pathMatch:'full',redirectTo:'employees'
      },
    ])
  ]
})
export class EditEmployeeModule { }
