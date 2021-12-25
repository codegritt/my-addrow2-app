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
  employeeData!: any;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Id: [''],
      firstName: [''],
      lastName: [''],
      email: ['']
    })
    this.getAllEmployee();
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

        let ref = document.getElementById('cancel')
        ref?.click();


        this.formValue.reset();
        this.getAllEmployee();
      },
        (err: any) => {
          alert("Something went wrong")
        })

  }

  getAllEmployee() {
    this.api.getEmployee()
      .subscribe((res: any) => {
        this.employeeData = res;
      })
  }


  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe((res: any) => {
        alert("Employee deleted")
      })
  }
  onEdit(row: any) {
    this.employeeModelObj.id = row.id;

    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
  }
  updateEmployeeDetails() {
    this.employeeModelObj.id = this.formValue.value.id;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res: any) => {
        alert("Updated successfully");
        let ref = document.getElementById('cancel')
        ref?.click();


        this.formValue.reset();
        this.getAllEmployee();

      })

  }
}
