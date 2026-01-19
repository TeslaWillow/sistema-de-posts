import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'toggle-theme-button',
  templateUrl: './toggle-theme-button.component.html',
  styleUrls: ['./toggle-theme-button.component.css']
})
export class ToggleThemeButtonComponent implements OnInit {
  public themeService = inject(ThemeService);

  ngOnInit(): void {
  }

}
