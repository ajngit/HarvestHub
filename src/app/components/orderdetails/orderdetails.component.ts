import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRegistrationService } from '../details/services/product-registration.service';
import { Customer } from '../checkout/model/Customer';
import { Order } from './model/order';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent {
  Customer: Customer=new Customer();
  UserID: any;
  OrderData:Order[]=[];
  state$: Observable<any> | undefined;
  OrderID: number=0;

  constructor(private router : Router,
    private route :ActivatedRoute,
    private ProductRegistrationService:ProductRegistrationService){
      this.state$ = this.route.paramMap.pipe(map(() => window.history.state),);
  }

  async ngOnInit(){

    await this.state$?.subscribe((params) => {
      console.log(params);
      
      if (params.orderID !== null && params.orderID !== undefined && params.orderID > 0) { this.OrderID = parseInt(params.orderID); }
      console.log('OrderID', this.OrderID); // ProductID }); 
    });

    localStorage.removeItem('ProductRegID');

    
    this.UserID= JSON.parse(this.getUserID(), this.UserID);
    this.getContact();
    this.getOrder();
    
  }

  // ngOnDestroy(){
      
  // }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if(UserID){
      return UserID;
    }else{
      return '';
    }
     
  }
  getContact(){
    this.ProductRegistrationService.GetCustomer(this.UserID).subscribe((data)=>{
      console.log('pdata',data);
      this.Customer=data;
      if(data instanceof Array){
        this.Customer=data[0];
      }
     if( !this.Customer ){
      this.Customer=new Customer();
     }
    })
  }

  getOrder(){ 
    this.ProductRegistrationService.GetOrder(this.OrderID).subscribe((data)=>{
      console.log('pdata',data);
      this.OrderData=data;
    //   if(data instanceof Array){
    //    this.OrderData=data[0];
    //   }
    //  if( !this.OrderData ){
    //   this.OrderData=new Order();
    //  }
    })
  }
}
