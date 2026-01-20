import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeaderComponent } from "@shared/components/organisms/main-header/main-header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'posts-frontend';
}
