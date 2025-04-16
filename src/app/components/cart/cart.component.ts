import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from '../details/Models/Registration';
import { ProductService } from '../home/services/product.service';
import { ProductRegistrationService } from '../details/services/product-registration.service';
import { Cart } from '../details/Models/cart';
import { SaveResponse } from '../../Models/SaveResponse';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  CartItemID: any;
  state$: any;
  Registration : Registration = new Registration();
  CartData :Cart[]=[];
  UserID: any;
  SubTotal: number=0;
  DeliveryFee : number=0;
  ProductRegDetails: Registration[]=[];

  constructor(private ProductService : ProductService,
    private router : Router,
    private route :ActivatedRoute,
    private ProductRegistrationService:ProductRegistrationService
  ){
     

  }

  async ngOnInit(){
   // this.cartItemID= JSON.parse(this.getcartItemID(), this.cartItemID);
    this.UserID= JSON.parse(this.getUserID(), this.UserID);
   
  this.getCart();

  }


  getCart(){
    this.ProductRegistrationService.GetCart(this.UserID).subscribe((data)=>{
      console.log('pdata',data);
      this.CartData=data;
     if( !this.CartData ){
      this.CartData=[];
     }
     else{
      this.CartData.forEach((data)=>{
         this.SubTotal +=data.Quantity*data.Price;
      })
     }
    })
  }

  

  getcartItemID(): string {
    let cartItemID = localStorage.getItem('cartItemID');
    if(cartItemID){
      return cartItemID;
    }else{
      return '';
    }
     
  }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if(UserID){
      return UserID;
    }else{
      return '';
    }
     
  }
  Quantitychange(data:Cart){
    data.NetTotal=data.Price*data.Quantity;
    this.SubTotal=0;
    this.CartData.forEach((data)=>{
      this.SubTotal +=data.Price*data.Quantity;
   })
  }

  async Checkout() {
    for (const data of this.CartData) {
      this.Registration.ProductID = data.ProductID;
      this.Registration.NetTotal = data.Price * data.Quantity;
      this.Registration.Quantity = data.Quantity;
      this.Registration.ModifiedUser = this.UserID;
      this.Registration.CartItemID = data.CartItemID;
  
      this.ProductRegistrationService.SaveRegistration(this.Registration)
        .subscribe((data) => {
          let resp = new SaveResponse();
          resp = data;
          if (resp.Saved == true) {
            console.log('Cart item updated');
          }
        });
    }
  
    this.router.navigate(['checkout']);
  }
  

  //   debugger;
  //   this.CartData.forEach((data)=>{

  //     this.Registration.ProductID=data.ProductID;
  //     this.Registration.NetTotal =data.NetTotal;
  //     this.Registration.Quantity=0;
  //     this.Registration.Quantity=data.Quantity;
  //     this.Registration.NetTotal=data.Price*data.Quantity;
  //     this.Registration.ModifiedUser=this.UserID;
  //     this.Registration.cartItemID=data.cartItemID;
     
  //     console.log('test reg',this.Registration);
    
  //      this.ProductRegistrationService.SaveRegistration(this.Registration)
  //       .subscribe((data) => {
  //         console.log(data);
  //         let resp = new SaveResponse();
  //         resp = data;
  //         debugger;
  //         if (resp.Saved == true) {
  //          // alert("Added To cart!");
  //           console.log('added');
    
           
  //         }
  //       })
      

  //   })

  //   this.router.navigate(['checkout']);
      
  //   }

  DeleteCartItem(CartItemID: number) {
    this.ProductRegistrationService
      .DeleteCartItem(CartItemID)
      .subscribe(async (data: any) => {
        let response: SaveResponse = new SaveResponse();
        response = data;
        console.log('response', response);
        if (response.Saved == true) {
          alert("Item Deleted!");
           await this.getCart();
        }
      });
  }
    


    
}
