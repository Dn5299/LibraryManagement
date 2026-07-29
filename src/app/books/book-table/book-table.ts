import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Book } from '../books.model';

@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-table.html',
  styleUrl: './book-table.css'
})
export class BookTable {

  books = input.required<Book[]>();

  edit = output<Book>();

  delete = output<Book>();

}