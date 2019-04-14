import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;

  constructor(private _router: Router) {}

  linkClick(page: string) {
    this.isCollapsed = true;
    this._router.navigateByUrl(page);
  }
  ngOnInit() {}
}
