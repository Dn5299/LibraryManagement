import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../supabase';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home {

  constructor(private cdr: ChangeDetectorRef) {}

  totalBooks = 0;

  borrowingCount = 0;

  returnedCount = 0;

  readersCount = 0;

  async ngOnInit() {

    const { data: books } = await supabase

      .from('books')

      .select('*');

    this.totalBooks = books?.reduce(

  (sum, book) => sum + Number(book.quantity),

  0

) || 0;

    const { data: borrow } = await supabase

      .from('borrow')

      .select('*');

    if (borrow) {

      this.borrowingCount = borrow.filter(

        b => b.note === 'Đang mượn'

      ).length;

      this.returnedCount = borrow.filter(

        b => b.note === 'Đã trả'

      ).length;

      const citizenIds = borrow.map(

        b => b.citizenId

      );

      const uniqueIds = [...new Set(citizenIds)];

      this.readersCount = uniqueIds.length;

    }

    this.cdr.detectChanges();

  }

}