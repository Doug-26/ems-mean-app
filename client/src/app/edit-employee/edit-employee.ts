import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeForm } from '../employee-form/employee-form';
import { EmployeeService } from '../services/employee';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-edit-employee',
  imports: [EmployeeForm, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css'
})
export class EditEmployee implements OnInit {
  employeeId = signal<string>('');
  currentEmployee = signal<Employee | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  goBack() {
    this.router.navigate(['/employees']);
  }

  ngOnInit() {
    // Get employee ID from route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId.set(id);
      this.loadEmployee(id);
    } else {
      // No ID provided, redirect to employees list
      this.router.navigate(['/employees']);
    }
  }

  private loadEmployee(id: string) {
    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        this.currentEmployee.set(employee);
      },
      error: (err) => {
        console.error('Error loading employee:', err);
        this.snackBar.open('Failed to load employee data.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.router.navigate(['/employees']);
      }
    });
  }

  updateEmployee(employeeData: Employee) {
    const id = this.employeeId();
    if (!id) return;

    this.employeeService.updateEmployee(id, employeeData).subscribe({
      next: (updatedEmployee) => {
        console.log('Employee updated successfully:', updatedEmployee);
        this.snackBar.open('Employee updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Error updating employee:', err);
        this.snackBar.open('Failed to update employee. Please try again.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
