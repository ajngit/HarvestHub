import { Component } from '@angular/core';
import { ProductDetail } from '../../../Models/ProductDetail';
import { Router } from '@angular/router';
import { RegisterService } from '../../register/service/register.service';
import { Authenticate } from '../../register/Models/Authenticate';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../home/services/product.service';
import { SaveResponse } from '../../../Models/SaveResponse';
import { LoginService } from '../../../services/login.service';
@Component({
  selector: 'app-farmer-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farmer-info.component.html',
  styleUrl: './farmer-info.component.css'
})
export class FarmerInfoComponent {

  UserData : Authenticate []=[];

  constructor(private Regservice : RegisterService, private readonly UserService : LoginService,
    private router : Router
  ){}

 async ngOnInit(){  
      await this.GetUser();
     
   
  }

  GetUser(){
    this.Regservice.GetUserList().subscribe((data)=>{
      console.log('pdata',data);
      this.UserData=data;

      
     
     if( !this.UserData ){
      this.UserData=[];
     }
    })
  }


  DeleteUser(UserID: number) {

    // if (this.IsSaving) {
    //   return;
    // }
    // this.IsDeleteing = true;
    this.UserService.DeleteUser(UserID)
      .subscribe(async (data: any) => {
        let response: SaveResponse = new SaveResponse();
        response = data;
        console.log('response', response);
        if (response.Saved == true) {
         
           await this.GetUser();
  
  
        }
      });
  }
 
   
  }


