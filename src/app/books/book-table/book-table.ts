import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Book } from '../books.model';
import { StatusColorDirective } from '../../shared/directives/status-color';

@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [
  CommonModule,
  StatusColorDirective
],
  templateUrl: './book-table.html',
  styleUrl: './book-table.css'
})
export class BookTable {

  books = input.required<Book[]>();

  edit = output<Book>();

  delete = output<Book>();

}