import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmInputDirective, } from '@spartan-ng/ui-input-helm';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HlmInputDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  userSvc = inject(UserService)
  authSvc = inject(AuthService)
  router = inject(Router)
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],

  })

  onSubmit() {
    this.userSvc.addUser(this.form.getRawValue()).subscribe(res => {
      console.log(res)
      localStorage.setItem("token", res.user.token!)
      this.authSvc.currentUserSig.set(res.user)
      this.router.navigateByUrl('/')
    })
  }
}
