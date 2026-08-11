import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Book } from './books.model';
import { BooksService } from './books.service';
import { BookTable } from './book-table/book-table';
import { BookForm } from './book-form/book-form';
import { firstValueFrom } from 'rxjs';

import {
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookTable,
    BookForm
  ],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})
export class Books implements OnInit {

  private readonly booksService = inject(BooksService);
  private readonly fb = inject(FormBuilder);

  books = signal<Book[]>([]);
  showAddForm = signal(false);
  searchText = signal('');
  selectedBook = signal<Book | null>(null);

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    category: ['', Validators.required],

    year: [
      '',
      [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear()),
        this.yearValidator
      ]
    ],

    quantity: [
      '',
      [
        Validators.required,
        Validators.min(1),
        this.quantityValidator
      ]
    ],

    status: ['', Validators.required]
  });

  filteredBooks = computed(() => {

    const keyword = this.searchText().trim().toLowerCase();

    if (!keyword) {
      return this.books();
    }

    return this.books().filter(book =>
      book.title.toLowerCase().includes(keyword)
    );

  });

  async ngOnInit(): Promise<void> {
    await this.loadBooks();
  }

  async loadBooks(): Promise<void> {

    const data = await firstValueFrom(
      this.booksService.getBooks()
    );

    this.books.set(data);
  }

  yearValidator(control: AbstractControl): ValidationErrors | null {

    const value = Number(control.value);

    if (!value) {
      return null;
    }

    return Number.isInteger(value)
      ? null
      : { invalidYear: true };
  }

  quantityValidator(control: AbstractControl): ValidationErrors | null {

    const value = Number(control.value);

    if (!value) {
      return null;
    }

    return Number.isInteger(value) && value > 0
      ? null
      : { invalidQuantity: true };
  }

  openAddForm(): void {

    this.bookForm.reset({
      title: '',
      author: '',
      category: '',
      year: '',
      quantity: '',
      status: ''
    });

    this.selectedBook.set(null);
    this.showAddForm.set(true);
  }

  editBook(book: Book): void {

    this.selectedBook.set(book);

    this.bookForm.patchValue({
      title: book.title,
      author: book.author,
      category: book.category,
      year: book.year.toString(),
      quantity: book.quantity.toString(),
      status: book.status
    });

    this.showAddForm.set(true);
  }

  async saveBook(): Promise<void> {

    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const value = this.bookForm.getRawValue();

    const book = {
      title: value.title ?? '',
      author: value.author ?? '',
      category: value.category ?? '',
      year: Number(value.year),
      quantity: Number(value.quantity),
      status: value.status ?? ''
    };

    let success = false;

    if (this.selectedBook()) {

      success = await firstValueFrom(
        this.booksService.updateBook({
          id: this.selectedBook()!.id,
          ...book
        })
      );

    } else {

      success = await firstValueFrom(
        this.booksService.addBook(book)
      );

    }

    if (!success) {
      return;
    }

    this.closeForm();
    await this.loadBooks();
  }

  async deleteBook(book: Book): Promise<void> {

    const success = await firstValueFrom(
      this.booksService.deleteBook(book.id)
    );

    if (!success) {
      return;
    }

    await this.loadBooks();
  }

  closeForm(): void {

    this.showAddForm.set(false);
    this.selectedBook.set(null);
    this.bookForm.reset();
  }

}