import { Component } from '@angular/core';
import { ProductDetail } from '../../Models/ProductDetail';
import { map, Observable } from 'rxjs';
import { Registration } from './Models/Registration';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SaveResponse } from '../../Models/SaveResponse';
import { ProductService } from '../home/services/product.service';
import { ProductRegistrationService } from './services/product-registration.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from './Models/Review';
declare var $: any; // Declare jQuery
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  ProductDetails: ProductDetail = new ProductDetail();
  ProductID: number = 0;
  state$: Observable<any> | undefined;
  Registration: Registration = new Registration();
  Review : Review= new Review();
  cartItemID: any;
  UserID: any;
  ProductRegDetails: Registration[] = [];
  ReviewList:Review[]=[];


  constructor(private ProductService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private ProductRegistrationService: ProductRegistrationService
  ) {
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state),);
    // platformLocation.onPopState(() => {});

  }

  async ngOnInit() {
    await this.state$?.subscribe((params) => {
      if (params.ProductID !== null && params.ProductID !== undefined && params.ProductID > 0) { this.ProductID = parseInt(params.ProductID); }
      //console.log('ProductID', this.ProductID); // ProductID }); 
    });

    this.UserID = JSON.parse(this.getUserID(), this.UserID);
    
    if (this.ProductID && this.ProductID > 0) {
      await this.GetProductDetails();
      await this.GetReviews();
    }
  }

  openModal() {
    $('#exampleModal').modal('show');
}

closeModal() {
    $('#exampleModal').modal('hide');
}

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if (UserID) {
      return UserID;
    } else {
      return '';
    }

  }



  async GetProductDetails() {
    await this.ProductService.GetProductByID(this.ProductID).subscribe((data) => {
      console.log('pdata', data);

      this.ProductDetails = data;
      if (data instanceof Array) {
        this.ProductDetails = data[0];
      }
      if (!this.ProductDetails) {
        this.ProductDetails = new ProductDetail();
      }
    })

  }

  async GetReviews() {
    await this.ProductRegistrationService.GetReviews(this.ProductID).subscribe((data) => {
      console.log('pdata', data);

      this.ReviewList = data;
      if (!this.ReviewList) {
        this.ReviewList = [];
      }
    })

  }

  async AddToCart() {

    debugger;
    this.Registration.ProductID = this.ProductID;
    this.Registration.ModifiedUser = this.UserID;
    if(this.cartItemID){
      this.Registration.CartItemID = this.cartItemID;
    }
   // this.Registration.Calculate(this.ProductDetails);
    this.Registration.NetTotal=this.ProductDetails.Price*this.Registration.Quantity;
    console.log('test reg', this.Registration);

    this.ProductRegistrationService.SaveRegistration(this.Registration)
      .subscribe((data) => {
        console.log(data);
        let resp = new SaveResponse();
        resp = data;
        debugger;
        if (resp.Saved == true) {
         // alert("Added To cart!");
          console.log('added');
          this.cartItemID = resp.ID;
          localStorage.setItem('cartItemID', JSON.stringify(this.cartItemID));

          this.router.navigate(['cart']);
        }
      })


  }

  async SubmitReview() {
    this.Review.ProductID = this.ProductID;
    this.Review.ModifiedUser = this.UserID;
    console.log('review', this.Review);

    this.ProductRegistrationService.SaveReview(this.Review)
      .subscribe((data) => {
        console.log(data);
        let resp = new SaveResponse();
        resp = data;
        debugger;
        if (resp.Saved == true) {
        //  alert("Review Submitted!");
          this.GetReviews();
        }
      })


  }

  DeleteReview(ReviewID: number) {

    // if (this.IsSaving) {
    //   return;
    // }
    // this.IsDeleteing = true;
    this.ProductRegistrationService
      .DeleteReview(ReviewID)
      .subscribe(async (data: any) => {
        let response: SaveResponse = new SaveResponse();
        response = data;
        console.log('response', response);
        if (response.Saved == true) {
         // alert("review Deleted!");
           await this.GetReviews();
        }
      });
  }

  ChangeQuantity(event:any){
    if(event && event >0){
      this.Registration.Quantity=event;
    }else{
      this.Registration.Quantity=0;
    }

  }

 
  

}
