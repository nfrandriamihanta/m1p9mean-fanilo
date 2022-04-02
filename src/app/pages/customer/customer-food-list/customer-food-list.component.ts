import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private ds: DataServiceService) { }

  ngOnInit(): void {
    this.resto = this.route.snapshot.params['restaurant']
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

  onAddCart(food: any) {
    Object.assign(food, { "quantite": 1 })
    this.panier.push(food)
    console.log(this.panier)
  }
}
