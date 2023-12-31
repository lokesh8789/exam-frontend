import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private snack : MatSnackBar, private loginService : LoginService, private router : Router) { }
    public user = {
        userName: '',
        password: '',
    };

    ngOnInit(): void {
    }

    formSubmit(){
        if(this.user.userName.trim()==''||this.user.userName==null) {
            this.snack.open("UserName is Required","",{
                duration:3000
            });
            return;
        }
        if (this.user.password.trim() == '' || this.user.password == null) {
            this.snack.open("Password is Required", "", {
                duration: 3000
            });
            return;
        }
        this.loginService.generateToken(this.user).subscribe({
            next: (data : {token: string}) => {
                console.log(data);
                this.loginService.loginUser(data.token);
                this.loginService.getCurrentUser().subscribe({
                    next: (user) => {
                        console.log(user);
                        this.loginService.setUser(user);
                        //redirect to Either Normal Or Admin Page
                        if(this.loginService.getUserRole().toLowerCase() == 'admin') {
                            this.router.navigate(["/admin"]);
                            this.loginService.loginStatusSubject.next(true);
                        } else if (this.loginService.getUserRole().toLowerCase() == 'normal') {
                            this.router.navigate(["/user-dashboard"]);
                            this.loginService.loginStatusSubject.next(true);
                        } else {
                            this.loginService.logout();
                        }
                    },
                    error: (error) => {
                        console.log(error);
                        this.snack.open("Please Enter Correct Details","x",{
                            duration:3000
                        });
                    },
                    complete: () => {
                        console.log("current-user API Completed");
                    }
                });
            },
            error: (error) => {
                console.log(error);
                this.snack.open("Please Enter Correct Details", "x", {
                    duration: 3000
                });
            },
            complete: () =>{
                console.log("Login API Completed");
            }
        });
    }

}
