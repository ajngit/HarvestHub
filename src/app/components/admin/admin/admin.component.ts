import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from '../../logout/logout.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule,LogoutComponent,FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
