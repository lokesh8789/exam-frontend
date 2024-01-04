import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-instructions',
    templateUrl: './instructions.component.html',
    styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

    qId;
    quiz;
    constructor(private activatedRoute: ActivatedRoute,
        private quizService: QuizService,
        private router: Router) { }

    ngOnInit(): void {
        this.qId = this.activatedRoute.snapshot.params.qid;
        this.quizService.getQuiz(this.qId).subscribe({
            next: (data)=>{
                this.quiz = data;
            },
            error: (e)=>{
                console.log(e);
            }
        })
    }

    startQuiz() {
        Swal.fire({
            title: 'Do You want to start the quiz?',
            showCancelButton: true,
            confirmButtonText: 'Start',
            icon: 'question'
        }).then((result)=>{
            if(result.isConfirmed){
                this.router.navigate([`/start/${this.qId}`])
            }
        })
    }

}
