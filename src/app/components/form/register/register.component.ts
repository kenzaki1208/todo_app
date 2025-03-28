import { Component } from '@angular/core';
import { FormService } from '../form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  message: string = '';

  constructor(private formService: FormService, private router: Router) { }

  onRegister(form: any) {
    const email = form.value.email;
    const password = form.value.password;
    const success = this.formService.register(email, password);
    if (success) {
      this.message = 'Đăng ký thành công! Chuyển đến đăng nhập...';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } else {
      this.message = 'Email đã tồn tại!';
    }
  }
}