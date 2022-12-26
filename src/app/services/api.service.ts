import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Post } from '../typings';
import { PostModel } from '../models/post.model';
import { UserModel } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseURL: string = "http://localhost:8000/api";
    baseURL2: string = "http://localhost:8000";

    constructor(private http: HttpClient, /* public jwtHelper: JwtHelperService */) { 
        this.loadToken();
    }

    getPostsList() {
        return this.http.get(`${this.baseURL}/post_shares.json`)
    }

    /* getActorsByName(lastname: string) {
        let params = new HttpParams();
        if (lastname) {
            params = params.set('lastname', lastname);
        }
        return this.http.get(`${this.baseURL}/special_actors?${lastname}`)
    }

    deleteActor(id: number) {
        return this.http.delete(`${this.baseURL}/special_actors/${id}`)
    } */

    addPost(post: PostModel) {
        const headers = {'content-type': 'application/json'}  
        const body=JSON.stringify(post);
        console.log(body)
        return this.http.post(`${this.baseURL}/post_shares.json`, body, {'headers': headers})
    }

    login(user: UserModel) {
        const headers = {'content-type': 'application/json'}  
        const body=JSON.stringify(user);
        console.log(body)
        return this.http.post(`${this.baseURL2}/auth`, body, {'headers': headers})
    }

    /* isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    } */

    isAuthenticated?: boolean;
    token = '';

    async loadToken() {
        const token = await localStorage.getItem('token');
        console.log(token);
        token ? this.isAuthenticated : !this.isAuthenticated;
    }
}