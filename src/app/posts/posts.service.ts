import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import IPost from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: IPost[] = [];
  private postsUpdated = new Subject<IPost[]>();

  getPosts() {
  this.http.get<{message: string; posts: any}>('https://mean-course-run-6ovy3iyu3q-uc.a.run.app/api/posts')
    .pipe(
      map(
        (postData) => {
        return postData.posts.map((post: any) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      })
    )
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: IPost) {
    this.http.post<{message: string, postId: string}>('https://mean-course-run-6ovy3iyu3q-uc.a.run.app/api/posts', post).subscribe((responseData) => {
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string) {
    this.http.delete<{message: string}>('https://mean-course-run-6ovy3iyu3q-uc.a.run.app/api/posts/' + postId).subscribe(() => {
        console.log(this.posts);
        console.log(postId);
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      console.log(updatedPosts);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  constructor(private http: HttpClient) { }
}
