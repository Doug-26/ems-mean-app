import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:5200';
  employees$ = signal<Employee[]>([]);
  employee$ = signal<Employee>({} as Employee);

  constructor(private httpClient: HttpClient) {}

  private refreshEmployees() {
    return this.httpClient.get<Employee[]>(`${this.url}/employees`).pipe(
      tap((employees) => this.employees$.set(employees))
    );
  }

  getEmployees() {
    return this.refreshEmployees();
  }

  getEmployee(id: string) {
    return this.httpClient.get<Employee>(`${this.url}/employees/${id}`).pipe(
      tap((employee) => this.employee$.set(employee))
    );
  }

  createEmployee(employee: Employee) {
    return this.httpClient.post<Employee>(`${this.url}/employees`, employee).pipe(
      tap((newEmployee: Employee) => {
        this.employees$.update((employees) => [...employees, newEmployee]);
      })
    );
  }

  updateEmployee(id: string, employee: Employee) {
    return this.httpClient.put<Employee>(`${this.url}/employees/${id}`, employee).pipe(
      tap((updatedEmployee: Employee) => {
        this.employees$.update((employees) =>
          employees.map((emp) => (emp._id === id ? updatedEmployee : emp))
        );
      })
    );
  }

  deleteEmployee(id: string) {
    return this.httpClient.delete<{message: string, deletedId: string}>(`${this.url}/employees/${id}`).pipe(
      tap(() => {
        this.employees$.update((employees) =>
          employees.filter((emp) => emp._id !== id)
        );
      })
    );
  }
}
