import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  private route: ActivatedRoute;
  postData:any;
  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      banking_customer_no: [],
      customer_no: ['', Validators.required],
      one_click_id: ['', Validators.required],
      name: ['', Validators.required],
      mid_name:[],
      surname:[]
    });
   
    this.userService.getUserById(+userId)
      .subscribe( data => {
        if(data==null){
           this.editForm.setValue({"banking_customer_no":"121","customer_no":"2323","one_click_id":"66","name":"James","mid_name":"White","surname":"Gosling"});
        }else{
          this.editForm.setValue(data);
        }
        
      });
   

  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          alert(error);
        });
  }

  goBack(){
    this.router.navigate(['list-user']);
  }



}
