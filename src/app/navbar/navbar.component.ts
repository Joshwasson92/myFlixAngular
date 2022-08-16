import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';

/**
 * This is the class for the Navigation Bar
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  username: any = '';
  constructor(public router: Router) {}

  ngOnInit(): void {}

  /**
   * This function removes the token and username from local storage and navigates back to welcome page.
   * {@link[/welcome]}
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  /**
   * This function navigates to the view profile component.
   * {@link[/profile]}
   */
  viewProfile(): void {
    this.router.navigate([`profile`]);
  }
}
