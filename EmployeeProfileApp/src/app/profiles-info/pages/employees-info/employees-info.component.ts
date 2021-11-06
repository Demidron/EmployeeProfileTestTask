import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';

@Component({
  selector: 'app-employees-info',
  templateUrl: './employees-info.component.html',
  styleUrls: ['./employees-info.component.css']
})
export class EmployeesInfoComponent implements OnInit {

  constructor() { }
  mainSplitterPanels: any[] = [{ size: 250, min: 100 }, { min: 250 }];
  ngOnInit(): void {
  }

	getWidth() : any {
		if (document.body.offsetWidth < 850) {
			return '90%';
		}
		
		return 850;
	}

}
