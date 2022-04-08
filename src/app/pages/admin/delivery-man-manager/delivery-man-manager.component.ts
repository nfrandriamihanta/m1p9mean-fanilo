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

  restoList: any[] = []
  isLoading = true
  idResto: number = 1
  addRestoForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    lieu: new FormControl('', Validators.required),
    specialite: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private ds: DataServiceService) { }

  ngOnInit(): void {
    this.load(this.ds.getData('listeResto')).then(res => {
      this.restoList = res.res
      console.log(this.restoList)
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

  onAddResto() {
    let newResto: any = {
      "username": this.addRestoForm.value.username,
      "email": this.addRestoForm.value.email,
      "password": this.addRestoForm.value.password,
      "role": "restaurateur",
      "restaurant": {
        "nom": this.addRestoForm.value.nom,
        "lieu": this.addRestoForm.value.lieu,
        "description": this.addRestoForm.value.description,
        "specialite": this.addRestoForm.value.specialite
      }
    }
    this.restoList.push(newResto)
    this.load(this.ds.postData('ajout-restaurant', newResto)).then(res => {
    })

    // console.log(this.restoList)
  }

  passIdResto(id: number) {
    this.idResto = id
    this.addRestoForm = new FormGroup({
      username: new FormControl(this.restoList[id].username, Validators.required),
      email: new FormControl(this.restoList[id].email, Validators.required),
      password: new FormControl(this.restoList[id].password, Validators.required),
      nom: new FormControl(this.restoList[id].restaurant.nom, Validators.required),
      lieu: new FormControl(this.restoList[id].restaurant.lieu, Validators.required),
      specialite: new FormControl(this.restoList[id].restaurant.specialite, Validators.required),
      description: new FormControl(this.restoList[id].restaurant.description, Validators.required)
    });
  }

  onUpdateResto() {
    let newRestoData: any = {
      "ancienNom": this.restoList[this.idResto].restaurant.nom,
      "newData": {
        "username": this.addRestoForm.value.username,
        "email": this.addRestoForm.value.email,
        "password": this.addRestoForm.value.password,
        "role": "restaurateur",
        "restaurant": {
          "nom": this.addRestoForm.value.nom,
          "lieu": this.addRestoForm.value.lieu,
          "description": this.addRestoForm.value.description,
          "specialite": this.addRestoForm.value.specialite
        }
      }
    }
    this.restoList[this.idResto] = newRestoData.newData
    this.load(this.ds.postData('modification-restaurant', newRestoData)).then(res => {
    })
  }

  restoList_remove(id: number) {

    let newRestoList = []
    for (let u = 0; u < id; u++) {
      newRestoList[u] = this.restoList[u]
    }
    for (let i = id; i < this.restoList.length - 1; i++) {
      newRestoList[i] = this.restoList[i + 1]
    }
    this.restoList = newRestoList
    console.log(newRestoList)
    // console.log(this.panier)
  }

  onDelete(id: number) {
    if (confirm("Voulez vous vraiment supprimer ce restaurant définitivement?")) {
      let nom = this.restoList[id].restaurant.nom
      this.restoList_remove(id)
      this.load(this.ds.postData('suppression-restaurant', {
        "restaurant.nom": nom
      })).then(res => {
      })
    }

  }
}
