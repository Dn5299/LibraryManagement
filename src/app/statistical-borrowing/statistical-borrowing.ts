import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../supabase';

@Component({
  selector: 'app-statistical-borrowing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistical-borrowing.html',
  styleUrl: './statistical-borrowing.css'
})
export class StatisticalBorrowing {

  constructor(private cdr: ChangeDetectorRef) {}

  borrowList: any[] = [];

  async ngOnInit() {

    const { data, error } = await supabase

      .from('borrow')

      .select('*')

      .eq('note', 'Đang mượn');

    if (error) {

      console.log(error);

      return;

    }

    this.borrowList = data || [];

    this.cdr.detectChanges();

  }

}