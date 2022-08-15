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
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  searchText: any;

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  // checkFavorites(_id: any) {
  //   const favoriteMovies = this.favoriteMovies;

  //   const movies = this.movies;
  //   let isFavorite: boolean = false;

  //   movies.forEach((_id) => {
  //     console.log(this.favoriteMovies);

  //     if (favoriteMovies.some((_id) => favoriteMovies.includes(_id)))
  //       isFavorite = true;
  //   });
  // }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  // isFavorite(id: string): boolean {
  //   return this.favoriteMovies.includes(id);
  // }

  viewGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }

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

  viewMovieDescDialog(title: string, description: string): void {
    this.dialog.open(MovieDescComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '450px',
    });
  }

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
