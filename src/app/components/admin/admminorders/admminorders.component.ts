import { Component } from '@angular/core';
import { Order } from '../../orderdetails/model/order';
import { ProductRegistrationService } from '../../details/services/product-registration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admminorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admminorders.component.html',
  styleUrl: './admminorders.component.css'
})
export class AdmminordersComponent {
  OrderData: Order[]=[];

  constructor( private ProductRegistrationService:ProductRegistrationService){

  }

  ngOnInit(){
    this.getOrders();
 
  }

  getOrders(){
    this.ProductRegistrationService.GetOrderList().subscribe((data)=>{
      console.log('pdata',data);
      this.OrderData=data;
     
     if( !this.OrderData ){
      this.OrderData=[];
     }
    })
  }
}
