import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../supabase';

@Component({
  selector: 'app-statistical-overview',
  imports: [CommonModule],
  templateUrl: './statistical-overview.html',
  styleUrl: './statistical-overview.css'
})
export class StatisticalOverview {

  constructor(private cdr: ChangeDetectorRef) {}

  totalTitles = 0;

  totalBooks = 0;

  borrowingCount = 0;

  returnedCount = 0;

  readersCount = 0;

  async ngOnInit() {

    const { data: books } = await supabase
      .from('books')
      .select('*');

    const { data: borrow } = await supabase
      .from('borrow')
      .select('*');

    if (books) {

      this.totalTitles = books.length;

      this.totalBooks = books.reduce(
        (sum, book) => sum + Number(book.quantity),
        0
      );

    }

    if (borrow) {

      this.borrowingCount = borrow.filter(
        item => item.note === 'Đang mượn'
      ).length;

      this.returnedCount = borrow.filter(
        item => item.note === 'Đã trả'
      ).length;

      const uniqueReaders = new Set(
        borrow.map(item => item.citizenId)
      );

      this.readersCount = uniqueReaders.size;

    }

    this.cdr.detectChanges();

  }

}