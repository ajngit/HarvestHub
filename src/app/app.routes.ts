import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { ViewordersComponent } from './components/vieworders/vieworders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddproductsComponent } from './components/farmer/addproducts/addproducts.component';
import { FarmerordersComponent } from './components/farmer/farmerorders/farmerorders.component';
import { AdmminordersComponent } from './components/admin/admminorders/admminorders.component';
import { AllproductsComponent } from './components/admin/allproducts/allproducts.component';
import { FarmerInfoComponent } from './components/admin/farmer-info/farmer-info.component';
import { DashboardComponent } from './components/farmer/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';

export const routes: Routes = [

    {
        path:'',component:HomeComponent ,canActivate: [AuthGuard]
      },
      {
        path:'login',component:LoginComponent
      },
      {
        path:'register',component:RegisterComponent
      },
      {
        path:'details',component:DetailsComponent
      },
      {
        path:'cart',component:CartComponent
      },

      {
        path:'checkout',component:CheckoutComponent
      },
      {
        path:'payment',component:PaymentComponent
      },

      {
        path:'order',component:OrderdetailsComponent
      },

      {
        path:'vieworders',component:ViewordersComponent
      },

      {
        path:'profile',component:ProfileComponent
      },
      //
      {
        path:'addproduct',component:AddproductsComponent ,canActivate: [AuthGuard]
      },

      {
        path:'farmerorders',component:FarmerordersComponent
      },
      {
        path:'adminorders',component:AdmminordersComponent
      },

      {
        path:'allproducts',component:AllproductsComponent
      },

      {
        path:'farmerinfo',component:FarmerInfoComponent
      },

      {
        path:'dashboard',component:DashboardComponent
      },

      {
        path:'admin',component:AdminComponent
      },

      {
        path:'userdetails',component:UserDetailsComponent
      },
      

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
