import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-name-fields',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="name-fields-container" [formGroup]="nameForm">
      <input 
        formControlName="firstName" 
        placeholder="Ім'я"
        class="name-input"
        [class.invalid]="nameForm.get('firstName')?.invalid && nameForm.get('firstName')?.touched"
      />
      <input 
        formControlName="lastName" 
        placeholder="Прізвище"
        class="name-input"
        [class.invalid]="nameForm.get('lastName')?.invalid && nameForm.get('lastName')?.touched"
      />
    </div>
  `,
  styleUrls: ['./name-fields.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NameFieldsComponent),
      multi: true
    }
  ]
})
export class NameFieldsComponent implements ControlValueAccessor {
  @Input() minLen: number = 10;
  @Input() maxLen: number = 50;

  nameForm: FormGroup;
  
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private fb: FormBuilder) {
    this.nameForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(this.minLen), Validators.maxLength(this.maxLen)]],
      lastName: ['', [Validators.required, Validators.minLength(this.minLen), Validators.maxLength(this.maxLen)]]
    });

    this.nameForm.valueChanges.subscribe(value => {
      const fullName = `${value.firstName || ''} ${value.lastName || ''}`.trim();
      this.onChange(fullName);
    });

    this.nameForm.statusChanges.subscribe(() => {
      this.onTouched();
    });
  }

  writeValue(value: any): void {
    if (value) {
      const names = value.split(' ');
      this.nameForm.patchValue({
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || ''
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.nameForm.disable();
    } else {
      this.nameForm.enable();
    }
  }
}
