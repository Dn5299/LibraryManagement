import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Borrow } from '../borrow.model';

@Component({
  selector: 'app-borrow-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './borrow-table.html',
  styleUrl: './borrow-table.css'
})
export class BorrowTable {

  borrow = input.required<Borrow[]>();

  edit = output<Borrow>();

  delete = output<Borrow>();

}