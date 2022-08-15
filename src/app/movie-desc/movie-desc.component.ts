import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-desc',
  templateUrl: './movie-desc.component.html',
  styleUrls: ['./movie-desc.component.scss'],
})
export class MovieDescComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public movie: {
      Title: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
