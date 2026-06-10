import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home {

  books: any[] = [];

  borrow: any[] = [];
  ngOnInit() {

    const booksData = localStorage.getItem('books');

    const borrowData = localStorage.getItem('borrow');

    this.books = JSON.parse(booksData || '[]');

    this.borrow = JSON.parse(borrowData || '[]');

  }
  getBorrowingCount() {

    return this.borrow.filter(

      b => b.note === 'Đang mượn'

    ).length;

  }
  getReturnedCount() {

    return this.borrow.filter(

      b => b.note === 'Đã trả'

    ).length;

  }
  getReadersCount() {

    const citizenIds = this.borrow.map(

        b => b.citizenId

    );



    const uniqueIds = [...new Set(citizenIds)];



    return uniqueIds.length;

}

}