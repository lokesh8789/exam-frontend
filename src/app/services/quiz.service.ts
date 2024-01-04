import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    constructor(private http: HttpClient) { }

    public quizzes() {
        return this.http.get(`${baseUrl}/quiz/`);
    }

    public addQuiz(quiz) {
        return this.http.post(`${baseUrl}/quiz/`,quiz);
    }

    public deleteQuiz(id) {
        return this.http.delete(`${baseUrl}/quiz/${id}`);
    }

    public getQuiz(id) {
        return this.http.get(`${baseUrl}/quiz/${id}`);
    }

    public updateQuiz(quiz) {
        return this.http.put(`${baseUrl}/quiz/`,quiz)
    }

    public getQuizzesOfCategory(catId) {
        return this.http.get(`${baseUrl}/quiz/category/${catId}`);
    }

    public getActiveQuizzes() {
        return this.http.get(`${baseUrl}/quiz/active`);
    }

    public getActiveQuizzesOfCategory(cid) {
        return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
    }
}
