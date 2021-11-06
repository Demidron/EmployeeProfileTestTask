import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jqxFormComponent } from 'jqwidgets-ng/jqxform';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { Subscription } from 'rxjs';
import { EmployeeInfoView } from '../../models/views/employee-info-view.model';
import { EmployeeService } from '../../services/employee.service';
import { TypesForm } from '../enums/types-form';

@Component({
  selector: 'app-new-employee-form',
  templateUrl: './new-employee-form.component.html',
  styleUrls: ['./new-employee-form.component.css']
})
export class NewEmployeeFormComponent implements OnInit {

  @ViewChild('windowReference') window: jqxWindowComponent;
  @ViewChild('windowContent') windowContent:ElementRef;
  
  formWidget:any;
  typeForm:TypesForm=TypesForm.CREATE;
  private data:EmployeeInfoView=new EmployeeInfoView();
  private subscription: Subscription;

  @ViewChild('jform') myForm: jqxFormComponent;
  constructor(private router:Router,private activateRoute: ActivatedRoute, public empService:EmployeeService) { }

  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe(params=>{
     this.typeForm=params[TypesForm.TYPE];
      this.createForm();
    });
  }

  createForm(){
    if(this.typeForm!=TypesForm.CREATE&&this.typeForm!=TypesForm.EDIT){
      console.log("non type");
      return;
    }
    
  
    let columns:Array<jqwidgets.FormTemplateItem>= [
      {
        name:"submitButton",
        type: 'button',
        text: this.typeForm==TypesForm.CREATE ? 'Create' : 'Edit',
        width: '90px',
        columnWidth: '50%',
        align: 'right'
      },
      {
        name:"cancelButton",
        type: 'button',
        text: 'Cancel',
        width: '90px',
        columnWidth: '50%'
      }                
    ];
    let template: Array<jqwidgets.FormTemplateItem> = [
      {
        bind: 'firstName',
        type: 'text',
        label: 'First name',
        required: true,
        labelWidth: '85px',
        width: '250px',
        info: 'Enter first name',
        infoPosition: 'right'
      },
      {
        bind: 'lastName',
        type: 'text',
        label: 'Last name',
        required: true,
        labelWidth: '85px',
        width: '250px',
        info: 'Enter last name',
        infoPosition: 'right'
      },
      {
        bind: 'city',
        type: 'text',
        label: 'City',
        required: true,
        labelWidth: '85px',
        width: '250px'
      },
      {
        bind: "genderId",
        type: 'option',
        label: 'Gender',
        required: true,
        labelWidth: '85px',
        width: '250px',
        component: 'jqxDropDownList',
        options: this.empService.genders
      },
  
      {
        type: 'blank',
        rowHeight: '10px'
      },
      {
        columns: columns
      }
  
    ];
  
    if(this.formWidget){
      this.formWidget.destroy();
      //restore deleted jform div
      let widgetContainer = document.createElement('div');
      widgetContainer.id="jform";
      this.windowContent.nativeElement.appendChild(widgetContainer);
    }

    this.data = this.typeForm==TypesForm.CREATE ? new EmployeeInfoView() : this.empService.empInfo;
    this.formWidget=jqwidgets.createInstance('#jform', 'jqxForm', {template:template, value:this.data});
    let btnSub = this.formWidget.getComponentByName('submitButton');
     btnSub.on('click',()=>{ this.onSubmit()});
     let btnCan = this.formWidget.getComponentByName('cancelButton');
     btnCan.on('click',()=>{this.onCancel() });
     this.formWidget.addEventHandler('formDataChange',(event: any) => {
      var args = event.args;
      this.data = args.value as EmployeeInfoView;
    });
  }
  onCancel(){
    if(this.typeForm==TypesForm.EDIT){this.empService.refreshEmpInfoById(this.empService.empInfo.id)}
    this.window.close();
  }
  onSubmit(){
    if(this.typeForm==TypesForm.EDIT){
      this.empService.updateEmp(this.data);
     
    }else if(this.typeForm==TypesForm.CREATE){
      this.empService.addNewEmp(this.data);
    }
    this.window.close();
  }
  ngAfterViewInit(){
    this.window.position({ x:  50, y:  50 });
    this.window.onClose.subscribe(res=>{ this.router.navigate(['employees']);});
  }
  ngOnDestroy(){
    this.window.destroy();
  }

}
