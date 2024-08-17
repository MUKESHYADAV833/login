import { Injectable } from '@angular/core';
import { Observable, of } from'rxjs';
import { delay } from'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private mockUser = {
    username: 'admin',
    password: 'password123'
  };

  login(credentials: { username: string, password: string }): Observable<{ success: boolean }> {
    const isValidUser = 
      credentials.username === this.mockUser.username && 
      credentials.password === this.mockUser.password;
    return of({ success: isValidUser }).pipe(delay(1000)); // Simulate server delay
  }
}
