import { Component } from '@angular/core';
import { Authenticate } from './Models/Authenticate';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './service/register.service';
import { SaveResponse } from '../../Models/SaveResponse';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  UserData : Authenticate = new Authenticate ();
  error: string='';
  IsSubmitted:boolean=false;

  constructor(private Regservice : RegisterService,
    private router : Router
  ){}

  ngOnInit(){

  }

  async Submit(){
    this.IsSubmitted=true;
    if(this.ConfirmPassword()){
      await this.Regservice.SaveUser(this.UserData).subscribe((data)=>{
        console.log(data);
        let resp = new SaveResponse();
        resp=data;
       if( resp.Saved==true){
        alert("Registered!");
        this.IsSubmitted=false;
        this.router.navigate(['login']);
       }
      })
    }
    else{
      this.error="Password not match";
    }
    
  }

  ConfirmPassword(){
   if( this.UserData.ConfirmPassword===this.UserData.Password){
    this.error="";
    return true;
   }else{
    return false;
   }
  }
}
