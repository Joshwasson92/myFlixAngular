import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDescComponent } from './movie-desc.component';

describe('MovieDescComponent', () => {
  let component: MovieDescComponent;
  let fixture: ComponentFixture<MovieDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
