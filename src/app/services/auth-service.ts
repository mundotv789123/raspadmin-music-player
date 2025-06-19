import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './models/auth-models';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private client: HttpClient) { }

  async login(request: LoginRequest) {
    return lastValueFrom(this.client.post('/auth/login', request));
  }
}
