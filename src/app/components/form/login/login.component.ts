import { Component } from '@angular/core';
import { FormService } from '../form.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    message: string = '';

    constructor (private formService: FormService) {}

    onLogin(form: any) {
        const email = form.value.email;
        const password = form.value.password;
        const success = this.formService.login(email, password);
        this.message = success ? 'Đăng nhập thành công' : 'Email mật khẩu không đúng!'
    }
} 