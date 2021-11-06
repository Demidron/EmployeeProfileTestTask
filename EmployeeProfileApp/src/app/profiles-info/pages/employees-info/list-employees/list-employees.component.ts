import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { jqxListBoxComponent } from 'jqwidgets-ng/jqxlistbox';
import { TypesForm } from 'src/app/profiles-info/edit-employee/enums/types-form';
import { EmployeeService } from 'src/app/profiles-info/services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  @ViewChild('jqxListBox') myListBox: jqxListBoxComponent;
  constructor(private router:Router, public empService:EmployeeService) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.myListBox.selectIndex(this.empService.selectedIndexEmp);
    }, 5);
    this.empService.employeeNamesChange.subscribe(res=>{
      this.myListBox.selectIndex(this.empService.selectedIndexEmp);
    })
    
  }
  addEmp(){
    this.router.navigate(['employees/emp-form',{[TypesForm.TYPE]:TypesForm.CREATE}]);
  }
  editEmp(){
    this.router.navigate(['employees/emp-form',{[TypesForm.TYPE]:TypesForm.EDIT}]);
  }
  deleteEmp(){
    this.empService.deleteEmployee()
  }
  selectLB(event: any){
    this.empService.selectedIndexEmp=event.args.index;
    let id = this.myListBox.getItem(event.args.index).value as number;
    this.empService.refreshEmpInfoById(id);
  }
}
