import { Component } from '@angular/core';
import { SaveResponse } from '../../Models/SaveResponse';
import { Authenticate } from '../register/Models/Authenticate';
import { Router } from '@angular/router';
import { RegisterService } from '../register/service/register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  UserData : Authenticate = new Authenticate ();
  UserID: any;
  Submitted: boolean = false;

  constructor(private Regservice : RegisterService,
    private router : Router
  ){}

 async ngOnInit(){  
     this.UserID = JSON.parse(await this.getUserID(), this.UserID);
     if( this.UserID ){
      await this.GetUser();
     }
   
  }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if (UserID) {
      return UserID;
    } else {
      return '';
    }

  }

  async Submit(){
    this.Submitted=true;
    if(this.IsValid()==false){
      return;
    }
    await this.Regservice.SaveUser(this.UserData).subscribe((data)=>{
      console.log(data);
      let resp = new SaveResponse();
      resp=data;
     if( resp.Saved==true){
      alert("Saved!");
     // this.router.navigate(['login']);
     }
    })
   
  }

  IsValid() {


    this.UserData.UserName =  this.UserData.UserName ?? '';

    this.UserData.Email =  this.UserData.Email ?? 0 ;

    this.UserData.ImageURL = this.UserData.ImageURL  ?? '';

    if ( this.UserData.UserName == '' ||
      this.UserData.ImageURL =='' || this.UserData.Email == '' 
    ) {
      return  false;
    }
    else {
      return  true;
    }
  }
 
  GetUser(){
    this.Regservice.GetUser(this.UserID).subscribe((data)=>{
      console.log('pdata',data);
      this.UserData=data;

      if(data instanceof Array){
this.UserData=data[0];
      }
     
     if( !this.UserData ){
      this.UserData=new Authenticate();
     }
    })
  }
 
   onFileSelected(event: any) {
    debugger;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.UserData.ImageURL = e.target.result;  // This will store the base64 URL of the image
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  }

}
