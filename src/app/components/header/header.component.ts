import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  UserID: any;

  constructor(private router:Router){}

  ngOnInit(){
    this.UserID = JSON.parse(this.getUserID(), this.UserID);


    
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if (UserID) {
      return UserID;
    } else {
      return '';
    }

  }


}
