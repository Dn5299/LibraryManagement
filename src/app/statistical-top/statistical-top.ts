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

    const { data: books } = await supabase
      .from('books')
      .select('*');

    const { data: borrow } = await supabase
      .from('borrow')
      .select('*');

    const result: any[] = [];

    (books || []).forEach(book => {

      const borrowedQuantity = (borrow || [])

        .filter(item => item.title === book.title)

        .reduce(

          (sum, item) =>

            sum + Number(item.quantityBorrow || 0),

          0

        );

      const ratio =

        borrowedQuantity /
        Number(book.quantity);

      if (ratio > 0.5) {

        result.push({

          title: book.title,

          quantity: book.quantity,

          borrowed: borrowedQuantity,

          ratio: (ratio * 100).toFixed(1)

        });

      }

    });

    this.topBooks = result;

    this.cdr.detectChanges();

  }

}