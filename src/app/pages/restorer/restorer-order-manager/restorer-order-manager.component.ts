import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-restorer-order-manager',
  templateUrl: './restorer-order-manager.component.html',
  styleUrls: ['./restorer-order-manager.component.css']
})
export class RestorerOrderManagerComponent implements OnInit {

  waitingOrder: any[] = []
  readyToDeliver: any[] = []

  waitingOrderStr: string[] = []
  readyToDeliverStr: string[] = []

  isLoading = true

  constructor(private ds: DataServiceService) { }

  ngOnInit(): void {
    Promise.all([
      this.load(this.ds.postData('gestion-commandes', {
        "restaurant": localStorage.getItem("restaurant"),
        "etat": "en attente"
      })).then(res => {
        this.waitingOrder = res.res
      }),
      this.load(this.ds.postData('gestion-commandes', {
        "restaurant": localStorage.getItem("restaurant"),
        "etat": "à livrer"
      })).then(res => {
        this.readyToDeliver = res.res
      })
    ]).then(res => {
      this.toStringOrder()
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

  toStringOrder() {
    for (let i = 0; i < this.waitingOrder.length; i++) {
      this.waitingOrderStr[i] = "<h6>" + this.waitingOrder[i].dateCommande + "</h6><ul>"
      for (let u = 0; u < this.waitingOrder[i].plat.length; u++) {
        this.waitingOrderStr[i] += "<li>" + this.waitingOrder[i].plat[u].nom + " " + this.waitingOrder[i].plat[u].quantite + "</li>"
      }
      this.waitingOrderStr[i] += "</ul>"
    }
    for (let i = 0; i < this.readyToDeliver.length; i++) {
      this.readyToDeliverStr[i] = "<h6>" + this.readyToDeliver[i].dateCommande + "</h6><ul>"
      for (let u = 0; u < this.readyToDeliver[i].plat.length; u++) {
        this.readyToDeliverStr[i] += "<li>" + this.readyToDeliver[i].plat[u].nom + " " + this.readyToDeliver[i].plat[u].quantite + "</li>"
      }
      this.readyToDeliverStr[i] += "</ul>"
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(this.waitingOrder[event.previousIndex])
    this.ds.postData('commande/modification', {
      "client": {
        "username": this.waitingOrder[event.previousIndex].client.username,
        "email": this.waitingOrder[event.previousIndex].client.email
      },
      "dateCommande": this.waitingOrder[event.previousIndex].dateCommande,
      "etat": "à livrer"
    }).subscribe(res => {
      if (res.status === 200)
        console.log(res)
    })
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
