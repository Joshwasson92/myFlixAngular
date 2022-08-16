import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { MovieDescComponent } from '../movie-desc/movie-desc.component';
import { DirectorComponent } from '../director/director.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})

/**
 * This is the Class for seeing movie data.
 */
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  searchText: any;

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * API call for the movies collection
   * @returns Movies Collection.

   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * API call to retrieve the users favorite movies.
   * @return Users Favorite Movies array

   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * Opens a dialog to view the movie genre information
   * @param name:string, description:string
   */
  viewGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }

  /**
   * Opens a dialog to view the directors information
   * @param name:string, bio:string, birthday:Date
   */
  viewDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      width: '450px',
    });
  }

  /**
   * Opens a dialog to view the movies description.
   * @param title:string, description:string
   */
  viewMovieDescDialog(title: string, description: string): void {
    this.dialog.open(MovieDescComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '450px',
    });
  }

  /**
   * Makes an API call to the database to add a movie to the users favorite movies array and then opens a notification that a movie has been added.
   * @param _id:string
   * @returns Users Favorite Movies array
   */
  addFavoriteMovie(_id: string): void {
    this.fetchApiData.addFavoriteMovies(_id).subscribe((resp: any) => {
      this.favoriteMovies = resp;
      return this.favoriteMovies;
    });
    this.getFavoriteMovies();
    this.snackBar.open('Movie added to Favorites!', 'OK', {
      duration: 2000,
    });
  }
  /**
   * Makes an API call to the database to remove a movie to the users favorite movies array and then opens a notification that a movie has been removed.
   * @param _id:string
   * @returns Users Favorite Movies array.
   */
  removeFavoriteMovie(_id: string): void {
    this.fetchApiData.deleteFavoriteMovie(_id).subscribe((resp: any) => {
      this.favoriteMovies = resp;
      return this.favoriteMovies;
    });
    this.getFavoriteMovies();
    this.snackBar.open('Movie removed from Favorites!', 'OK', {
      duration: 2000,
    });
  }
}
