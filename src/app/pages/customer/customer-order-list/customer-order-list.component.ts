import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-customer-order-list',
  templateUrl: './customer-order-list.component.html',
  styleUrls: ['./customer-order-list.component.css']
})
export class CustomerOrderListComponent implements OnInit {

  orderList: any[] = []
  constructor(private ds: DataServiceService) { }

  ngOnInit(): void {
    this.load(this.ds.postData('commande', {
      "client.username": localStorage.getItem("username"), "client.email": localStorage.getItem("email")
    })).then(res => {
      this.orderList = res.res
      console.log(this.orderList)
    })
  }

  load(obs: Observable<any>) {
    return new Promise<any>((resolve) => {
      obs.subscribe(res => {
        resolve(res)
      })
    })
  }

}
