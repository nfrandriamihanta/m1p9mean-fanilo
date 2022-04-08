import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-delivery-man-manager',
  templateUrl: './delivery-man-manager.component.html',
  styleUrls: ['./delivery-man-manager.component.css']
})
export class DeliveryManManagerComponent implements OnInit {

  deliveryManList: any[] = []
  isLoading = true
  idDeliveryMan: number = 1
  addDeliveryManForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private ds: DataServiceService) { }

  ngOnInit(): void {
    this.load(this.ds.postData('livreur', {
      "role": "livreur"
    })).then(res => {
      this.deliveryManList = res.res
      console.log(this.deliveryManList)
      this.isLoading = false
    })
  }

  load(obs: Observable<any>) {
    return new Promise<any>((resolve) => {
      obs.subscribe(res => {
        resolve(res)
      })
    })
  }

  onAddDeliveryMan() {
    let newDeliver: any = {
      "username": this.addDeliveryManForm.value.username,
      "email": this.addDeliveryManForm.value.email,
      "password": this.addDeliveryManForm.value.password,
      "role": "livreur"
    }
    this.deliveryManList.push(newDeliver)
    this.load(this.ds.postData('ajout-livreur', newDeliver)).then(res => {
    })

    // console.log(this.deliveryManList)
  }

  passIdDeliveryMan(id: number) {
    this.idDeliveryMan = id
    this.addDeliveryManForm = new FormGroup({
      username: new FormControl(this.deliveryManList[id].username, Validators.required),
      email: new FormControl(this.deliveryManList[id].email, Validators.required),
      password: new FormControl(this.deliveryManList[id].password, Validators.required),
    });
  }

  onUpdateDeliveryMan() {
    let newDeliveryManData: any = {
      "ancienNom": this.deliveryManList[this.idDeliveryMan].username,
      "newData": {
        "username": this.addDeliveryManForm.value.username,
        "email": this.addDeliveryManForm.value.email,
        "password": this.addDeliveryManForm.value.password,
        "role": "livreur",
      }
    }
    this.deliveryManList[this.idDeliveryMan] = newDeliveryManData.newData
    this.load(this.ds.postData('modification-livreur', newDeliveryManData)).then(res => {
    })
  }

  deliveryManList_remove(id: number) {

    let newRestoList = []
    for (let u = 0; u < id; u++) {
      newRestoList[u] = this.deliveryManList[u]
    }
    for (let i = id; i < this.deliveryManList.length - 1; i++) {
      newRestoList[i] = this.deliveryManList[i + 1]
    }
    this.deliveryManList = newRestoList
    console.log(newRestoList)
    // console.log(this.panier)
  }

  onDelete(id: number) {
    if (confirm("Voulez vous vraiment supprimer ce restaurant définitivement?")) {
      let nom = this.deliveryManList[id].username
      this.deliveryManList_remove(id)
      this.load(this.ds.postData('suppression-livreur', {
        "username": nom
      })).then(res => {
      })
    }

  }
}
