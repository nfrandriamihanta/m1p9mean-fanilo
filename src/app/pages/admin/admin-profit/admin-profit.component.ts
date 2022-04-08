import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/service/data-service.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-profit',
  templateUrl: './admin-profit.component.html',
  styleUrls: ['./admin-profit.component.css']
})
export class AdminProfitComponent implements OnInit {

  chartData: any[] = []
  profitsPerResto: any[] = []
  profitsTotal: number = 0
  searchForm = new FormGroup({
    gte: new FormControl('', Validators.required),
    lte: new FormControl('', Validators.required),
  });
  isSearching = false

  constructor(private ds: DataServiceService, private dp: DatePipe) { }

  ngOnInit(): void {
    this.load(this.ds.postData('benefice-ekaly', {
    })).then(res => {
      this.profitsPerResto = res.res
      this.fillChart()
      this.calculateProfits()
      console.log(this.profitsPerResto)
    })
  }

  load(obs: Observable<any>) {
    return new Promise<any>((resolve) => {
      obs.subscribe(res => {
        resolve(res)
      })
    })
  }

  fillChart() {
    let newTab: any[] = []
    for (let i = 0; i < this.profitsPerResto.length; i++) {
      newTab[i] = { "name": this.profitsPerResto[i]._id, "value": this.profitsPerResto[i].beneficeTotalEkaly }
    }
    this.chartData = newTab
  }

  calculateProfits() {
    this.profitsTotal = 0
    for (let item of this.profitsPerResto) {
      this.profitsTotal += item.beneficeTotalEkaly
    }
  }

  onSearch() {
    if (this.searchForm.value.gte !== "" && this.searchForm.value.lte != "") {
      this.isSearching = true
      this.load(this.ds.postData('benefice-ekaly', {
        "gte": new Date(this.searchForm.value.gte).getTime(),
        "lte": new Date(this.searchForm.value.lte).getTime()
      })).then(res => {
        this.profitsPerResto = res.res
        console.log(this.profitsPerResto)
        this.fillChart()
        this.calculateProfits()
        this.isSearching = false
        console.log(this.profitsPerResto)
      })
    } else {
      alert('Veuillez préciser les filtres de date')
    }

  }
}
