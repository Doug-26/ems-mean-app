import { Component } from '@angular/core';
import { EmployeeForm } from '../employee-form/employee-form';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-add-employee',
  imports: [EmployeeForm, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee {

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) { }

  goBack() {
    this.router.navigate(['/employees']);
  }

  addEmployee(employeeData: Employee) {
    this.employeeService.createEmployee(employeeData).subscribe({
      next: (createdEmployee) => {
        console.log('Employee created successfully:', createdEmployee);
        // Show success message
        this.snackBar.open('Employee created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        // Navigate to employees list
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Error creating employee:', err);
        // Show error message
        this.snackBar.open('Failed to create employee. Please try again.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
