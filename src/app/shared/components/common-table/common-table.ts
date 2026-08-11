import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MoneyPipe } from '../../pipes/money-pipe';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [
    CommonModule,
    MoneyPipe
  ],
  templateUrl: './common-table.html',
  styleUrl: './common-table.css'
})
export class CommonTable {

  data = input.required<any[]>();

  columns = input.required<{
    key: string;
    label: string;
    type?: 'text' | 'money';
  }[]>();

  edit = output<any>();

  delete = output<any>();

}