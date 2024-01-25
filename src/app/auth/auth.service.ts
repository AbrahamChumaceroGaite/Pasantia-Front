import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MessagesService } from '../services/dialog/message.service';

interface LoginResponse {
  token: string;
  userName: string;
  role: string;
  parishId: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private api = environment.appUrl;
  titulo: string = '';
  icon: string = '';
  userPermissions: any;


  constructor(private http: HttpClient, private router: Router) { }

  login(body: any): Observable<any> {
    const url = `${this.api}api/Token`;

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(res => {
        sessionStorage.setItem('Token', res.token);
        sessionStorage.setItem('UserName', res.userName);
        sessionStorage.setItem('Role', res.role);
        sessionStorage.setItem('ParishId', res.parishId);
      })
    );
  }

  getToken(): string | null {
    const token = sessionStorage.getItem('Token');
    return token;
  }
  

  getUserName() {
    const username = sessionStorage.getItem('UserName');
    return username !== null ? username : '';
  }

  getRole() {
    const rol = sessionStorage.getItem('Role');
    return rol !== null ? rol : ''; 
  }
  

  getParishId() {
    const ParishId = sessionStorage.getItem('ParishId');
    
    return ParishId; 
  }

  hasPermission(allowedRoles: string[]): boolean {
    const userRole = this.getRole();
    return Array.isArray(allowedRoles) && allowedRoles.length > 0 && allowedRoles.includes(userRole);
  }
  

  setRoleInSessionStorage(role: string) {
    sessionStorage.setItem('CurrentRole', role);
  }

  getRoleFromSessionStorage(): string | null {
    return sessionStorage.getItem('CurrentRole');
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('Token');
  }

  logout() {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('Role');
    sessionStorage.removeItem('ParishId');
    this.router.navigate(['/login']);
  }
}
