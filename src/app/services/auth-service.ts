import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './models/auth-models';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private client: HttpClient) { }

  async login(request: LoginRequest) {
    return lastValueFrom(this.client.post(`${environment.baseUri}/auth/login`, request));
  }
}
