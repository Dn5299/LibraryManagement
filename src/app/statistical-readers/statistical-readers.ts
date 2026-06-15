import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../supabase';

@Component({
  selector: 'app-statistical-readers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistical-readers.html',
  styleUrl: './statistical-readers.css'
})
export class StatisticalReaders {

  constructor(private cdr: ChangeDetectorRef) {}

  readers: any[] = [];

  async ngOnInit() {

    const { data: borrow } = await supabase
      .from('borrow')
      .select('*');

    const readerMap = new Map();

    (borrow || []).forEach(item => {

      if (!readerMap.has(item.citizenId)) {

        readerMap.set(item.citizenId, {

          citizenId: item.citizenId,

          readers: item.readers,

          borrowCount: 0,

          totalBooks: 0

        });

      }

      const reader = readerMap.get(item.citizenId);

      reader.borrowCount++;

      reader.totalBooks += Number(
        item.quantityBorrow || 0
      );

    });

    this.readers = Array.from(
      readerMap.values()
    );

    this.cdr.detectChanges();

  }

}