import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent implements OnInit {
  authSvc = inject(AuthService)
  userSvc = inject(UserService)
  title = 'learn-02';
  ngOnInit(): void {
    this.userSvc.getUser().subscribe({
      next: res => {
        this.authSvc.currentUserSig.set(res.user)
      }, error: err => this.authSvc.currentUserSig.set(null)
    })
  }
  onLogout() {
    localStorage.setItem('token', '')
    this.authSvc.currentUserSig.set(null)
  }
}
