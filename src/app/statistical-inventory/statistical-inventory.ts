import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../supabase';

@Component({
  selector: 'app-statistical-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistical-inventory.html',
  styleUrls: ['./statistical-inventory.css']
})
export class StatisticalInventory {

  constructor(private cdr: ChangeDetectorRef) {}

  inventoryBooks: any[] = [];

  async ngOnInit() {

    const { data: books } = await supabase
      .from('books')
      .select('*');

    const { data: borrow } = await supabase
      .from('borrow')
      .select('title');

    const borrowedTitles = new Set(
      (borrow || []).map(item => item.title)
    );

    this.inventoryBooks = (books || []).filter(
      book => !borrowedTitles.has(book.title)
    );
    

    this.cdr.detectChanges();

  }

}