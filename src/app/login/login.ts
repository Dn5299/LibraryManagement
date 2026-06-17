import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';

  password = '';

  constructor(
    private router: Router
  ) {}

  login() {

    if (

      this.username === 'admin' &&

      this.password === '123456'

    ) {

      localStorage.setItem(
        'isLoggedIn',
        'true'
      );

      alert('Đăng nhập thành công');

      this.router.navigate(
        ['/home']
      );

    }

    else {

      alert(
        'Sai tài khoản hoặc mật khẩu'
      );

    }

  }

}