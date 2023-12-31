import { Component, ElementRef, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isLoggedIn = false;
    user = null;

    constructor(public login: LoginService, private el :ElementRef) { }

    ngOnInit(): void {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
        this.login.loginStatusSubject.asObservable().subscribe({
            next: (data) => {
                this.isLoggedIn = this.login.isLoggedIn();
                this.user = this.login.getUser();
            }
        })
    }

    public logout() {
        this.login.logout();
        window.location.reload();
    }

    getHeight(): number {
        return this.el.nativeElement.offsetHeight;
    }

}
