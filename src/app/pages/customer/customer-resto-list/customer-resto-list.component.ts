import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-customer-resto-list',
  templateUrl: './customer-resto-list.component.html',
  styleUrls: ['./customer-resto-list.component.css']
})
export class CustomerRestoListComponent implements OnInit {


  restoList: any[] = []
  searchResult: any[] = []
  searchSignal = false
  searchForm = new FormGroup({
    restaurant: new FormControl('', Validators.required)
  });
  notFound = false

  constructor(private ds: DataServiceService, private route: Router) { }

  ngOnInit(): void {
    // if (!localStorage.getItem('user')) this.route.navigate([''])
    this.load(this.ds.getData('listeResto')).then(res => {
      this.restoList = res.res
      // console.log(this.restoList[0].restaurant.nom)
    })
    if (this.searchSignal) console.log("misy signal o")
  }

  load(obs: Observable<any>) {
    this.restoList = []
    return new Promise<any>((resolve) => {
      obs.subscribe(res => {
        resolve(res)
      })
    })
  }

  onSearch() {
    this.searchResult = []
    this.searchSignal = true
    this.notFound = false
    let filter = { "role": "restaurateur", "restaurant.nom": { "$regex": this.searchForm.value.restaurant, "$options": "i" } }
    this.ds.postData('recherche', filter).subscribe(res => {
      this.searchResult = res.res
      console.log(this.searchResult)
      if (this.searchResult.length === 0) this.notFound = true

    }, err => {

    })
  }

}
