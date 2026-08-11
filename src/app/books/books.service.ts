import { Injectable } from '@angular/core';
import { from, map, Observable} from 'rxjs';
import { supabase } from '../supabase';
import { Book } from './books.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  getBooks(): Observable<Book[]> {

    return from(

      supabase
        .from('books')
        .select('*')
        .order('id', { ascending: true })

    ).pipe(

      map(({ data, error }) => {

        if (error) {

          console.error(error);

          return [];

        }

        return (data ?? []) as Book[];

      })

    );

  }

  addBook(book: Omit<Book, 'id'>): Observable<boolean> {

    return from(

      supabase
        .from('books')
        .insert([book])

    ).pipe(

      map(({ error }) => {

        if (error) {

          console.error(error);

          return false;

        }

        return true;

      })

    );

  }

  updateBook(book: Book): Observable<boolean> {

    return from(

      supabase
        .from('books')
        .update({
          title: book.title,
          author: book.author,
          category: book.category,
          year: book.year,
          quantity: book.quantity,
          status: book.status
        })
        .eq('id', book.id)

    ).pipe(

      map(({ error }) => {

        if (error) {

          console.error(error);

          return false;

        }

        return true;

      })

    );

  }

  deleteBook(id: number): Observable<boolean> {

    return from(

      supabase
        .from('books')
        .delete()
        .eq('id', id)

    ).pipe(

      map(({ error }) => {

        if (error) {

          console.error(error);

          return false;

        }

        return true;

      })

    );

  }

}