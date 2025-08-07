import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="error" 
      class="message"
      [class.success]="severity === 'success'"
      [class.error]="severity === 'error'"
    >
      {{ error }}
    </div>
  `,
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() error: string = '';
  @Input() severity: 'success' | 'error' = 'error';
}
