import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../books.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm {

  visible = input.required<boolean>();

  selectedBook = input<Book | null>(null);

  title = input.required<string>();
  author = input.required<string>();
  category = input.required<string>();
  year = input.required<string>();
  quantity = input.required<string>();
  status = input.required<string>();

  titleChange = output<string>();
  authorChange = output<string>();
  categoryChange = output<string>();
  yearChange = output<string>();
  quantityChange = output<string>();
  statusChange = output<string>();

  save = output<void>();

  close = output<void>();

}