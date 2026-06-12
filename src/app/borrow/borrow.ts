import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { supabase } from '../supabase';

@Component({
  selector: 'app-borrow',
  imports: [CommonModule, FormsModule],
  templateUrl: './borrow.html',
  styleUrls: ['./borrow.css']
})
export class Borrow {

  constructor(private cdr: ChangeDetectorRef) {}

  showAddForm = false;

  searchText = '';

  selectedBorrow: any = null;

  borrow: any[] = [];

  newReaders = '';
  newTitle = '';
  newBorrowd = '';
  newReturnd = '';
  newNote = '';
  newCitizenId = '';
  newQuantityBorrow = 1;

  async ngOnInit() {

    const { data, error } = await supabase
      .from('borrow')
      .select('*');

    if (error) {

      console.log(error);

      return;

    }

    this.borrow = data || [];

    this.cdr.detectChanges();

  }

  resetForm() {

    this.newReaders = '';
    this.newTitle = '';
    this.newBorrowd = '';
    this.newReturnd = '';
    this.newNote = '';
    this.newCitizenId = '';
    this.newQuantityBorrow = 1;

  }

  openAddForm() {

    this.showAddForm = true;

    this.selectedBorrow = null;

    this.resetForm();

  }

  editBorrow(borrow: any) {

    this.showAddForm = true;

    this.selectedBorrow = borrow;

    this.newCitizenId = borrow.citizenId;
    this.newReaders = borrow.readers;
    this.newTitle = borrow.title;
    this.newBorrowd = borrow.borrowd;
    this.newReturnd = borrow.returnd;
    this.newNote = borrow.note;
    this.newQuantityBorrow = borrow.quantityBorrow;

  }

  async saveBorrow() {

    if (this.selectedBorrow) {

      const oldStatus = this.selectedBorrow.note;

      const { error } = await supabase

        .from('borrow')

        .update({

          citizenId: this.newCitizenId,

          readers: this.newReaders,

          title: this.newTitle,

          borrowd: this.newBorrowd,

          returnd: this.newReturnd,

          note: this.newNote,

          quantityBorrow: Number(this.newQuantityBorrow)

        })

        .eq('id', this.selectedBorrow.id);

      if (error) {

        console.log(error);

        return;

      }

      const { data: books } = await supabase

        .from('books')

        .select('*')

        .eq('title', this.newTitle);

      if (books && books.length > 0) {

        const book = books[0];

        if (
          oldStatus === 'Đang mượn' &&
          this.newNote === 'Đã trả'
        ) {

          await supabase

            .from('books')

            .update({

              quantity:
                Number(book.quantity) +
                Number(this.newQuantityBorrow)

            })

            .eq('id', book.id);

        }

        if (
          oldStatus === 'Đã trả' &&
          this.newNote === 'Đang mượn'
        ) {

          if (
            Number(book.quantity) <
            Number(this.newQuantityBorrow)
          ) {

            alert('Không đủ sách trong kho');

            return;

          }

          await supabase

            .from('books')

            .update({

              quantity:
                Number(book.quantity) -
                Number(this.newQuantityBorrow)

            })

            .eq('id', book.id);

        }

      }

    }

    else {

      const { data: books } = await supabase

        .from('books')

        .select('*')

        .eq('title', this.newTitle);

      if (books && books.length > 0) {

        const book = books[0];

        if (
          Number(book.quantity) <
          Number(this.newQuantityBorrow)
        ) {

          alert('Không đủ sách trong kho');

          return;

        }

      }

      const { error } = await supabase

        .from('borrow')

        .insert([{

          citizenId: this.newCitizenId,

          readers: this.newReaders,

          title: this.newTitle,

          borrowd: this.newBorrowd,

          returnd: this.newReturnd,

          note: this.newNote,

          quantityBorrow:
            Number(this.newQuantityBorrow)

        }]);

      if (error) {

        console.log(error);

        return;

      }

      if (this.newNote === 'Đang mượn') {

        if (books && books.length > 0) {

          const book = books[0];

          await supabase

            .from('books')

            .update({

              quantity:
                Number(book.quantity) -
                Number(this.newQuantityBorrow)

            })

            .eq('id', book.id);

        }

      }

    }

    this.resetForm();

    this.showAddForm = false;

    this.selectedBorrow = null;

    await this.ngOnInit();

  }

  async deleteBorrow(borrow: any) {

    const { error } = await supabase

      .from('borrow')

      .delete()

      .eq('id', borrow.id);

    if (error) {

      console.log(error);

      return;

    }

    await this.ngOnInit();

  }

  getFilteredBorrow() {

    return this.borrow.filter(borrow =>

      borrow.readers
        ?.toLowerCase()
        .includes(this.searchText.toLowerCase())

    );

  }

}