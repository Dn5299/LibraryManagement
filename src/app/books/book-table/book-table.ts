import { Component, input, output } from '@angular/core';
import { CommonTable } from '../../shared/components/common-table/common-table';
import { Book } from '../books.model';

@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [CommonTable],
  templateUrl: './book-table.html',
  styleUrl: './book-table.css'
})
export class BookTable {

  books = input.required<Book[]>();

  edit = output<Book>();

  delete = output<Book>();

  columns = [
  { key: 'id', label: 'Mã sách' },
  { key: 'title', label: 'Tên sách' },
  { key: 'author', label: 'Tác giả' },
  { key: 'category', label: 'Danh mục' },
  { key: 'year', label: 'Năm xuất bản' },
  { key: 'quantity', label: 'Số lượng' },
  { key: 'status', label: 'Trạng thái' }
];

}