import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Borrow } from '../borrow.model';

@Component({
  selector: 'app-borrow-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './borrow-form.html',
  styleUrl: './borrow-form.css'
})
export class BorrowForm {

  visible = input.required<boolean>();

  selectedBorrow = input<Borrow | null>(null);

  readers = input.required<string>();
  citizenId = input.required<string>();
  title = input.required<string>();
  quantityBorrow = input.required<number>();

  borrowd = input.required<string>();
  dueDate = input.required<string>();
  returnd = input.required<string>();

  note = input.required<string>();

  unitPrice = input.required<number>();
  borrowFee = input.required<number>();
  lateFee = input.required<number>();
  totalFee = input.required<number>();

  readersChange = output<string>();
  citizenIdChange = output<string>();
  titleChange = output<string>();
  quantityBorrowChange = output<number>();

  borrowdChange = output<string>();
  dueDateChange = output<string>();
  returndChange = output<string>();

  noteChange = output<string>();

  save = output<void>();
  close = output<void>();

}