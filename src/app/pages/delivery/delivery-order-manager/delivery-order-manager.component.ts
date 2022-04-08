import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-delivery-order-manager',
  templateUrl: './delivery-order-manager.component.html',
  styleUrls: ['./delivery-order-manager.component.css']
})
export class DeliveryOrderManagerComponent implements OnInit {

  assignedOrderList: any[] = []
  isLoading = true
  constructor(private ds: DataServiceService) { }

  ngOnInit(): void {
    this.load(this.ds.postData('gestion-commandes', {
      "etat": "assigné",
      "livreur": localStorage.getItem("username")
    })).then(res => {
      this.assignedOrderList = res.res
      console.log(this.assignedOrderList)
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

  assignedOrderList_remove(id: number) {

    let newTab = []
    for (let u = 0; u < id; u++) {
      newTab[u] = this.assignedOrderList[u]
    }
    for (let i = id; i < this.assignedOrderList.length - 1; i++) {
      newTab[i] = this.assignedOrderList[i + 1]
    }
    this.assignedOrderList = newTab
    console.log(newTab)
    // console.log(this.panier)
  }

  onFinish(id: number) {
    this.ds.postData('commande/modification', {
      "client": {
        "username": this.assignedOrderList[id].client.username,
        "email": this.assignedOrderList[id].client.email
      },
      "dateCommande": this.assignedOrderList[id].dateCommande,
      "etat": "livré",
    }).subscribe(res => {
      if (res.status === 200)
        console.log(res)
    })
    this.assignedOrderList_remove(id)
  }

}
