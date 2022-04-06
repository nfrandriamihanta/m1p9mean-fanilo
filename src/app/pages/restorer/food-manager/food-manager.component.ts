import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-food-manager',
  templateUrl: './food-manager.component.html',
  styleUrls: ['./food-manager.component.css']
})
export class FoodManagerComponent implements OnInit {

  restaurant: any = null
  foodList: any[] = []
  idFood: number = 1

  addFoodForm = new FormGroup({
    plat: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required),
    benefice: new FormControl('', Validators.required)
  });



  constructor(private ds: DataServiceService) {
    this.load(this.ds.getData('resto/' + localStorage.getItem("restaurant"))).then(res => {
      this.restaurant = res.res
      this.foodList = res.res.restaurant.plat
    })
  }

  ngOnInit(): void {
  }

  load(obs: Observable<any>) {
    this.restaurant = null
    return new Promise<any>((resolve) => {
      obs.subscribe(res => {
        resolve(res)
      })
    })
  }

  onAddFood() {
    let newFood = {
      "nom": this.addFoodForm.value.plat,
      "prix": this.addFoodForm.value.prix,
      "benefice": this.addFoodForm.value.benefice
    }
    this.foodList.push(newFood)
    this.restaurant.restaurant.plat = this.foodList
    this.ds.postData('plat/modification', this.restaurant).subscribe(
      res => {
        console.log(res)
      }
    )
  }

  onUpdateFood() {
    let newFood = {
      "nom": this.addFoodForm.value.plat,
      "prix": this.addFoodForm.value.prix,
      "benefice": this.addFoodForm.value.benefice
    }

    this.foodList[this.idFood] = newFood
    this.restaurant.restaurant.plat = this.foodList
    this.ds.postData('plat/modification', this.restaurant).subscribe(
      res => {
        console.log(res)
      }
    )
  }

  foodList_remove(id: number) {

    let newFoodList = []
    for (let u = 0; u < id; u++) {
      newFoodList[u] = this.foodList[u]
    }
    for (let i = id; i < this.foodList.length - 1; i++) {
      newFoodList[i] = this.foodList[i + 1]
    }
    this.foodList = newFoodList
    console.log(newFoodList)
    // console.log(this.panier)
  }

  onDeleteFood(index: number) {
    if (confirm("Voulez vous vraiment supprimer ce plat de votre menu?")) {
      this.foodList_remove(index)
      this.restaurant.restaurant.plat = this.foodList
      this.ds.postData('plat/modification', this.restaurant).subscribe(
        res => {
          console.log(res)
        }
      )
    }
  }

  passIdFood(id: number) {
    this.idFood = id
    this.addFoodForm = new FormGroup({
      plat: new FormControl(this.foodList[this.idFood].nom, Validators.required),
      prix: new FormControl(this.foodList[this.idFood].prix, Validators.required),
      benefice: new FormControl(this.foodList[this.idFood].benefice, Validators.required)
    })
  }

}
