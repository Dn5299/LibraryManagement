import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.css',

})
export class Books {
  books =[
    {
    stt: 1,
    title: "",
    author: "",
    category: "",
    year: "",
    quantity: "",
    status: "",
  }
  ];
  editBook(book: any){
    console.log("Sửa sách", book)
  }
  deleteBook(book: any){
    console.log("Xóa sách", book)
  }
}
