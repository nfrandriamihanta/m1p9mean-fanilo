import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  path = {
    "accueil": "",
    "commande": ""
  }
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("role")) {
      if (localStorage.getItem("role") === "client") {
        this.path.accueil = ""
        this.path.commande = "mes-commandes"
        console.log()
      }
      if (localStorage.getItem("role") === "restaurateur") {
        this.path.commande = "gestion-commandes"
      }
    }
  }

}
