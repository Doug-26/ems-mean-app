import { Component, effect, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { EmployeeService } from '../services/employee';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm implements OnInit {
  initialState = input<Employee>();
  buttonText = input<string>('Add');

  formsValuesChanged = output<Employee>();
  formSubmitted = output<Employee>();

  employeeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Use effect to react to initial state changes
    effect(() => {
      this.employeeForm.setValue({
        name: this.initialState()?.name || '',
        position: this.initialState()?.position || '',
        level: this.initialState()?.level || 'junior'
      });
    });
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', [Validators.required, Validators.minLength(5)]],
      level: ['', Validators.required]
    });

    // Set up form value changes emission
    this.employeeForm.valueChanges.subscribe(value => {
      this.formsValuesChanged.emit(value);
    });
  }

  // Getter methods for easy access to form controls
  get name() {
    return this.employeeForm.get('name')!;
  }

  get position() {
    return this.employeeForm.get('position')!;
  }

  get level() {
    return this.employeeForm.get('level')!;
  }

  submitForm() {
    if (this.employeeForm.valid) {
      this.formSubmitted.emit(this.employeeForm.value);
    } else {
      // Mark all fields as touched to show validation errors
      this.employeeForm.markAllAsTouched();
    }
  }
}
