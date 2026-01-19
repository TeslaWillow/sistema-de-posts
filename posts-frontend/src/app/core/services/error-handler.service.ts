import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  // Signal for storing the current error message
  private _errorSignal = signal<string | null>(null);

  // Expose the error as a readonly signal
  public error = this._errorSignal.asReadonly();

  /**
   * Process and store the error message
   * @param message - The error message(s) to handle
   * @return void
   */
  public handle(message: string | string[]): void {
    // If the backend returns an array of messages, join them into a single string
    const formattedMessage = Array.isArray(message)
      ? message.join(', ')
      : message;

    this._errorSignal.set(formattedMessage);

    // Clear the error after 5 seconds
    setTimeout(() => {
      this.clearError();
    }, 5000);
  }

  /**
   * Clear the current error message
   * @return void
   */
  public clearError(): void {
    this._errorSignal.set(null);
  }
}
