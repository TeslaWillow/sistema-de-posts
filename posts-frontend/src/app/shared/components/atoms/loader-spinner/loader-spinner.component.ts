import { Component, input } from '@angular/core';

@Component({
  selector: 'loader-spinner',
  imports: [],
  templateUrl: './loader-spinner.component.html',
})
export class LoaderSpinnerComponent {
  className = input<string>('my-20'); // Default margin y-axis 20 but can be overridden
}
