import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-table.html',
  styleUrl: './common-table.css'
})
export class CommonTable {

  data = input.required<any[]>();

  columns = input.required<{ key: string; label: string }[]>();

  edit = output<any>();

  delete = output<any>();

}