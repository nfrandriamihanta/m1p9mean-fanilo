import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-customer-food-list',
  templateUrl: './customer-food-list.component.html',
  styleUrls: ['./customer-food-list.component.css']
})
export class CustomerFoodListComponent implements OnInit {

  resto = ""
  restaurant: any = null
  panier: any[] = []
  totalPrice = 0
  totalGain = 0
  orderForm = new FormGroup({
    place: new FormControl('', Validators.required)
  });

  constructor(private actRoute: ActivatedRoute, private ds: DataServiceService, private route: Router) { }

  ngOnInit(): void {
    this.resto = this.actRoute.snapshot.params['restaurant']
    this.load(this.ds.getData('resto/' + this.resto)).then(res => {
      this.restaurant = res.res
    })
  }

  load(obs: Observable<any>) {
    this.restaurant = null
    return new Promise<any>((resolve) => {
      obs.subscribe(res => {
        resolve(res)
      })
    })
  }

  addGain(gain: number, quantite: number) {
    this.totalGain += gain * quantite
  }

  addPrice(price: number, quantite: number) {
    this.totalPrice += price * quantite
  }

  substractGain(gain: number, quantite: number) {
    this.totalGain -= gain * quantite
  }

  substractPrice(price: number, quantite: number) {
    this.totalPrice -= price * quantite
  }

  cart_remove(id: number) {
    if (confirm("Voulez vous vraiment supprimer cet élément du panier?")) {
      let newPanier = []
      for (let u = 0; u < id; u++) {
        newPanier[u] = this.panier[u]
      }
      this.substractPrice(this.panier[id].prix, this.panier[id].quantite)
      this.substractGain(this.panier[id].benefice, this.panier[id].quantite)
      for (let i = id; i < this.panier.length - 1; i++) {
        newPanier[i] = this.panier[i + 1]
      }
      this.panier = newPanier
      console.log(newPanier)
      // console.log(this.panier)
    }
  }

  addQuantity(id: number) {
    this.panier[id].quantite += 1
    this.addPrice(this.panier[id].prix, 1)
    this.addGain(this.panier[id].benefice, 1)
  }

  substractQuantity(id: number) {
    if (this.panier[id].quantite > 1) {
      this.panier[id].quantite -= 1
      this.substractPrice(this.panier[id].prix, 1)
      this.substractGain(this.panier[id].benefice, 1)
    }
    else {
      if (confirm("Voulez vous supprimer cet élément du panier?"))
        this.cart_remove(id)
    }
  }

  onAddCart(food: any) {
    Object.assign(food, { "quantite": 1 })
    this.panier.push(food)
    this.addPrice(food.prix, food.quantite)
    this.addGain(food.benefice, food.quantite)
    console.log(this.panier)
  }

  emptyCart() {
    this.panier = []
    this.totalPrice = 0
    this.totalGain = 0
  }

  onOrder() {
    if (this.panier.length !== 0) {
      let cust = {
        "username": localStorage.getItem("username"),
        "email": localStorage.getItem("email")
      }
      let order = {
        "client": cust,
        "plat": this.panier,
        "restaurant": this.restaurant.restaurant.nom,
        "lieuLivraison": this.orderForm.value.place,
        "prixTotal": this.totalPrice,
        "beneficeTotal": this.totalGain
      }
      console.log(order)
      this.ds.postData('commander', order).subscribe(res => {
        if (res.status === 200) this.route.navigate(['client/mes-commandes'])
      })
    } else {
      alert('Veuillez remplir votre panier')
    }
  }
}
