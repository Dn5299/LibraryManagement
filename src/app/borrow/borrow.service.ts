import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { supabase } from '../supabase';
import { Borrow } from './borrow.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  getBorrow(): Observable<Borrow[]> {

    return from(
      supabase
        .from('borrow')
        .select('*')
        .order('id', { ascending: true })
    ).pipe(
      map(({ data, error }) => {

        if (error) {
          console.error('Lỗi lấy phiếu mượn:', error);
          return [];
        }

        return (data ?? []).map(item => ({
          ...item,
          dueDate: item.duedate
        })) as Borrow[];

      })
    );

  }


  addBorrow(
    borrow: Omit<Borrow, 'id'>
  ): Observable<boolean> {

    return from(
      supabase
        .from('borrow')
        .insert([
          {
            citizenId: borrow.citizenId,
            readers: borrow.readers,
            title: borrow.title,
            quantityBorrow: borrow.quantityBorrow,

            borrowd: borrow.borrowd,
            duedate: borrow.dueDate,
            returnd: borrow.returnd,

            note: borrow.note,

            unit_price: borrow.unit_price,
            borrow_fee: borrow.borrow_fee,
            late_fee: borrow.late_fee,
            total_fee: borrow.total_fee
          }
        ])
    ).pipe(
      map(({ error }) => {

        if (error) {
          console.error('Lỗi thêm phiếu mượn:', error);
          return false;
        }

        return true;

      })
    );

  }


  updateBorrow(
    borrow: Borrow
  ): Observable<boolean> {

    return from(
      supabase
        .from('borrow')
        .update({
          citizenId: borrow.citizenId,
          readers: borrow.readers,
          title: borrow.title,
          quantityBorrow: borrow.quantityBorrow,

          borrowd: borrow.borrowd,
          duedate: borrow.dueDate,
          returnd: borrow.returnd,

          note: borrow.note,

          unit_price: borrow.unit_price,
          borrow_fee: borrow.borrow_fee,
          late_fee: borrow.late_fee,
          total_fee: borrow.total_fee
        })
        .eq('id', borrow.id)
    ).pipe(
      map(({ error }) => {

        if (error) {
          console.error('Lỗi cập nhật phiếu mượn:', error);
          return false;
        }

        return true;

      })
    );

  }


  deleteBorrow(
    id: number
  ): Observable<boolean> {

    return from(
      supabase
        .from('borrow')
        .delete()
        .eq('id', id)
    ).pipe(
      map(({ error }) => {

        if (error) {
          console.error('Lỗi xóa phiếu mượn:', error);
          return false;
        }

        return true;

      })
    );

  }

}