import { Component, input, output } from '@angular/core';
import { CommonTable } from '../../shared/components/common-table/common-table';
import { Borrow } from '../borrow.model';

@Component({
  selector: 'app-borrow-table',
  standalone: true,
  imports: [CommonTable],
  templateUrl: './borrow-table.html',
  styleUrl: './borrow-table.css'
})
export class BorrowTable {

  borrow = input.required<Borrow[]>();

  edit = output<Borrow>();

  delete = output<Borrow>();

  columns = [
    { key: 'id', label: 'Mã phiếu' },
    { key: 'citizenId', label: 'CCCD/CMND' },
    { key: 'readers', label: 'Tên độc giả' },
    { key: 'title', label: 'Tên sách' },
    { key: 'quantityBorrow', label: 'Số lượng' },
    { key: 'borrowd', label: 'Ngày mượn' },
    { key: 'returnd', label: 'Ngày trả' },
    { key: 'borrow_fee', label: 'Tiền mượn' },
    { key: 'late_fee', label: 'Tiền phạt' },
    { key: 'total_fee', label: 'Tổng tiền' },
    { key: 'note', label: 'Trạng thái' }
  ];

}