import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { AuthentificationContainerComponent } from './pages/authentification/authentification-container/authentification-container.component';
import { SignInComponent } from './pages/authentification/authentification-container/sign-in/sign-in.component';
import { SignUpComponent } from './pages/authentification/authentification-container/sign-up/sign-up.component';
import { CustomerFoodListComponent } from './pages/customer/customer-food-list/customer-food-list.component';
import { CustomerRestoListComponent } from './pages/customer/customer-resto-list/customer-resto-list.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
