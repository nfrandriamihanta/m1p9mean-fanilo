import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  message = ""

  constructor(private ds: DataServiceService, private router: Router) {

  }

  ngOnInit(): void {
    // this.signInForm = this.fb.group()
  }

  onSignUp() {
    const newUser = { "username": this.signUpForm.value.username, "email": this.signUpForm.value.email, "password": this.signUpForm.value.password, "role": "client" }
    this.ds.postData('inscription', newUser).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate([''])
      } else if (res.status === 400) {
        this.message = res.message
        this.router.navigate(['inscription'])
      }
    },
      err => {
        console.log(err)
        this.message = "Un problème de serveur est survenu lors de l'opération"
        this.router.navigate(['inscription'])
      }

    )
    console.log(this.signUpForm.value.username)
    console.log('mandeha')
  }

}
