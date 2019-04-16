import { Component, OnInit, HostListener } from '@angular/core';
import { Slide } from './viewmodels/slide';
import { SlideImage } from './viewmodels/slideimage';
import { Globals } from '../../_globals/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideList: Slide[] = <Slide[]>[];
  activeSlide: number = 0;
  selectedNoSlideShow: boolean = false;
  carouselInterval: boolean | number = 3000;
  mode = 0;

  constructor(private _globals: Globals) { }

  /* rubric10 */
  toggleSlideShow(event: boolean) {
    this.selectedNoSlideShow = !event;
    if (this.selectedNoSlideShow === true) {
      this.carouselInterval = false;
    } else {
      this.carouselInterval = 3000;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window) {
      if (window.innerWidth <= this._globals.mediaScreenMedium) {
        if (this.mode === 1) {
          return;
        }
        this.setSlideList(1);
      } else if (window.innerWidth <= this._globals.mediaScreenLarge) {
        if (this.mode === 2) {
          return;
        }
        this.setSlideList(2);
      } else {
        if (this.mode === 3) {
          return;
        }
        this.setSlideList(3);
      }
    }
  }

  /* rubric01, rubric02, rubric03 */
  /* carousel displays different number of products depending on the size of the viewport */
  setSlideList(mode: number) {
    if (this.mode === mode) {
      return;
    }
    // debugger;
    const selectedNoSlideShowCopy = this.selectedNoSlideShow;
    const carouselIntervalCopy = this.carouselInterval;
    // this.selectedNoSlideShow = true;
    this.carouselInterval = false;
    this.mode = mode;
    this.slideList = <Slide[]>[];
    if (mode === 1) {
      const slide1 = new Slide();
      slide1.products.push(new SlideImage('Baby Bottle', 'assets/img/baby_care/babybottle.png'));
      const slide2 = new Slide();
      slide2.products.push(new SlideImage('Baby Girl Dress', 'assets/img/baby_care/babydress.png'));
      const slide3 = new Slide();
      slide3.products.push(new SlideImage('Baby Monitor', 'assets/img/baby_care/babymonitor.png'));
      const slide4 = new Slide();
      slide4.products.push(new SlideImage('Apple Juice', 'assets/img/beverages/applejuice.png'));
      const slide5 = new Slide();
      slide5.products.push(new SlideImage('Banana-Orange Juice', 'assets/img/beverages/bananaorangejuice.png'));
      const slide6 = new Slide();
      slide6.products.push(new SlideImage('Cranberry Juice', 'assets/img/beverages/cranberryjuice.png'));
      const slide7 = new Slide();
      slide7.products.push(new SlideImage('Air Freshener', 'assets/img/household_supplies/airfreshner.png'));
      const slide8 = new Slide();
      slide8.products.push(new SlideImage('All Purpose Cleaner', 'assets/img/household_supplies/cleaningliquid.png'));
      const slide9 = new Slide();
      slide9.products.push(new SlideImage('Disinfecting Wipes', 'assets/img/household_supplies/disinfectantspray.png'));
      this.slideList.push(slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9);
    } else if (mode === 2) {
      const slide1 = new Slide();
      slide1.products.push(new SlideImage('Baby Bottle', 'assets/img/baby_care/babybottle.png'));
      slide1.products.push(new SlideImage('Baby Girl Dress', 'assets/img/baby_care/babydress.png'));
      const slide2 = new Slide();
      slide2.products.push(new SlideImage('Apple Juice', 'assets/img/beverages/applejuice.png'));
      slide2.products.push(new SlideImage('Banana-Orange Juice', 'assets/img/beverages/bananaorangejuice.png'));
      const slide3 = new Slide();
      slide3.products.push(new SlideImage('Air Freshener', 'assets/img/household_supplies/airfreshner.png'));
      slide3.products.push(new SlideImage('All Purpose Cleaner', 'assets/img/household_supplies/cleaningliquid.png'));
      this.slideList.push(slide1, slide2, slide3);
    } else if (mode === 3) {
      const slide1 = new Slide();
      slide1.products.push(new SlideImage('Baby Bottle', 'assets/img/baby_care/babybottle.png'));
      slide1.products.push(new SlideImage('Baby Girl Dress', 'assets/img/baby_care/babydress.png'));
      slide1.products.push(new SlideImage('Baby Monitor', 'assets/img/baby_care/babymonitor.png'));
      const slide2 = new Slide();
      slide2.products.push(new SlideImage('Apple Juice', 'assets/img/beverages/applejuice.png'));
      slide2.products.push(new SlideImage('Banana-Orange Juice', 'assets/img/beverages/bananaorangejuice.png'));
      slide2.products.push(new SlideImage('Cranberry Juice', 'assets/img/beverages/cranberryjuice.png'));
      const slide3 = new Slide();
      slide3.products.push(new SlideImage('Air Freshener', 'assets/img/household_supplies/airfreshner.png'));
      slide3.products.push(new SlideImage('All Purpose Cleaner', 'assets/img/household_supplies/cleaningliquid.png'));
      slide3.products.push(new SlideImage('Disinfecting Wipes', 'assets/img/household_supplies/disinfectantspray.png'));
      this.slideList.push(slide1, slide2, slide3);
    }
    this.activeSlide = 2;
    setTimeout(() => {
      // this.selectedNoSlideShow = selectedNoSlideShowCopy;
      // debugger;
      if (carouselIntervalCopy > 0) {
        this.carouselInterval = carouselIntervalCopy;
      }
      this.activeSlide = 1;
      // debugger;
      /* if (this.activeSlide > 1) {
        this.activeSlide = 1;
      } else {
        this.activeSlide = this.activeSlide + 1;
      } */
    }, 300);
  }

  ngOnInit() {
    if (window) {
      if (window.innerWidth <= this._globals.mediaScreenMedium) {
        this.setSlideList(1);
      } else if (window.innerWidth <= this._globals.mediaScreenLarge) {
        this.setSlideList(2);
      } else {
        this.setSlideList(3);
      }
    }
  }
}
