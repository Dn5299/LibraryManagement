import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from './books.model';
import { BooksService } from './books.service';
import { BookTable } from './book-table/book-table';
import { BookForm } from './book-form/book-form';

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
  imports: [CommonModule, FormsModule,  BookTable, BookForm],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})
export class Books implements OnInit { //chứa logic quản lý sách
  private readonly booksService = inject(BooksService);

  books = signal<Book[]>([]); // save danh sách

  showAddForm = signal(false);

  searchText = signal('');

  selectedBook = signal<Book | null>(null);

  newTitle = '';
  newAuthor = '';
  newCategory = '';
  newYear = '';
  newQuantity = '';
  newStatus = '';
  newPrice = '';

  filteredBooks = computed(() => {

    const keyword = this.searchText().trim().toLowerCase();

    if (!keyword) {

      return this.books();

    }

    return this.books().filter(book =>

      book.title.toLowerCase().includes(keyword)

    );

  });

// lấy dữ liệu sách 
  async ngOnInit(): Promise<void> {

    await this.loadBooks();

  }

  async loadBooks(): Promise<void> {

    const data = await this.booksService.getBooks(); // service -> supabase -> data -> save ( signal books) 

    this.books.set(data);

  }

  resetForm(): void {

    this.newTitle = '';
    this.newAuthor = '';
    this.newCategory = '';
    this.newYear = '';
    this.newQuantity = '';
    this.newStatus = '';
    this.newPrice = '';

  }

  openAddForm(): void {

    this.resetForm();

    this.selectedBook.set(null);

    this.showAddForm.set(true);

  }

  editBook(book: Book): void {

  this.selectedBook.set(book);
  this.newTitle = book.title;
  this.newAuthor = book.author;
  this.newCategory = book.category;
  this.newYear = book.year.toString();
  this.newQuantity = book.quantity.toString();
  this.newStatus = book.status;

  this.showAddForm.set(true);

}
    async saveBook(): Promise<void> {

    const book = {

      title: this.newTitle,

      author: this.newAuthor,

      category: this.newCategory,

      year: Number(this.newYear),

      quantity: Number(this.newQuantity),

      status: this.newStatus

    };

    let success = false;

    if (this.selectedBook()) {

      success = await this.booksService.updateBook({

        id: this.selectedBook()!.id,

        ...book

      });

    } else {

      success = await this.booksService.addBook(book);

    }

    if (!success) {

      return;

    }

    this.resetForm();

    this.selectedBook.set(null);

    this.showAddForm.set(false);

    await this.loadBooks();

  }

  async deleteBook(book: Book): Promise<void> {

    const success = await this.booksService.deleteBook(book.id);

    if (!success) {

      return;

    }

    await this.loadBooks();

  }

  closeForm(): void {

    this.showAddForm.set(false);

    this.selectedBook.set(null);

    this.resetForm();

  }

}