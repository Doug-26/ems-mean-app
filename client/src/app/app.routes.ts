import { Routes } from '@angular/router';
import { EmployeeList } from './employee-list/employee-list';
import { AddEmployee } from './add-employee/add-employee';
import { EditEmployee } from './edit-employee/edit-employee';

export const routes: Routes = [
    { path: '', redirectTo: '/employees', pathMatch: 'full' },
    { path: 'employees', component: EmployeeList, title: 'Employee List' },
    { path: 'employees/new', component: AddEmployee, title: 'Add Employee' },
    { path: 'employees/edit/:id', component: EditEmployee, title: 'Edit Employee' }
];
