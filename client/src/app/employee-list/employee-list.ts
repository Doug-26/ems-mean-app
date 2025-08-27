import { Component, WritableSignal, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeList implements OnInit, OnDestroy {
  employees$: WritableSignal<Employee[]>;
  // No need for routerSubscription when using signals
  // Displayed Columns
  displayedColumns: string[] = [
    'col-name',
    'col-position',
    'col-level',
    'col-actions'
  ];

  constructor(private employeeService: EmployeeService, private router: Router) {
    // Assign the signal reference once in constructor
    this.employees$ = this.employeeService.employees$;
  }

  ngOnInit() {
  this.loadEmployees(); // Initial load only; signal will keep UI in sync
  }

  ngOnDestroy() {
  // No cleanup needed for routerSubscription
  }

  private loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: () => {
        // Employees are automatically updated in the signal
        console.log('Employees loaded successfully');
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  deleteEmployee(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        console.log('Employee deleted successfully');
        // No need to call loadEmployees() - service already updates the signal
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
        // Show user-friendly error message here
      }
    });
  }
}
