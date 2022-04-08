import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { thresholdSturges } from 'd3';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-restorer-profit',
  templateUrl: './restorer-profit.component.html',
  styleUrls: ['./restorer-profit.component.css']
})
export class RestorerProfitComponent implements OnInit {

  chartData: any[] = []

  profitsPerDay: any[] = []

  profitsTotal: number = 0

  searchForm = new FormGroup({
    gte: new FormControl('', Validators.required),
    lte: new FormControl('', Validators.required),
  });

  isSearching = false

  constructor(private ds: DataServiceService, private dp: DatePipe) { }

  ngOnInit(): void {
    this.load(this.ds.postData('benefice-resto', {
      "restaurant": localStorage.getItem("restaurant")
    })).then(res => {
      this.profitsPerDay = res.res
      this.fillChart()
      this.calculateProfits()
      console.log(this.profitsPerDay)
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
    for (let i = 0; i < this.profitsPerDay.length; i++) {
      newTab[i] = { "name": this.dp.transform(this.profitsPerDay[i]._id, "YYYY-dd-MM"), "value": this.profitsPerDay[i].beneficeTotalResto }
    }
    this.chartData = newTab
  }

  calculateProfits() {
    this.profitsTotal = 0
    for (let item of this.profitsPerDay) {
      this.profitsTotal += item.beneficeTotalResto
    }
  }

  onSearch() {
    if (this.searchForm.value.gte !== "" && this.searchForm.value.lte != "") {
      this.isSearching = true
      this.load(this.ds.postData('benefice-resto', {
        "restaurant": localStorage.getItem("restaurant"),
        "gte": new Date(this.searchForm.value.gte).getTime(),
        "lte": new Date(this.searchForm.value.lte).getTime()
      })).then(res => {
        this.profitsPerDay = res.res
        console.log(this.profitsPerDay)
        this.fillChart()
        this.calculateProfits()
        this.isSearching = false
        console.log(this.profitsPerDay)
      })
    } else {
      alert('Veuillez préciser les filtres de date')
    }

  }
}
