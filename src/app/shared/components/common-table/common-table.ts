import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MoneyPipe } from '../../pipes/money-pipe';
import { StatusColorDirective } from '../../directives/status-color';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [
    CommonModule,
    MoneyPipe,
    StatusColorDirective
  ],
  templateUrl: './common-table.html',
  styleUrl: './common-table.css'
})
export class CommonTable {

  data = input.required<any[]>();

  columns = input.required<{
    key: string;
    label: string;
    type?: 'text' | 'money' | 'status';
  }[]>();

  edit = output<any>();

  delete = output<any>();

}