import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  logout() {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    localStorage.removeItem('userDetails'); // Clear user details
    localStorage.removeItem('expiryTime'); // Clear expiration time
    this.router.navigate(['/login']); // Redirect to login page
  }
}
