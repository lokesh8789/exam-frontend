import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-view-quiz',
    templateUrl: './view-quiz.component.html',
    styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {
    quizzes = []
    constructor(private quizService : QuizService) { }

    ngOnInit(): void {
        this.quizService.quizzes().subscribe({
            next: (data : any) =>{
                this.quizzes = data;
                console.log(this.quizzes);
            },
            error: (error) => {
                Swal.fire("Error !!","Error Occurred",'error');
            }
        })
    }

    deleteQuiz(id) {
        Swal.fire({
            icon:'question',
            title:'Are You Sure?',
            confirmButtonText:'Delete',
            showCancelButton:true,
        }).then((result)=>{
            if(result.isConfirmed) {
                this.quizService.deleteQuiz(id).subscribe({
                    next: (data: any) => {
                        Swal.fire('Success', 'Quiz Deleted', 'success');
                        this.quizzes = this.quizzes.filter((value) => value.id != id);
                    },
                    error: (e) => {
                        Swal.fire('Error', "Something Went Wrong", 'error');
                    }
                })
            }
        });
    }

}
