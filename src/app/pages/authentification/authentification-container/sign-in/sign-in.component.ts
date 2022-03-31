import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  message = ""

  constructor(private ds: DataServiceService, private router: Router) {

  }

  ngOnInit(): void {
    // this.signInForm = this.fb.group()
  }

  onSignIn() {
    const user = { "username": this.signInForm.value.username, "password": this.signInForm.value.password }
    this.ds.postData('connexion', user).subscribe(res => {
      if (res.status === 200) {
        localStorage.setItem('user', res.res)
        this.router.navigate(['accueil'])
      } else if (res.status === 400) {
        this.message = res.message
        this.router.navigate([''])
      }
    },
      err => {
        this.message = "Un problème de serveur est survenu lors de l'opération"
        this.router.navigate([''])
      }

    )
    console.log(this.signInForm.value.username)
    console.log('mandeha')
  }

}
