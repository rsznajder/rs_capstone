import { Component, OnInit } from '@angular/core';
import { Slide } from './viewmodels/slide';
import { SlideImage } from './viewmodels/slideimage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedNoSlideShow: boolean = false;
  carouselInterval: boolean | number = 2000;

  constructor() { }

  toggleSlideShow(event: boolean) {
    this.selectedNoSlideShow = !this.selectedNoSlideShow;
  }

  ngOnInit() {

  }
}
