import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Book, CommentArray, idealBibli, IdealBibliArray, Like, LikeArray, Post, PostArray } from '../typings';
import { PostModel } from '../models/post.model';
import { CommentModel } from '../models/comment.model';
import { LikeModel } from '../models/like.model';
import { idealBibliModel } from '../models/idealBibli.model';
import { environment } from 'src/environments/environment';
import { UserModel2 } from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseURL: string = environment.apiUrl;
    token? = localStorage.getItem('token');

    constructor(private http: HttpClient) { 
    }

    getBookTotalList() {
        return this.http.get<Book[]>(`${this.baseURL}/books.json`);
    }

    getPostsList() {
        return this.http.get<PostArray>(`${this.baseURL}/post_shares?page=1&order%5Bdate%5D=desc`);
    }

    getPostsByUserId(id: number) {
        let httpParams = new HttpParams();
        if (id) {
            httpParams = httpParams.set('id', id);
        }
        return this.http.get<PostArray>(`${this.baseURL}/post_shares?page=1&user=${id}&order%5Bdate%5D=desc`);
    }

    getPostsByPostId(id: number) {
        return this.http.get<PostArray>(`${this.baseURL}/post_shares/${id}`);
    }

    getPostsByPostId2(id: number) {
        return this.http.get<Post>(`${this.baseURL}/post_shares/${id}`);
    }

    deletePost(id: number) {
        return this.http.delete(`${this.baseURL}/post_shares/${id}`)
    }

    addPost(post: PostModel) {
        const headers = {'content-type': 'application/json'}  
        const body=JSON.stringify(post);
        console.log('body', body);
        return this.http.post(`${this.baseURL}/post_shares.json`, body, {'headers': headers});
    }

    getCommentsByPostId(id: number) {
        return this.http.get<CommentArray>(`${this.baseURL}/comments?page=1&post_share=${id}`);
    }

    addComment(comment: CommentModel) {
        const headers = {'content-type': 'application/json'}  
        console.log('body', comment);
        return this.http.post(`${this.baseURL}/comments.json`, comment, {'headers': headers});
    }

    padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }

    formatDate(date: Date) {
        return (
            [
                date.getFullYear(),
                this.padTo2Digits(date.getMonth() + 1),
                this.padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                this.padTo2Digits(date.getHours()),
                this.padTo2Digits(date.getMinutes()),
                this.padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }

    getLikesByPostId(postId: number) {
        return this.http.get<LikeArray>(`${this.baseURL}/like_posts?page=1&postShare=${postId}`);
    }

    initializeLikeOnPost(like: LikeModel) {
        const headers = {'content-type': 'application/json'}  
        console.log('body', like);
        return this.http.post(`${this.baseURL}/like_posts.json`, like, {'headers': headers});
    }

    upDateLikeOnPostByPostId(id: number, like: LikeModel) {
        return this.http.put(`${this.baseURL}/like_posts/${id}`, like);
    }

    addUser(user: UserModel2) {
        const headers = {'content-type': 'application/json'}  
        console.log('body', user);
        return this.http.post(`${this.baseURL}/users.json`, user, {'headers': headers});
    }

    getIdealBibliByUserId(userId: number) {
        return this.http.get<IdealBibliArray>(`${this.baseURL}/ideal_bibliotheques?page=1&user=${userId}`)
    }

    addIdealBibli(idealBibli: idealBibliModel) {
        const headers = {'content-type': 'application/json'}  
        console.log('body', idealBibli);
        return this.http.post(`${this.baseURL}/ideal_bibliotheques.json`, idealBibli, {'headers': headers});
    }

    modifyBibli(idBibli: number, bibli: idealBibliModel) {
        return this.http.put(`${this.baseURL}/ideal_bibliotheques/${idBibli}`, bibli);
    }
}
