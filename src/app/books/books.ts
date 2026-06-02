import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-books',
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']

})
export class Books {
  constructor(private http: HttpClient) {}
  showAddForm = false;
  newTitle = '';
  newAuthor = '';
  newCategory = '';
  newYear = '';
  newQuantity = '';
  newStatus = '';
  books: any[] = [];
  editBook(book: any){
    console.log("Sửa sách", book)
  }
  deleteBook(book: any){
    console.log("Xóa sách", book)
  }
addBook() {

  console.log(this.books);

  this.books.push({

    stt: this.books.length + 1,

    title: this.newTitle,

    author: this.newAuthor,

    category: this.newCategory,

    year: this.newYear,

    quantity: this.newQuantity,

    status: this.newStatus

  });
  localStorage.setItem(
  'books',
  JSON.stringify(this.books)
);

  console.log(this.books);
  this.showAddForm = false;
}
getPosts() {

  this.http
    .get('https://jsonplaceholder.typicode.com/posts')

    .subscribe((data: any) => {

      this.books = data.map((item: any, index: number) => ({

        stt: index + 1,

        title: item.title,

        author: item.body,

        category: "API",

        year: 2024,

        quantity: 1,

        status: "Có sẵn"

      }));

    });

}
}

