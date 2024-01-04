import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-update-quiz',
    templateUrl: './update-quiz.component.html',
    styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute, 
        private quizService: QuizService, 
        private category: CategoryService,
        private router : Router) { }

    quizId = 0;
    quiz: any;
    categories: any;

    ngOnInit(): void {
        this.quizId = this.activatedRoute.snapshot.params.id;
        this.quizService.getQuiz(this.quizId).subscribe({
            next: (data: any) => {
                this.quiz = data;
            },
            error: (e) => {
                console.error(e);
            }
        });
        this.category.categories().subscribe({
            next: (data: any) => {
                this.categories = data;
            },
            error: (e) => {
                console.log(e);
            }
        })
    }

    updateQuiz() {
        this.quizService.updateQuiz(this.quiz).subscribe({
            next : (data : any) => {
                Swal.fire("Success","Updated Successfully",'success')
                .then((e) => {
                    this.router.navigate(['/admin/quizzes']);
                });
            },
            error : (e) => {
                console.log(e);
            }
        });
    }

}
