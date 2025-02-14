import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService } from './services/nav-bar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  userId = localStorage.getItem('userId');

  constructor(private router: Router, private navBarService: NavBarService) {}

  logout() {
    let user = {
      id: this.userId
    };
    this.navBarService.logOut(user).subscribe({
      next: (data:any) => {
        if (data['status']) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    })
  }
}
