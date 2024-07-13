import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HlmInputDirective, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authSvc = inject(AuthService)
  router = inject(Router)
  userSvc = inject(UserService)
  fb = inject(FormBuilder)

  form = this.fb.nonNullable.group(
    { email: ['', Validators.required], password: ['', Validators.required] }
  )
  onSubmit() {
    console.log("login")
    this.userSvc.loginUser(this.form.getRawValue()).subscribe(res => {
      localStorage.setItem('token', res.user.token!)
      this.authSvc.currentUserSig.set(res.user)
      this.router.navigateByUrl('/')
    })
  }
}
