import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { LogoutComponent } from '../../logout/logout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,FooterComponent,LogoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
