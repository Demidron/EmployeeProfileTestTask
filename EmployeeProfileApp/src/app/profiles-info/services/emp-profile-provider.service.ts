import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeInfo } from '../models/dto/employee-info.model';
import { EmployeeName } from '../models/dto/employee-name.model';

@Injectable({
  providedIn: 'root'
})
export class EmpProfileProviderService {

  readonly apiURL="https://localhost:44308/api";
  constructor(private httpClient:HttpClient) { }

  getEmployeesNames(){
    return this.httpClient.get(this.apiURL+"/Employees/EmployeesNames");
  }
//`​/Employees​/EmployeeInfo​/${id}`
  getEmployeeInfo(id:number){
    return this.httpClient.get(this.apiURL+`/Employees/EmployeeInfo/${id}`);
  }

  putEmployee(emp:EmployeeInfo,id:number){
    return this.httpClient.put(this.apiURL+`/Employees/${id}`,emp);
  }
  postEmployee(emp:EmployeeInfo){
    return this.httpClient.post(this.apiURL+`/Employees`,emp);
  }

  deleteEmployee(id:number){
    return this.httpClient.delete(this.apiURL+`/Employees/${id}`);
  }

  getGenders(){
    return this.httpClient.get(this.apiURL+"/Genders");
  }
  getGenderById(id:number){
    return this.httpClient.get(this.apiURL+`/Genders/${id}`);
  }
}
