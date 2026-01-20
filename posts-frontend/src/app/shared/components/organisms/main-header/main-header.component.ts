import { Component, OnInit } from '@angular/core';
import { ToggleThemeButtonComponent } from "@shared/components/atoms/toggle-theme-button/toggle-theme-button.component";

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
  imports: [ToggleThemeButtonComponent]
})
export class MainHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
