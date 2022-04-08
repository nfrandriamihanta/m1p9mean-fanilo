import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  message = ""
  isClicked = false

  constructor(private ds: DataServiceService, private router: Router) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("role")) {
      if (localStorage.getItem("role") === "client") this.router.navigate(['client'])
      if (localStorage.getItem("role") === "restaurateur") this.router.navigate(['restaurateur'])
      if (localStorage.getItem("role") === "admin") this.router.navigate(['admin'])
    }
  }

  onSignIn() {
    this.isClicked = true
    const user = { "username": this.signInForm.value.username, "password": this.signInForm.value.password }
    this.ds.postData('connexion', user).subscribe(res => {
      if (res.status === 200) {
        localStorage.setItem('token', res.res.token)
        localStorage.setItem('username', res.res.username)
        localStorage.setItem('email', res.res.email)
        localStorage.setItem('role', res.res.role)
        this.message = res.message
        if (res.res.role === "client")
          this.router.navigate(['client'])
        if (res.res.role === "restaurateur") {
          localStorage.setItem("restaurant", res.res.restaurant.nom)
          this.router.navigate(['restaurateur'])
        }
        if (res.res.role === "admin") {
          this.router.navigate(['admin'])
        }
        if (res.res.role === "livreur") {
          this.router.navigate(['livreur'])
        }
      } else if (res.status === 400) {
        this.message = res.message
        this.isClicked = false
        this.router.navigate([''])
      }
    },
      err => {
        console.log(err)
        this.message = "Un problème de serveur est survenu lors de l'opération"
        this.isClicked = false
        this.router.navigate([''])
      }

    )
    console.log(this.signInForm.value.username)
    console.log('mandeha')
  }

}
