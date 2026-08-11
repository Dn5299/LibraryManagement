import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BorrowService } from './borrow.service';
import { Borrow as BorrowModel } from './borrow.model';

import { BorrowTable } from './borrow-table/borrow-table';
import { BorrowForm } from './borrow-form/borrow-form';

import { supabase } from '../supabase';

@Component({
  selector: 'app-borrow',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BorrowTable,
    BorrowForm
  ],
  templateUrl: './borrow.html',
  styleUrls: ['./borrow.css']
})
export class Borrow {

  private readonly borrowService = inject(BorrowService);

  // =========================
  // DANH SÁCH
  // =========================

  borrow = signal<BorrowModel[]>([]);

  showAddForm = signal(false);

  selectedBorrow = signal<BorrowModel | null>(null);

  searchText = signal('');

  filteredBorrow = computed(() => {

    const keyword =
      this.searchText().trim().toLowerCase();

    if (!keyword) {
      return this.borrow();
    }

    return this.borrow().filter(item =>
      item.readers?.toLowerCase().includes(keyword)
    );

  });


  // =========================
  // FORM
  // =========================

  newReaders = '';
  newTitle = '';
  newBorrowd = '';
  newDueDate = '';
  newReturnd = '';
  newNote = '';
  newCitizenId = '';

  newQuantityBorrow = 1;


  // =========================
  // PHÍ
  // =========================

  borrowPrice = 500;

  latePrice = 3000;

  borrowFee = 0;

  lateFee = 0;

  totalFee = 0;


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.loadBorrow();

  }


  // =========================
  // LOAD DATA
  // =========================

  loadBorrow(): void {

    this.borrowService.getBorrow()
      .subscribe(data => {

        this.borrow.set(data);

      });

  }


  // =========================
  // RESET FORM
  // =========================

  resetForm(): void {

    this.newReaders = '';
    this.newTitle = '';
    this.newBorrowd = '';
    this.newDueDate = '';
    this.newReturnd = '';
    this.newNote = '';
    this.newCitizenId = '';

    this.newQuantityBorrow = 1;

    this.borrowFee = 0;
    this.lateFee = 0;
    this.totalFee = 0;

  }


  // =========================
  // TÍNH TIỀN
  // =========================

  calculateFee(): void {

  const quantity = Number(this.newQuantityBorrow);

  if (
    !this.newBorrowd ||
    !this.newDueDate ||
    quantity <= 0
  ) {
    this.borrowFee = 0;
    this.lateFee = 0;
    this.totalFee = 0;
    return;
  }

  const borrowDate = this.parseDate(this.newBorrowd);
  const dueDate = this.parseDate(this.newDueDate);

  if (!borrowDate || !dueDate) {
    this.borrowFee = 0;
    this.lateFee = 0;
    this.totalFee = 0;
    return;
  }

  // Tiền mượn: 500đ / cuốn / ngày
  const borrowDays = this.getDaysBetween(
    borrowDate,
    dueDate
  );

  const actualBorrowDays = Math.max(1, borrowDays);

  this.borrowFee =
    actualBorrowDays *
    quantity *
    this.borrowPrice;


  // Tiền phạt: 3.000đ / cuốn / ngày quá hạn
  this.lateFee = 0;

  if (this.newReturnd) {

    const returnDate = this.parseDate(this.newReturnd);

    if (returnDate) {

      const lateDays = this.getDaysBetween(
        dueDate,
        returnDate
      );

      if (lateDays > 0) {

        this.lateFee =
          lateDays *
          quantity *
          this.latePrice;

      }
    }
  }

  // Tổng tiền
  this.totalFee =
    this.borrowFee +
    this.lateFee;
}


  // =========================
  // MỞ FORM THÊM
  // =========================

  openAddForm(): void {

    this.resetForm();

    this.selectedBorrow.set(null);

    this.showAddForm.set(true);

  }


  // =========================
  // SỬA / GIA HẠN
  // =========================

  editBorrow(
    borrow: BorrowModel
  ): void {

    this.selectedBorrow.set(borrow);

    this.newCitizenId =
      borrow.citizenId;

    this.newReaders =
      borrow.readers;

    this.newTitle =
      borrow.title;

    this.newBorrowd =
      borrow.borrowd;

    this.newDueDate =
      borrow.dueDate;

    this.newReturnd =
      borrow.returnd;

    this.newNote =
      borrow.note;

    this.newQuantityBorrow =
      borrow.quantityBorrow;

    this.borrowFee =
      borrow.borrow_fee;

    this.lateFee =
      borrow.late_fee;

    this.totalFee =
      borrow.total_fee;

    this.showAddForm.set(true);

  }


  // =========================
  // LƯU
  // =========================

  saveBorrow(): void {

  this.calculateFee();

  const quantity = Number(this.newQuantityBorrow);

  if (
    !this.newCitizenId ||
    !this.newReaders ||
    !this.newTitle ||
    !this.newBorrowd ||
    !this.newDueDate ||
    quantity <= 0
  ) {
    alert('Vui lòng nhập đầy đủ thông tin');
    return;
  }

  if (this.selectedBorrow()) {

    const oldBorrow = this.selectedBorrow()!;

    this.borrowService.updateBorrow({

      id: oldBorrow.id,

      citizenId: this.newCitizenId,
      readers: this.newReaders,
      title: this.newTitle,

      quantityBorrow: quantity,

      borrowd: this.newBorrowd,
      dueDate: this.newDueDate,
      returnd: this.newReturnd,

      note: this.newNote,

      unit_price: this.borrowPrice,
      borrow_fee: this.borrowFee,
      late_fee: this.lateFee,
      total_fee: this.totalFee

    }).subscribe(success => {

      if (!success) {
        alert('Cập nhật phiếu mượn thất bại');
        return;
      }

      // Thành công → đóng popup
      this.closeForm();

      // Load lại danh sách
      this.loadBorrow();

    });

    return;
  }


  // =========================
  // THÊM PHIẾU
  // =========================

  this.checkBookAvailability(
    this.newTitle,
    quantity
  ).then(available => {

    if (!available) {
      alert('Không đủ sách trong kho');
      return;
    }

    this.borrowService.addBorrow({

      citizenId: this.newCitizenId,
      readers: this.newReaders,
      title: this.newTitle,

      quantityBorrow: quantity,

      borrowd: this.newBorrowd,
      dueDate: this.newDueDate,
      returnd: this.newReturnd,

      note: this.newNote,

      unit_price: this.borrowPrice,
      borrow_fee: this.borrowFee,
      late_fee: this.lateFee,
      total_fee: this.totalFee

    }).subscribe(success => {

      if (!success) {
        alert('Thêm phiếu mượn thất bại');
        return;
      }

      if (this.newNote === 'Đang mượn') {

        this.decreaseBookQuantity(
          this.newTitle,
          quantity
        );

      }

      // Thành công → đóng popup
      this.closeForm();

      // Load lại danh sách
      this.loadBorrow();

    });

  });
}


  // =========================
  // KIỂM TRA SÁCH
  // =========================

  async checkBookAvailability(
    title: string,
    quantity: number
  ): Promise<boolean> {

    const { data: books } =
      await supabase
        .from('books')
        .select('*')
        .eq('title', title);


    if (!books || books.length === 0) {

      return false;

    }


    return Number(books[0].quantity) >= quantity;

  }


  // =========================
  // TRỪ SÁCH
  // =========================

  async decreaseBookQuantity(
    title: string,
    quantity: number
  ): Promise<void> {

    const { data: books } =
      await supabase
        .from('books')
        .select('*')
        .eq('title', title);


    if (!books || books.length === 0) {
      return;
    }


    const book = books[0];


    await supabase
      .from('books')
      .update({
        quantity:
          Number(book.quantity) - quantity
      })
      .eq('id', book.id);

  }


  // =========================
  // XÓA
  // =========================

  deleteBorrow(
    borrow: BorrowModel
  ): void {

    this.borrowService
      .deleteBorrow(borrow.id)
      .subscribe(success => {

        if (!success) {
          return;
        }

        this.loadBorrow();

      });

  }


  // =========================
  // ĐÓNG FORM
  // =========================

  closeForm(): void {

    this.showAddForm.set(false);

    this.selectedBorrow.set(null);

    this.resetForm();

  }


  // =========================
  // PARSE DATE
  // =========================

  private parseDate(
    value: string
  ): Date | null {

    if (!value) {
      return null;
    }

    const parts =
      value.split('-');

    if (parts.length !== 3) {
      return null;
    }

    const year =
      Number(parts[0]);

    const month =
      Number(parts[1]) - 1;

    const day =
      Number(parts[2]);

    return new Date(
      year,
      month,
      day
    );

  }


  // =========================
  // TÍNH SỐ NGÀY
  // =========================

  private getDaysBetween(
    start: Date,
    end: Date
  ): number {

    const milliseconds =
      end.getTime() -
      start.getTime();

    return Math.floor(
      milliseconds /
      (1000 * 60 * 60 * 24)
    );

  }

}