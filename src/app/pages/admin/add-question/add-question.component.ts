import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
    quizId: any;
    quizTitle: any;
    question = {
        quiz:{},
        content: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: ''
    }
    constructor(private activatedRoute: ActivatedRoute,private questionService : QuestionService) { }

    ngOnInit(): void {
        this.quizId = this.activatedRoute.snapshot.params.qid;
        this.quizTitle = this.activatedRoute.snapshot.params.title;
        this.question.quiz['id']=this.quizId;
    }

    addQuestion() {
        if(this.question.content == null || this.question.content.trim() == '') {
            return;
        }
        if (this.question.option1 == null || this.question.option1.trim() == '') {
            return;
        }
        if (this.question.option2 == null || this.question.option2.trim() == '') {
            return;
        }
        if (this.question.answer == null || this.question.answer.trim() == '') {
            return;
        }
        this.questionService.addQuestion(this.question).subscribe({
            next: (data: any) => {
                Swal.fire("Sucess","Question Added Successfully",'success');
                this.question.content='';
                this.question.option1='';
                this.question.option2='';
                this.question.option3='';
                this.question.option4='';
                this.question.answer='';
            },
            error: (e) => {
                Swal.fire('Error','Error Occurred','error');
                console.log(e);
            }
        });
    }

}
