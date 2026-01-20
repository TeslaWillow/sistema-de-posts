import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';

// Types for button inputs
type ButtonVariant = 'primary' | 'danger' | 'outline';
type ButtonType    = 'button' | 'submit';

@Component({
  selector: 'app-button',
  imports: [CommonModule, LoaderSpinnerComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  public type = input<ButtonType>('button');
  public variant = input<ButtonVariant>('primary');
  public isLoading = input<boolean>(false);
  public disabled = input<boolean>(false);

  public clicked = output<MouseEvent>();

  //Computed classes based on variant
  public buttonClasses = computed(() => {
    const variants = {
      primary: 'bg-primary text-white hover:opacity-90',
      danger:  'bg-danger text-white hover:opacity-90',
      outline: 'border border-border-main text-text-base hover:bg-border-main'
    };
    return variants[this.variant()];
  });

}
