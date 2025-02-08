import { Component } from '@angular/core';
import { ProductRegistrationService } from '../details/services/product-registration.service';
import { Order } from '../orderdetails/model/order';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-vieworders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vieworders.component.html',
  styleUrl: './vieworders.component.css'
})
export class ViewordersComponent {
  OrderData: Order[]=[];
  UserID: any;

  constructor( private ProductRegistrationService:ProductRegistrationService){

  }

  ngOnInit(){
    this.UserID= JSON.parse(this.getUserID(), this.UserID);
    this.getOrders();
  //  localStorage.clear();
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
    this.ProductRegistrationService.GetOrderListByUserID(this.UserID).subscribe((data)=>{
      console.log('pdata',data);
      this.OrderData=data;
     
     if( !this.OrderData ){
      this.OrderData=[];
     }
    })
  }

}
