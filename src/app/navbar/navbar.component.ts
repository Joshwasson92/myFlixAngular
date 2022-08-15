import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  username: any = '';
  constructor(public router: Router) {}

  ngOnInit(): void {}

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  viewProfile(): void {
    this.router.navigate([`profile`]);
  }
}
