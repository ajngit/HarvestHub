import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Customer } from './model/Customer';
import { FormsModule } from '@angular/forms';
import { ProductRegistrationService } from '../details/services/product-registration.service';
import { SaveResponse } from '../../Models/SaveResponse';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,RouterModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  CustomerData : Customer= new Customer();
  UserID: any;
  Customer: Customer= new Customer();
  isSubmitted: boolean=false;

  constructor(private router : Router,
    private route :ActivatedRoute,
  private ProductRegistrationService : ProductRegistrationService){

  }
  async ngOnInit(){
    this.UserID= JSON.parse(this.getUserID(), this.UserID);
    await this.getContact();
   
  }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if(UserID){
      return UserID;
    }else{
      return '';
    }
     
  }

  async saveCustomer(){

    debugger;
    this.isSubmitted=true;
    if(this.IsValid()==false){
      return;
    }
    this.CustomerData.ModifiedUser=this.UserID;
      console.log('test reg',this.CustomerData);
    
      this.ProductRegistrationService.SaveCustomer(this.CustomerData)
        .subscribe((data) => {
          console.log(data);
          let resp = new SaveResponse();
          resp = data;
          debugger;
          if (resp.Saved == true) {
           // alert("Added To cart!");
            console.log('added');
           // this.ProductRegID = resp.ID;
           // localStorage.setItem('ProductRegID', JSON.stringify(this.ProductRegID));
    
           this.router.navigate(['payment']);
          }
        })
      
    
    }

    IsValid() {
  
      this.CustomerData.ContactName = this.CustomerData.ContactName  ?? '';
  
      this.CustomerData.Email =  this.CustomerData.Email ?? '';
  
      this.CustomerData.Phone =  this.CustomerData.Phone ?? '' ;
  
      this.CustomerData.StreetAddress = this.CustomerData.StreetAddress  ?? '';
  
      this.CustomerData.ZipCode =  this.CustomerData.ZipCode ?? '';
  
  
      if ( this.CustomerData.ContactName == '' ||
        this.CustomerData.Email =='' || this.CustomerData.StreetAddress == '' ||
        this.CustomerData.Phone =='' || this.CustomerData.ZipCode == ''
      ) {
        return  false;
      }
      else {
        return  true;
      }
    }

    async getContact(){
      await this.ProductRegistrationService.GetCustomer(this.UserID).subscribe((data)=>{
        console.log('pdata',data);
        this.Customer=data;
        if(data instanceof Array){
          this.Customer=data[0];
        }
       if( !this.Customer ){
        this.Customer=new Customer();;
       }
       if( this.Customer){
        this.CustomerData= this.Customer;
       }
      })
    }

}
