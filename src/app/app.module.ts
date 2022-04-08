import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationContainerComponent } from './pages/authentification/authentification-container/authentification-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './pages/authentification/authentification-container/sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './pages/authentification/authentification-container/sign-up/sign-up.component';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { CustomerRestoListComponent } from './pages/customer/customer-resto-list/customer-resto-list.component';
import { CustomerFoodListComponent } from './pages/customer/customer-food-list/customer-food-list.component';
import { CustomerOrderListComponent } from './pages/customer/customer-order-list/customer-order-list.component';
import { FoodManagerComponent } from './pages/restorer/food-manager/food-manager.component';
import { RestorerOrderManagerComponent } from './pages/restorer/restorer-order-manager/restorer-order-manager.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { DatePipe } from '@angular/common';
import { RestorerProfitComponent } from './pages/restorer/restorer-profit/restorer-profit.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestoManagerComponent } from './pages/admin/resto-manager/resto-manager.component';
import { DeliveryManManagerComponent } from './pages/admin/delivery-man-manager/delivery-man-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationContainerComponent,
    SignInComponent,
    SignUpComponent,
    DefaultLayoutComponent,
    CustomerRestoListComponent,
    CustomerFoodListComponent,
    CustomerOrderListComponent,
    FoodManagerComponent,
    RestorerOrderManagerComponent,
    RestorerProfitComponent,
    RestoManagerComponent,
    DeliveryManManagerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    NgxChartsModule,
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
