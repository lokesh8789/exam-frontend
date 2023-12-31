import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(private userService : UserService, private snack : MatSnackBar) { }

    public user = {
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    };

    ngOnInit(): void { }

    formSubmit() {
        if (this.user.userName == null || this.user.userName == '') {
            this.snack.open("User is Required!!",'X',{
                duration: 3000
            });
            return;
        }
        this.userService.addUser(this.user).subscribe(
            (data) => {
                console.log(data);
                Swal.fire("success");
            },
            (error) => {
                console.log(error);
                this.snack.open('Something Went Wrong','',{
                    duration:3000
                });
            },
            () => {
                console.log("completed");
            }
        )
    }
}
