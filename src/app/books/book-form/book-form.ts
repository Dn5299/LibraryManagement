import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../books.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm {

  visible = input.required<boolean>();

  form = input.required<FormGroup>();

  selectedBook = input<Book | null>(null);

  save = output<void>();

  close = output<void>();

}