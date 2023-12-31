import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public loginStatusSubject = new Subject<boolean>();

    constructor(private http : HttpClient) { }

    public generateToken(user : any) {
        return this.http.post(`${baseUrl}/generate-token`,user);
    }
    public getCurrentUser() {
        return this.http.get(`${baseUrl}/current-user`);
    }

    public loginUser(token : string) : boolean {
        localStorage.setItem("token",token);
        return true;
    }

    public isLoggedIn() : boolean {
        let token  = localStorage.getItem("token");
        if(token == undefined || token == '' || token == null) {
            return false;
        }
        return true;
    }

    public logout() : boolean {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return true;
    }

    public getToken() : string {
        return localStorage.getItem("token");
    }

    public setUser(user : any) {
        localStorage.setItem("user",JSON.stringify(user));
    }

    public getUser() {
        let user = localStorage.getItem("user");
        if(user!=null) {
            return JSON.parse(user);
        } else {
            this.logout();
            return null;
        } 
    }

    public getUserRole() : string {
        let user = this.getUser();
        return user.authorities[0].authority;
    }
}
