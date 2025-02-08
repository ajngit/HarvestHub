import { Component } from '@angular/core';
import { Authenticate } from '../register/Models/Authenticate';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegisterService } from '../register/service/register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaveResponse } from '../../Models/SaveResponse';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  UserData : Authenticate = new Authenticate ();
  UserID: any;
  state$: Observable<any> | undefined;

  constructor(private Regservice : RegisterService,
    private router : Router, private route: ActivatedRoute,
  ){
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state),);

  }

 async ngOnInit(){  

  await this.state$?.subscribe((params) => {
    if (params.UserID !== null && params.UserID !== undefined && params.UserID > 0) 
      { this.UserID = parseInt(params.UserID); }
    
  });
     
     if( this.UserID ){
      await this.GetUser();
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
}
