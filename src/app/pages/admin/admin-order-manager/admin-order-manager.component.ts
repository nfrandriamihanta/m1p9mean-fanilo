import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-admin-order-manager',
  templateUrl: './admin-order-manager.component.html',
  styleUrls: ['./admin-order-manager.component.css']
})
export class AdminOrderManagerComponent implements OnInit {

  readyToDeliver: any[] = []
  deliveryManList: any[] = []
  isLoading = true
  assignForm = new FormGroup({
    deliveryMan: new FormControl('', Validators.required)
  })
  constructor(private ds: DataServiceService) { }

  ngOnInit(): void {
    Promise.all([
      this.load(this.ds.postData('gestion-commandes', {
        "etat": "à livrer"
      })).then(res => {
        this.readyToDeliver = res.res
        console.log(this.readyToDeliver)
      }),

      this.load(this.ds.postData('livreur', {
        "role": "livreur"
      })).then(res => {
        this.deliveryManList = res.res
        console.log(this.deliveryManList)
      }).then(res => {
        this.isLoading = false
      })
    ]
    )

  }

  load(obs: Observable<any>) {
    return new Promise<any>((resolve) => {
      obs.subscribe(res => {
        resolve(res)
      })
    })
  }

  onAssign(id: number) {
    this.ds.postData('commande/modification', {
      "client": {
        "username": this.readyToDeliver[id].client.username,
        "email": this.readyToDeliver[id].client.email
      },
      "dateCommande": this.readyToDeliver[id].dateCommande,
      "etat": "assigné",
      "livreur": this.assignForm.value.deliveryMan
    }).subscribe(res => {
      if (res.status === 200)
        console.log(res)
    })
  }
}
