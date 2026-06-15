import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../supabase';

@Component({
  selector: 'app-statistical',
  imports: [CommonModule],
  templateUrl: './statistical.html',
  styleUrl: './statistical.css',
  
})
export class Statistical {

  constructor(private cdr: ChangeDetectorRef) {}

  books: any[] = [];

  borrow: any[] = [];

  totalBooks = 0;

  totalQuantity = 0;

  borrowingCount = 0;

  returnedCount = 0;

  readersCount = 0;

  async ngOnInit() {

    const { data: booksData } = await supabase
      .from('books')
      .select('*');

    this.books = booksData || [];

    const { data: borrowData } = await supabase
      .from('borrow')
      .select('*');

    this.borrow = borrowData || [];

    this.totalBooks = this.books.length;

    this.totalQuantity = this.books.reduce(
      (sum, book) => sum + Number(book.quantity),
      0
    );

    this.borrowingCount = this.borrow.filter(
      item => item.note === 'Đang mượn'
    ).length;

    this.returnedCount = this.borrow.filter(
      item => item.note === 'Đã trả'
    ).length;

    const uniqueReaders = new Set(
      this.borrow.map(
        item => item.citizenId
      )
    );

    this.readersCount = uniqueReaders.size;

    this.cdr.detectChanges();
    const readersMap = new Map();

this.borrow.forEach(item => {

  if (!readersMap.has(item.citizenId)) {

    readersMap.set(item.citizenId, {

      citizenId: item.citizenId,

      readers: item.readers,

      borrowCount: 0,

      totalBooks: 0

    });

  }

  const reader = readersMap.get(item.citizenId);

  reader.borrowCount++;

  reader.totalBooks += Number(
    item.quantityBorrow || 0
  );

});

this.readerStats = Array.from(
  readersMap.values()
);
  }

  readerStats: any[] = [];
}
