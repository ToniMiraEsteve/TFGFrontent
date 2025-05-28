import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { BehaviorSubject } from 'rxjs';
import { Rol, RolHelper } from 'src/app/enums/rol.enum';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({
    providedIn: 'root'
})
export class AuthStorage {

    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
    public loggedIn$ = this.loggedIn.asObservable();

    private currentUserSubject = new BehaviorSubject<Usuario | null>(this.getUser());
    public currentUser$ = this.currentUserSubject.asObservable();

    rol: String

    constructor() {}

    public saveToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
        this.loggedIn.next(true);
    }

    public getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user: any): void {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    public getUser(): Usuario | null {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    public getRol(): Rol | null {
        const user = this.getUser();
        if (!user || !user.rol) {
            return null;
        }
        const rolStr = user.rol.toString();
        return RolHelper.toEnum(rolStr);
    }

    public getUsername(): string | null {
        const user = this.getUser();
        return user ? user.username : null;
    }

    public signOut(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        this.loggedIn.next(false);
        this.currentUserSubject.next(null);
    }

    public isLoggedIn(): boolean {
        return !!this.getToken();
    }

    private hasToken(): boolean {
        return !!localStorage.getItem(TOKEN_KEY);
    }
}
