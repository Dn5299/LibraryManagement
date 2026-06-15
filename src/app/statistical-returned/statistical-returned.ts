import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../supabase';

@Component({
  selector: 'app-statistical-returned',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistical-returned.html',
  styleUrl: './statistical-returned.css'
})
export class StatisticalReturned {

  constructor(private cdr: ChangeDetectorRef) {}

  borrowList: any[] = [];

  async ngOnInit() {

    const { data, error } = await supabase

      .from('borrow')

      .select('*')

      .eq('note', 'Đã trả');

    if (error) {

      console.log(error);

      return;

    }

    this.borrowList = data || [];

    this.cdr.detectChanges();

  }

}