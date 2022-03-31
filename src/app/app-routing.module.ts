import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationContainerComponent } from './pages/authentification/authentification-container/authentification-container.component';
import { SignInComponent } from './pages/authentification/authentification-container/sign-in/sign-in.component';
import { SignUpComponent } from './pages/authentification/authentification-container/sign-up/sign-up.component';

const routes: Routes = [{
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
