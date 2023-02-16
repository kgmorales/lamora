import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import Butter from 'buttercms';
import { map, catchError } from 'rxjs/operators';

import { BlogPost, BlogPostMeta } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ButterCMSService {
  private butter = Butter('f5662cd5350948b6b70cc6716250e124f0d4a2d8');

  constructor(private route: Router) {}

  getPosts(
    page: number,
    pageSize: number
  ): Observable<{
    data: BlogPost[];
    meta: {
      count: number;
      next_page: number | null;
      previous_page: number | null;
    };
  }> {
    return from(
      this.butter.post.list({
        page,
        page_size: pageSize,
      })
    ).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  getPostDetails(slug: string): Observable<any> {
    return from(this.butter.post.retrieve(slug)).pipe(
      map(response => {
        return response.data;
      }),
      catchError(error => {
        return this.route.navigate(['/']);
      })
    );
  }
}
