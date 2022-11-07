import { Component, OnInit } from '@angular/core';
import { FormControl ,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  
   form=new FormGroup({
    username: new FormControl(''),
    lastName: new FormControl(''),
    email:new FormControl(''),
    confirm:new FormControl(''),
    password:new FormControl(''),
  });

  onRegisterSubmit(){
    console.log("fuck")
    console.log(this.form.value);
  }

  constructor() {

   }

  ngOnInit(): void {

  
  }



}
