import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  user: any = {};
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  /**
   * Makes API call to fetch user information
   */
  getUserProfile(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  /**
   *Opens the dialog page for viewing the users profile.
   */
  openUserUpdateDialog(): void {
    console.log(this.user);
    this.dialog.open(ProfilePageComponent, {
      width: '450px',
    });
  }

  /**
   * Back button to navigate back to movies
   * {@link[/movies]}
   */
  back(): void {
    this.router.navigate(['/movies']);
  }

  /**
   *  boolean
   * after confirming to delete account, account is deleted then navigates back to Welcome Screen
   */
  deleteUser(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This cannnot be undone.'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
