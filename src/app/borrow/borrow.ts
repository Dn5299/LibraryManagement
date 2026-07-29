import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { supabase } from '../supabase';
import { BorrowService } from './borrow.service';
import { Borrow as BorrowModel } from './borrow.model';

@Component({
  selector: 'app-borrow',
  imports: [CommonModule, FormsModule],
  templateUrl: './borrow.html',
  styleUrls: ['./borrow.css']
})
export class Borrow {

  private readonly borrowService = inject(BorrowService);

  showAddForm = signal(false);

  searchText = signal('');

  selectedBorrow = signal<BorrowModel | null>(null);

  borrow = signal<BorrowModel[]>([]);

  filteredBorrow = computed(() => {

    const keyword = this.searchText().trim().toLowerCase();

    if (!keyword) {
      return this.borrow();
    }

    return this.borrow().filter(item =>
      item.readers?.toLowerCase().includes(keyword)
    );

  });

  newReaders = '';
  newTitle = '';
  newBorrowd = '';
  newReturnd = '';
  newNote = '';
  newCitizenId = '';
  newQuantityBorrow = 1;

  unitPrice = 5000;
  borrowFee = 0;
  lateFee = 0;
  totalFee = 0;

  async ngOnInit(): Promise<void> {

    await this.loadBorrow();

  }

  async loadBorrow(): Promise<void> {

    this.borrow.set(
      await this.borrowService.getBorrow()
    );

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

  calculateFee() {

    this.borrowFee =
      Number(this.newQuantityBorrow) *
      this.unitPrice;

    this.lateFee = 0;

    this.totalFee =
      this.borrowFee;

  }

  openAddForm() {

    this.showAddForm.set(true);

    this.selectedBorrow.set(null);

    this.resetForm();

    this.calculateFee();

  }

  editBorrow(borrow: BorrowModel) {

    this.showAddForm.set(true);

    this.selectedBorrow.set(borrow);

    this.newCitizenId = borrow.citizenId;
    this.newReaders = borrow.readers;
    this.newTitle = borrow.title;
    this.newBorrowd = borrow.borrowd;
    this.newReturnd = borrow.returnd;
    this.newNote = borrow.note;
    this.newQuantityBorrow = borrow.quantityBorrow;

    this.calculateFee();

  }
  async saveBorrow() {

  this.calculateFee();

  if (this.selectedBorrow()) {

    const oldStatus = this.selectedBorrow()!.note;

    const { error } = await supabase

      .from('borrow')

      .update({

        citizenId: this.newCitizenId,
        readers: this.newReaders,
        title: this.newTitle,
        borrowd: this.newBorrowd,
        returnd: this.newReturnd,
        note: this.newNote,
        quantityBorrow: Number(this.newQuantityBorrow),
        unit_price: this.unitPrice,
        borrow_fee: this.borrowFee,
        late_fee: this.lateFee,
        total_fee: this.totalFee

      })

      .eq('id', this.selectedBorrow()!.id);

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

  } else {

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
        quantityBorrow: Number(this.newQuantityBorrow),
        unit_price: this.unitPrice,
        borrow_fee: this.borrowFee,
        late_fee: this.lateFee,
        total_fee: this.totalFee

      }]);

    if (error) {

      console.log(error);

      return;

    }

    if (

      this.newNote === 'Đang mượn' &&
      books &&
      books.length > 0

    ) {

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
    this.resetForm();

    this.showAddForm.set(false);

    this.selectedBorrow.set(null);

    await this.loadBorrow();

}
  async deleteBorrow(borrow: BorrowModel) {

    const { error } = await supabase

      .from('borrow')

      .delete()

      .eq('id', borrow.id);

    if (error) {

      console.log(error);

      return;

    }

    await this.loadBorrow();

  }

}