import { Injectable } from '@angular/core';
import { supabase } from '../supabase';
import { Borrow } from './borrow.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  async getBorrow(): Promise<Borrow[]> {

    const { data, error } = await supabase
      .from('borrow')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error(error);
      return [];
    }

    return (data ?? []) as Borrow[];

  }

  async addBorrow(borrow: Omit<Borrow, 'id'>): Promise<boolean> {

    const { error } = await supabase
      .from('borrow')
      .insert([borrow]);

    if (error) {
      console.error(error);
      return false;
    }

    return true;

  }

  async updateBorrow(borrow: Borrow): Promise<boolean> {

    const { error } = await supabase
      .from('borrow')
      .update({
        citizenId: borrow.citizenId,
        readers: borrow.readers,
        title: borrow.title,
        quantityBorrow: borrow.quantityBorrow,
        borrowd: borrow.borrowd,
        returnd: borrow.returnd,
        note: borrow.note,
        unit_price: borrow.unit_price,
        borrow_fee: borrow.borrow_fee,
        late_fee: borrow.late_fee,
        total_fee: borrow.total_fee
      })
      .eq('id', borrow.id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;

  }

  async deleteBorrow(id: number): Promise<boolean> {

    const { error } = await supabase
      .from('borrow')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;

  }

}