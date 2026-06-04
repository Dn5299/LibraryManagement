import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})

export class Books {

  showAddForm = false;

  searchText = '';

  selectedBook: any = null;

  books: any[] = [];

  newTitle = '';
  newAuthor = '';
  newCategory = '';
  newYear = '';
  newQuantity = '';
  newStatus = '';



  ngOnInit() {

    const data = localStorage.getItem('books');

    if (data) {

      this.books = JSON.parse(data);

    }

  }



  saveToLocalStorage() {

    localStorage.setItem(
      'books',
      JSON.stringify(this.books)
    );

  }



  resetForm() {

    this.newTitle = '';
    this.newAuthor = '';
    this.newCategory = '';
    this.newYear = '';
    this.newQuantity = '';
    this.newStatus = '';

  }



  openAddForm() {

    this.showAddForm = true;

    this.selectedBook = null;

    this.resetForm();

  }



  editBook(book: any) {

    this.showAddForm = true;

    this.selectedBook = book;

    this.newTitle = book.title;
    this.newAuthor = book.author;
    this.newCategory = book.category;
    this.newYear = book.year;
    this.newQuantity = book.quantity;
    this.newStatus = book.status;

  }



  saveBook() {

    if (this.selectedBook) {

      this.selectedBook.title = this.newTitle;
      this.selectedBook.author = this.newAuthor;
      this.selectedBook.category = this.newCategory;
      this.selectedBook.year = this.newYear;
      this.selectedBook.quantity = this.newQuantity;
      this.selectedBook.status = this.newStatus;

    }

    else {

      const book = {

        stt: this.books.length + 1,

        title: this.newTitle,

        author: this.newAuthor,

        category: this.newCategory,

        year: this.newYear,

        quantity: this.newQuantity,

        status: this.newStatus

      };

      this.books.push(book);

    }

    this.saveToLocalStorage();

    this.resetForm();

    this.showAddForm = false;

    this.selectedBook = null;

  }



  deleteBook(book: any) {

    this.books = this.books.filter(
      b => b !== book
    );

    this.saveToLocalStorage();

  }



  getFilteredBooks() {

    return this.books.filter(book =>

      book.title
        ?.toLowerCase()
        .includes(this.searchText.toLowerCase())

    );

  }

}
