import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService,private toastr: ToastrService) { }

  addForm: FormGroup;

  testData:any;

  

  ngOnInit() {

    // this.addForm = this.formBuilder.group({
    //   id: [],
    //   email: ['', Validators.required],
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required]
    // });
    this.addForm = this.formBuilder.group({
      banking_customer_no: [],
      customer_no: ['', Validators.required],
      one_click_id: ['', Validators.required],
      name: ['', Validators.required],
      mid_name:[],
      surname:[]
    });

  }

  onSubmit() {
    this.userService.createUser(this.addForm.value)
      .subscribe( data => {
        alert("Data from post"+JSON.stringify(data));

        if(data["Result"]=='OK'){
            this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-top-center' 
         });
        }else {
          this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-warning alert-with-icon",
           positionClass: 'toast-top-center'
         });
        }
        console.log(data);
      });
  }

  getTestData(){
    this.userService.getTestData().subscribe(data=>{
      this.testData=data;
      alert("Data from get call" + JSON.stringify(this.testData));
      console.log(JSON.stringify(data));
    });
  }

}
