import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(private ds: DataServiceService, private dp: DatePipe) { }

  ngOnInit(): void {
    this.load(this.ds.postData('benefice-resto', {
      "restaurant": localStorage.getItem("restaurant")
    })).then(res => {
      this.profitsPerDay = res.res
      this.fillChart()
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
      newTab[i] = { "name": this.dp.transform(this.profitsPerDay[i]._id, "YYYY-dd-MM hh:mm a"), "value": this.profitsPerDay[i].beneficeTotalResto }
    }
    this.chartData = newTab
  }
}
