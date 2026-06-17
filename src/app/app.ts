import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('my-app');

  h1 = "Website quản lý thư viện";

  constructor(
    private router: Router
  ) {}

  ngOnInit() {

    const isLoggedIn =
      localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {

      this.router.navigate(['/login']);

    }

  }

  logout() {

    localStorage.removeItem('isLoggedIn');

    this.router.navigate(['/login']);

  }

}