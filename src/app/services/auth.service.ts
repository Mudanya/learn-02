import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<User | null | undefined>(undefined)
  constructor() { }
}
