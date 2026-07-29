import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../supabase';

@Component({
  selector: 'app-statistical-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistical-top.html',
  styleUrls: ['./statistical-top.css']
})
export class StatisticalTop {

  constructor(private cdr: ChangeDetectorRef) {}

  topBooks: any[] = [];

  async ngOnInit() {

    const { data: borrow } = await supabase
      .from('borrow')
      .select('*');

    const bookMap = new Map();

    (borrow || []).forEach(item => {

      if (!bookMap.has(item.title)) {

        bookMap.set(item.title, {

          title: item.title,

          borrowed: 0

        });

      }

      const book = bookMap.get(item.title);

      book.borrowed += Number(
        item.quantityBorrow || 0
      );

    });

    this.topBooks = Array.from(
      bookMap.values()
    ).sort(
      (a, b) => b.borrowed - a.borrowed
    );

    this.cdr.detectChanges();

  }

}