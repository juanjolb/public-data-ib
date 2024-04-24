import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner-overlay',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-overlay">
      <span class="spinner"></span>
    </div>
  `,
  styles: `
  .bg-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .spinner {
    width: 120px;
    height: 120px;
    display: inline-block;
    position: relative;
  }
  .spinner::after,
  .spinner::before {
    content: '';  
    box-sizing: border-box;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid #FFF;
    position: absolute;
    left: 0;
    top: 0;
    animation: animspinner 2s linear infinite;
  }
  .spinner::after {
    animation-delay: 1s;
  }
  
  @keyframes animspinner {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }`,
})
export class SpinnerOverlayComponent {}
