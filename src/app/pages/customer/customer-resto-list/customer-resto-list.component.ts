import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private ds: DataServiceService) { }

  ngOnInit(): void {
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
    console.log("mandeha ty")
    this.searchResult = []
    this.searchSignal = true
    let restoName = "^" + this.searchForm.value.restaurant + "$"
    let filter = { "role": "restaurateur", "restaurant.nom": { "$regex": restoName, "$options": "i" } }
    this.ds.postData('recherche', filter).subscribe(res => {
      if (res) {
        this.searchResult = res
        console.log(this.searchResult)
      }
    }, err => {

    })
    this.searchSignal = false
  }

}
