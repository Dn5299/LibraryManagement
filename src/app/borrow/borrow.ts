import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-borrow',
  imports: [CommonModule, FormsModule],
  templateUrl: './borrow.html',
  styleUrls: ['./borrow.css']
})

export class Borrow {

  showAddForm = false;

  searchText = '';

  selectedBorrow: any = null;

  borrow: any[] = [];

  newReaders = '';
  newTitle = '';
  newBorrowd = '';
  newReturnd = '';
  newNote = '';



  ngOnInit() {

    const data = localStorage.getItem('borrow');

    if (data) {

      this.borrow = JSON.parse(data);

    }

  }



  saveToLocalStorage() {

    localStorage.setItem(
      'borrow',
      JSON.stringify(this.borrow)
    );

  }



  resetForm() {

    this.newReaders = '';
    this.newTitle = '';
    this.newBorrowd = '';
    this.newReturnd = '';
    this.newNote = '';

  }



  openAddForm() {

    this.showAddForm = true;

    this.selectedBorrow = null;

    this.resetForm();

  }



  editBorrow(borrow: any) {

    this.showAddForm = true;

    this.selectedBorrow = borrow;

    this.newReaders = borrow.readers;

    this.newTitle = borrow.title;

    this.newBorrowd = borrow.borrowd;

    this.newReturnd = borrow.returnd;

    this.newNote = borrow.note;

  }



  saveBorrow() {

    const data = localStorage.getItem('books');

    const books = JSON.parse(data || '[]');

    const foundBook = books.find(

      (book: any) =>

      book.title === this.newTitle

    );



    if (this.selectedBorrow) {

      this.selectedBorrow.readers = this.newReaders;

      this.selectedBorrow.title = this.newTitle;

      this.selectedBorrow.borrowd = this.newBorrowd;

      this.selectedBorrow.returnd = this.newReturnd;

      this.selectedBorrow.note = this.newNote;

    }

    else {

      const borrow = {

        id: 'DG' + Math.floor(Math.random() * 10000),

        readers: this.newReaders,

        title: this.newTitle,

        borrowd: this.newBorrowd,

        returnd: this.newReturnd,

        note: this.newNote,

      };



      this.borrow.push(borrow);

    }



    if (foundBook) {

      if (this.newNote === 'Đang mượn') {

        foundBook.quantity = Number(foundBook.quantity) - 1;

      }

      else if (this.newNote === 'Đã trả') {

        foundBook.quantity = Number(foundBook.quantity) + 1;

      }

    }



    localStorage.setItem(

      'books',

      JSON.stringify(books)

    );



    this.saveToLocalStorage();

    this.resetForm();

    this.showAddForm = false;

    this.selectedBorrow = null;

  }



  deleteBorrow(borrow: any) {

    this.borrow = this.borrow.filter(

      b => b !== borrow

    );



    this.saveToLocalStorage();

  }



  getFilteredBorrow() {

    return this.borrow.filter(borrow =>

      borrow.readers
        ?.toLowerCase()
        .includes(this.searchText.toLowerCase())

    );

  }

}