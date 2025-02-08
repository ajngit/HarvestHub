import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { ProductDetail } from '../../Models/ProductDetail';
import { ProductService } from './services/product.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,HeaderComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
}