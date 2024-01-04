import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-quiz',
    templateUrl: './add-quiz.component.html',
    styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

    categories = [];
    quiz = {
        title: '',
        description: '',
        maxMarks: '',
        noOfQuestions: '',
        active: true,
        category: {
            id:''
        }
    };

    constructor(private _category : CategoryService, private _snack : MatSnackBar, private _quiz : QuizService) { }

    ngOnInit(): void {
        this._category.categories().subscribe({
            next: (data : any) => {
                this.categories = data;
            },
            error: (error) => {
                Swal.fire("Error","Error Occurred",'error');
            },
            complete: () => {
                console.log("APi Call done")
            }
        })
    }

    addQuiz() {
        if(this.quiz.title == null || this.quiz.title == '') {
            this._snack.open("Title Required!!",'OK',{
                duration: 3000
            })
            return;
        }
        this._quiz.addQuiz(this.quiz).subscribe({
            next: (data: any) => {
                Swal.fire("Saved", "Quiz Saved", 'success');
                this.quiz = {
                    title: '',
                    description: '',
                    maxMarks: '',
                    noOfQuestions: '',
                    active: true,
                    category: {
                        id: ''
                    }
                };
            },
            error: (error) => {
                this._snack.open("Error", "OK", {
                    duration: 2000
                })
            }
        })
    }

}
