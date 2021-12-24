import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  api: any;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Id: [''],
      first_name: [''],
      last_name: [''],
      email: ['']
    })

  }

  postEmployeeDetails() {
    this.employeeModelObj.id = this.formValue.value.id;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe((res: any) => {
        console.log(res);
        alert("Employee added successfully")
      },
        (err: any) => {
          alert("Something went wrong")
        })

  }

}
