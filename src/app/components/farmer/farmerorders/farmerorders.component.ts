import { Component } from '@angular/core';
import { ProductRegistrationService } from '../../details/services/product-registration.service';
import { Order } from '../../orderdetails/model/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farmerorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farmerorders.component.html',
  styleUrl: './farmerorders.component.css'
})
export class FarmerordersComponent {
  UserID: any;
  OrderData: Order[]=[];


  constructor( private ProductRegistrationService:ProductRegistrationService){}

  ngOnInit(){
    this.UserID= JSON.parse(this.getUserID(), this.UserID);
    this.getOrders();
  }
 

getUserID(): string {
let UserID = localStorage.getItem('UserID');
if(UserID){
 return UserID;
}else{
 return '';
}

 }


getOrders(){
this.ProductRegistrationService.GetOrderListByFarmerID(this.UserID).subscribe((data)=>{
 console.log('pdata',data);
 this.OrderData=data;
 
if( !this.OrderData ){
 this.OrderData=[];
}
})
 }

}
