import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private http: HttpClient) { }

    public getQuestionsOfQuiz(quizId) {
        return this.http.get(`${baseUrl}/question/quiz/all/${quizId}`);
    }

    public getQuestionsOfQuizForTest(quizId) {
        return this.http.get(`${baseUrl}/question/quiz/${quizId}`);
    }

    public addQuestion(question) {
        return this.http.post(`${baseUrl}/question/`,question);
    }

    public deleteQuestion(id) {
        return this.http.delete(`${baseUrl}/question/${id}`);
    }

    public evalQuiz(questions) {
        return this.http.post(`${baseUrl}/question/eval-quiz`,questions);
    }
}
