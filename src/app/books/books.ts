import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [CommonModule],
  templateUrl: './books.html',
  styleUrl: './books.css',

})
export class Books {
  books =[
    {
    stt: 1,
    id: "A01",
    title: "Dế phèn phiêu lưu ký",
    author: "Tô Hoài",
    }
  ];
}
