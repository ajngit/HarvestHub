import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../home/services/product.service';
import { ProductRegistrationService } from '../details/services/product-registration.service';
import { Cart } from '../details/Models/cart';
import { SaveResponse } from '../../Models/SaveResponse';
import { PaymentData } from './Models/payment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  UserID: any;
  CartData: Cart[] = [];
  SubTotal: number = 0;
  PaymentData: PaymentData = new PaymentData();
  ProductRegID: any;
  isValid: boolean=true;
  errormsg: string='';
  Submitted:boolean=false;

  constructor(private ProductService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private ProductRegistrationService: ProductRegistrationService) { 
      
    }

  ngOnInit() {
    this.UserID = JSON.parse(this.getUserID(), this.UserID);
    this.ProductRegID = JSON.parse(this.getProductRegID(), this.ProductRegID);
    this.getCart();
  }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if (UserID) {
      return UserID;
    } else {
      return '';
    }

  }

  getProductRegID(): string {
    let ProductRegID = localStorage.getItem('ProductRegID');
    if (ProductRegID) {
      return ProductRegID;
    } else {
      return '';
    }

  }

  getCart() {
    this.ProductRegistrationService.GetCart(this.UserID).subscribe((data) => {
      console.log('pdata', data);
      this.CartData = data;
      if (!this.CartData) {
        this.CartData = [];
      }
      else {
        this.CartData.forEach((data) => {
          this.SubTotal += data.NetTotal;
        })
      }
    })
  }


  async Payment() {
    debugger;
    this.Submitted=true;
    if (this.IsValid() == false) {
      return;
    }

    if (this.PaymentData.CardNumber == '123456789' && this.PaymentData.CVV == 123 && this.PaymentData.Expiry == '01/26') {




      this.PaymentData.ProductRegID = this.ProductRegID;
      this.PaymentData.PaymentType = 'CARD';
      this.PaymentData.NetTotal = this.SubTotal + 40;
      this.PaymentData.ModifiedUser = this.UserID;

      console.log(this.PaymentData);


      await this.ProductRegistrationService.SaveOrder(this.PaymentData).subscribe((data) => {
        console.log(data);
        let resp = new SaveResponse();
        resp = data;
        if (resp.Saved == true) {
         // alert("Payment Success!");
          this.Submitted=false;
          this.errormsg ='';
          this.router.navigate(['order'], { state: { orderID: resp.ID } });

        }
      })

    }else{
      this.errormsg ='wrong credentials';
      this.Submitted=false;
    }
  }

  IsValid() {
    this.isValid = true;

    this.PaymentData.CardNumber = this.PaymentData.CardNumber == null ||
      this.PaymentData.CardNumber == undefined ||
      this.PaymentData.CardNumber == ''
      ? '' : this.PaymentData.CardNumber;

    this.PaymentData.CVV = this.PaymentData.CVV == null ||
      this.PaymentData.CVV == undefined ||
      this.PaymentData.CVV <= 0
      ? 0 : this.PaymentData.CVV;

    this.PaymentData.Expiry = this.PaymentData.Expiry == null ||
      this.PaymentData.Expiry == undefined ||
      this.PaymentData.Expiry == ''
      ? '' : this.PaymentData.Expiry;

    if (this.PaymentData.Expiry == '' || this.PaymentData.CardNumber == '' || this.PaymentData.CVV == 0) {
      return  false;
    }
    else {
      return true;
    }
  }

}
