import { Injectable } from '@angular/core';
import { supabase } from '../supabase';
import { Book } from './books.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  async getBooks(): Promise<Book[]> {

    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error(error);
      return [];
    }

    return (data ?? []) as Book[];

  }

  async addBook(book: Omit<Book, 'id'>): Promise<boolean> {

    const { error } = await supabase
      .from('books')
      .insert([book]);

    if (error) {
      console.error(error);
      return false;
    }

    return true;

  }

  async updateBook(book: Book): Promise<boolean> {

    const { error } = await supabase
      .from('books')
      .update({
        title: book.title,
        author: book.author,
        category: book.category,
        year: book.year,
        quantity: book.quantity,
        status: book.status
      })
      .eq('id', book.id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;

  }

  async deleteBook(id: number): Promise<boolean> {

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;

  }

}