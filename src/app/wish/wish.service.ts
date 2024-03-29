import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { WishItem } from 'src/shared/models/wishitems';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WishService {
  constructor(private http: HttpClient) {}

  private getStandardOptions(): any {
    return {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
      }),
    };
  }

  getWishes() {
    let options = this.getStandardOptions();

    options.params = new HttpParams({
      fromObject: {
        format: 'json',
      },
    });

    return this.http
      .get('assets/wishes.json', options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(`this is an issues with the clients network:`, error.error);
    } else {
      console.error(`server-side error:`, error.error);
    }
    return throwError(()=>new Error(`Cannot retrieve wishes from the server.Please try again`))
  }

  private addiWsh(wish: WishItem) {
    let options = this.getStandardOptions();

    options.headers = options.headers.set(
      'Authorization',
      'value-need-for-authorization'
    );
    this.http.post('assets/Wishes.json', wish, options);
  }
}
