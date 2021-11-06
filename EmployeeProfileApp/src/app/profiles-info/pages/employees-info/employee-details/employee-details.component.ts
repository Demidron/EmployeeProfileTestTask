import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/profiles-info/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor( public empService:EmployeeService) { }

  ngOnInit(): void {
  }

}
