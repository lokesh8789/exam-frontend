import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-view-questions',
    templateUrl: './view-questions.component.html',
    styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

    quizId: any;
    quizTitle: any;
    questions = [];
    constructor(private activatedRoute: ActivatedRoute, private questionService : QuestionService) { }

    ngOnInit(): void {
        this.quizId = this.activatedRoute.snapshot.params.id;
        this.quizTitle = this.activatedRoute.snapshot.params.title;
        this.questionService.getQuestionsOfQuiz(this.quizId).subscribe({
            next: (data: any) => {
                this.questions = data;
            },
            error: (e) => {
                console.error(e);
            }
        })
    }

    deleteQuestion(id) {
        Swal.fire({
            icon: 'question',
            showCancelButton: true,
            confirmButtonText:'Delete',
            title: "Are You Sure?",
        }).then((result)=>{
            if(result.isConfirmed) {
                this.questionService.deleteQuestion(id).subscribe({
                    next: (data) => {
                        Swal.fire('Success', 'Deleted Succesfully', 'success');
                        this.questions = this.questions.filter((value) => value.id != id);
                    },
                    error: (e) => {
                        Swal.fire('Error', 'Error Occurred', 'error');
                        console.log(e);
                    }
                })
            }
        })
    }

}
