import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { path } from 'd3';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { DeliveryManManagerComponent } from './pages/admin/delivery-man-manager/delivery-man-manager.component';
import { RestoManagerComponent } from './pages/admin/resto-manager/resto-manager.component';
import { AuthentificationContainerComponent } from './pages/authentification/authentification-container/authentification-container.component';
import { SignInComponent } from './pages/authentification/authentification-container/sign-in/sign-in.component';
import { SignUpComponent } from './pages/authentification/authentification-container/sign-up/sign-up.component';
import { CustomerFoodListComponent } from './pages/customer/customer-food-list/customer-food-list.component';
import { CustomerOrderListComponent } from './pages/customer/customer-order-list/customer-order-list.component';
import { CustomerRestoListComponent } from './pages/customer/customer-resto-list/customer-resto-list.component';
import { FoodManagerComponent } from './pages/restorer/food-manager/food-manager.component';
import { RestorerOrderManagerComponent } from './pages/restorer/restorer-order-manager/restorer-order-manager.component';
import { RestorerProfitComponent } from './pages/restorer/restorer-profit/restorer-profit.component';

const routes: Routes = [
  {
    path: '',
    component: AuthentificationContainerComponent,
    children: [
      {
        path: '',
        component: SignInComponent
      },
      {
        path: 'connexion',
        component: SignInComponent
      },
      {
        path: 'inscription',
        component: SignUpComponent
      }
    ]
  },
  {
    path: 'client',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: CustomerRestoListComponent
      },
      {
        path: 'menu/:restaurant',
        component: CustomerFoodListComponent
      },
      {
        path: 'mes-commandes',
        component: CustomerOrderListComponent
      }
    ]
  },
  {
    path: 'restaurateur',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: FoodManagerComponent
      },
      {
        path: 'gestion-commandes',
        component: RestorerOrderManagerComponent
      },
      {
        path: 'benefice',
        component: RestorerProfitComponent
      }
    ]
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: RestoManagerComponent
      },
      {
        path: 'gestion-livreur',
        component: DeliveryManManagerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
