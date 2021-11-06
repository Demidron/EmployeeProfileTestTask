import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EmployeeInfo } from '../models/dto/employee-info.model';
import { EmployeeName } from '../models/dto/employee-name.model';
import { Gender } from '../models/dto/gender.model';
import { EmployeeInfoView } from '../models/views/employee-info-view.model';
import { EmployeeNameView } from '../models/views/employee-name-view.model';
import { GenderView } from '../models/views/gender-view.model';
import { EmpProfileProviderService } from './emp-profile-provider.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _empNames:EmployeeNameView[]=[];
  private _empInfo:EmployeeInfoView=new EmployeeInfoView();
  private _genders: GenderView[]=[];
  private _employeeNamesChange: Subject<EmployeeNameView[]> = new Subject<EmployeeNameView[]>();
  public selectedIndexEmp:number=0;
  constructor(private empProvider:EmpProfileProviderService) { 
    this.refreshEmpNames();
    this.resreshGenders();
  }
  public get employeeNamesChange() : Subject<EmployeeNameView[]>  {
    return this._employeeNamesChange;
  }
  public get genders() : GenderView[] {
    return this._genders;
  }
  public get empNames() : EmployeeNameView[] {
    return this._empNames;
  }
  private set empNames(employeeNames: EmployeeNameView[])  {
    this._empNames=employeeNames;
    this._employeeNamesChange.next(employeeNames);
  }

  public get empInfo() : EmployeeInfoView {
    return this._empInfo;
  }
  
  public set empInfo(employeeInfo : EmployeeInfoView) {
    this._empInfo = employeeInfo;
  }

  private refreshEmpNames(){
    this.empProvider.getEmployeesNames().subscribe(
      res=>{
        let newr:EmployeeNameView[]=[];
        (res as EmployeeName[]).forEach(en => {
          newr.push({
            id:en.id,
            firstName:en.firstName,
            lastName:en.lastName,
            fullName:`${en.lastName} ${en.firstName}`
            })
        });
        
        if(this.empNames.length<newr.length){this.selectedIndexEmp=newr.length-1}
        else if(this.empNames.length>newr.length){this.selectedIndexEmp=this.selectedIndexEmp-1}
        this.empNames=newr;
      },err=>{
        console.log(err);
      })
  }
  refreshEmpInfoById(id:number){
    this.empProvider.getEmployeeInfo(id).subscribe(
      res=>{
        let ei=res as EmployeeInfo;
        this.empProvider.getGenderById(ei.genderId).subscribe(res=>{
          let newei: EmployeeInfoView={
            id:ei.id,
            city:ei.city,
            firstName:ei.firstName,
            lastName:ei.lastName,
            genderId:ei.genderId, 
            genderName:(res as Gender).genderName
          }
          this.empInfo=newei;

        },err=>{console.log(err)})
      },err=>{
        console.log(err);
      })
  }
  resreshGenders(){
    this.empProvider.getGenders().subscribe(res=>{
      (res as Gender[]).forEach(element =>this.genders.push( { label:element.genderName, value: element.id }) );
    },err=>{
      console.log(err);
    })
  }
  updateEmp(employee:EmployeeInfoView){
    this.empProvider.putEmployee(employee,employee.id).subscribe(
      res=>{
        this.refreshEmpNames();
        if(this.empInfo.id==employee.id){
          this.empInfo=employee;
        }
      },
      err=>{console.log(err)})
  }
  addNewEmp(employee:EmployeeInfoView){
    this.empProvider.postEmployee(employee).subscribe(
      res=>{
        this.refreshEmpNames();
      },
      err=>{console.log(err)})
  }
  deleteEmployee(){
    if(confirm(`Are you sure, you want to delete selected
    employee? ${this.empInfo.lastName} ${this.empInfo.firstName} ?`)){
      this.empProvider.deleteEmployee(this.empInfo.id).subscribe(res=>{
        this.refreshEmpNames();
      },err=>{console.log(err)})
    }
  }
}
