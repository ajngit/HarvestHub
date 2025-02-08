import { Component } from '@angular/core';
import { ProductDetail } from '../../../Models/ProductDetail';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../home/services/product.service';
import { SaveResponse } from '../../../Models/SaveResponse';

@Component({
  selector: 'app-addproducts',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './addproducts.component.html',
  styleUrl: './addproducts.component.css'
})
export class AddproductsComponent {

  ProductDetails: ProductDetail[] = [];
  UserID: any;
  Product: ProductDetail = new ProductDetail();
  isValid: boolean =false;
  isSubmitted: boolean=false;

  constructor(private ProductService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.UserID = JSON.parse(this.getUserID(), this.UserID);
    await this.GetProducts();
  }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if (UserID) {
      return UserID;
    } else {
      return '';
    }
  }

  async GetProducts() {
    await this.ProductService.GetProductsByUserID(this.UserID).subscribe((data) => {
      console.log('pdata', data);
      this.ProductDetails = data;
      if (!this.ProductDetails) {
        this.ProductDetails = [];
      }
    })
  }


  async saveProduct() {
    this.Product.ModifiedUser = this.UserID;
    this.isSubmitted =true;
    if(this.IsValid()==false){
      return;
    }
   
    this.ProductService.SaveProduct(this.Product)
      .subscribe((data) => {
        console.log(data);
        let resp = new SaveResponse();
        resp = data;
        if (resp.Saved == true) {
          this.GetProducts();
          console.log('added');
        }
        this.isSubmitted =false;
      })
  }

  IsValid() {
    this.isValid = true;

    this.Product.ProductName = this.Product.ProductName  ?? '';

    this.Product.Description =  this.Product.Description ?? '';

    this.Product.Price =  this.Product.Price ?? 0 ;

    this.Product.ImageURL = this.Product.ImageURL  ?? '';

    this.Product.TotalQuantity =  this.Product.TotalQuantity ?? 0;

    this.Product.ProductType =  this.Product.ProductType ?? 0 ;

    if ( this.Product.TotalQuantity == 0 ||
      this.Product.ImageURL =='' || this.Product.Price == 0 ||
      this.Product.Description =='' || this.Product.ProductName == ''
    ) {
      return  false;
    }
    else {
      return  true;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.Product.ImageURL = e.target.result;  // This will store the base64 URL of the image
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  }


  EditProduct(product: ProductDetail) {
    this.Product = product;
  }

  DeleteProduct(productID: number) {
    this.ProductService
      .DeleteProduct(productID)
      .subscribe(async (data: any) => {
        let response: SaveResponse = new SaveResponse();
        response = data;
        console.log('response', response);
        //  if (response.Saved == true) {
        //    alert("Product Deleted!");
        await this.GetProducts();
        // }
      });
  }
}
