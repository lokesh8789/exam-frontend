import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

    qid;
    questions;
    marksGot=0;
    correctAnswers=0;
    attempted=0;
    isSubmit = false;
    timer:any;
    constructor(private locationStrategy: LocationStrategy,
        private activatedRoute: ActivatedRoute,
        private questionService: QuestionService) { }

    ngOnInit(): void {
        this.preventBackButton();
        this.qid=this.activatedRoute.snapshot.params.qid;
        this.questionService.getQuestionsOfQuizForTest(this.qid).subscribe({
            next: (data:any) =>{
                this.questions=data;
                this.timer=this.questions.length * 2 * 60;
                this.startTimer();
            },
            error: (e)=>{
                console.log(e);
            }
        })
    }

    preventBackButton() {
        history.pushState(null, null, location.href);
        this.locationStrategy.onPopState(() => {
            history.pushState(null, null);
        })
    }

    submitQuiz() {
        Swal.fire({
            title: 'Do You want to submit the quiz?',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            icon: 'warning'
        }).then((result) => {
            if (result.isConfirmed) {
                this.evalQuiz();
            }
        })
    }

    startTimer(){
        let t= window.setInterval(()=>{
            if(this.timer<=0){
                this.evalQuiz();
                clearInterval(t);
            } else {
                this.timer--;
            }
        },1000)
    }

    getFormattedTime() {
        let mm = Math.floor(this.timer/60);
        let ss = this.timer-mm*60;
        return `${mm} min : ${ss} sec`
    }

    evalQuiz() {
        // this.isSubmit = true;
        // this.questions.forEach((q) => {
        //     if (q.givenAnswer == q.answer) {
        //         this.correctAnswers++;
        //         let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
        //         this.marksGot += marksSingle;
        //     }
        //     if (q.givenAnswer.trim() != '') {
        //         this.attempted++;
        //     }
        // })
        this.questionService.evalQuiz(this.questions).subscribe({
            next: (data: any) => {
                this.isSubmit = true;
                this.correctAnswers = data.correctAnswers;
                this.attempted = data.attempted;
                this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
            },
            error: (e) => {

            }
        });
    }

    printPage() {
        window.print();
    }

}
