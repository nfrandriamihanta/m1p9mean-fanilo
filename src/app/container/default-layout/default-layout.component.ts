import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  path = {
    "accueil": "",
    "commande": "",
    "benefice": "",
    "livreur": ""
  }
  isLogOut = false
  constructor(private ds: DataServiceService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("role")) {
      if (localStorage.getItem("role") === "client") {
        this.path.commande = "mes-commandes"
        console.log()
      }
      if (localStorage.getItem("role") === "restaurateur") {
        this.path.commande = "gestion-commandes"
        this.path.benefice = "benefice"
      }
      if (localStorage.getItem("role") === "admin") {
        this.path.commande = "gestion-commandes"
        this.path.livreur = "gestion-livreur"
      }
    }
  }

  onLogOut() {
    this.isLogOut = true
    this.ds.postData('deconnexion', {
      "username": localStorage.getItem("username"),
      "email": localStorage.getItem("email")
    }).subscribe(res => {
      localStorage.clear()
      this.router.navigate([''])
    })

  }

}
