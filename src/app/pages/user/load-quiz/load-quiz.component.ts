import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
    selector: 'app-load-quiz',
    templateUrl: './load-quiz.component.html',
    styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

    catId;
    quizzes;
    constructor(private activatedRoute: ActivatedRoute,private quizService : QuizService) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params)=>{
            this.catId = params.catId;
            if (this.catId == 0) {
                this.quizService.getActiveQuizzes().subscribe({
                    next: (data: any) => {
                        this.quizzes = data;
                    },
                    error: (e) => {
                        console.log(e);
                    }
                })
            } else {
                this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe({
                    next: (data: any) => {
                        this.quizzes = data;
                    },
                    error: (e) => {
                        console.log(e);
                    }
                });
            }
        });
        
    }

}
