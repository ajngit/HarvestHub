import { Component } from '@angular/core';
import { ProductDetail } from '../../../Models/ProductDetail';
import { Router } from '@angular/router';
import { ProductService } from '../../home/services/product.service';
import { CommonModule } from '@angular/common';
import { SaveResponse } from '../../../Models/SaveResponse';

@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css'
})
export class AllproductsComponent {
  ProductDetails : ProductDetail[] = [];
  constructor(
    private ProductService : ProductService,
              private router : Router,
              ){}

  async ngOnInit(){  
   
    await this.GetProducts();
  }

  async GetProducts(){
    await this.ProductService.GetProducts().subscribe((data)=>{
      console.log('pdata',data);
      this.ProductDetails=data;
     if( !this.ProductDetails ){
      this.ProductDetails=[];
     }
    })
   
}


DeleteProduct(ProductID: number) {

  // if (this.IsSaving) {
  //   return;
  // }
  // this.IsDeleteing = true;
  this.ProductService
    .DeleteProduct(ProductID)
    .subscribe(async (data: any) => {
      let response: SaveResponse = new SaveResponse();
      response = data;
      console.log('response', response);
      if (response.Saved == true) {
       
       // this.IsDeleteing = false;
         await this.GetProducts();


      }
    });
}



// Approve(data: ProductDetail) {

//   this.ProductDetail.APPROVED = true;
 
// }




}
