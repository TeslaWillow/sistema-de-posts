import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal to track dark mode state
  public darkMode = signal<boolean>(
    localStorage.getItem('theme') === 'dark'
  );

  constructor() {
    // Effect that triggers whenever the signal changes
    effect(() => {
      const isDark = this.darkMode();
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  public toggleTheme(): void {
    this.darkMode.update(v => !v);
  }
}
