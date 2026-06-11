import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { supabase } from '../supabase';

@Component({
  selector: 'app-books',
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})
export class Books {

  constructor(private cdr: ChangeDetectorRef) {}

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

  async ngOnInit() {

  const { data, error } = await supabase
    .from('books')
    .select('*');

  if (error) {

    console.log(error);

    return;

  }

  this.books = data || [];

  this.cdr.detectChanges();

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

  async saveBook() {

    if (this.selectedBook) {

      const { error } = await supabase

        .from('books')

        .update({

          title: this.newTitle,

          author: this.newAuthor,

          category: this.newCategory,

          year: Number(this.newYear),

          quantity: Number(this.newQuantity),

          status: this.newStatus

        })

        .eq('id', this.selectedBook.id);

      if (error) {

        console.log(error);

        return;

      }

    }

    else {

      const { error } = await supabase

        .from('books')

        .insert([{

          title: this.newTitle,

          author: this.newAuthor,

          category: this.newCategory,

          year: Number(this.newYear),

          quantity: Number(this.newQuantity),

          status: this.newStatus

        }]);

      if (error) {

        console.log(error);

        return;

      }

    }

    this.resetForm();

    this.showAddForm = false;
 
    this.selectedBook = null;

    await this.ngOnInit();

  }

  async deleteBook(book: any) {

    const { error } = await supabase

      .from('books')

      .delete()

      .eq('id', book.id);

    if (error) {

      console.log(error);

      return;

    }

    await this.ngOnInit();

  }

  getFilteredBooks() {

    return this.books.filter(book =>

      book.title
        ?.toLowerCase()
        .includes(this.searchText.toLowerCase())

    );

  }

}