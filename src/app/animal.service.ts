import { Injectable } from '@angular/core';
import { Animal } from './animal';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private animalsUrl = 'http://localhost:8081/api/v1/animal';

  constructor(private http: HttpClient, public messageService: MessageService) { }

/** Log a AnimalService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`AnimalService: ${message}`);
}

  /** GET animals from the server */
  getAnimals(): Observable<Animal[]> {
  return this.http.get<Animal[]>(this.animalsUrl)
}

/** GET hero by id. Will 404 if id not found */
getAnimal(id: number): Observable<Animal> {
  const url = `${this.animalsUrl}/${id}`;
  return this.http.get<Animal>(url).pipe(
    tap(_ => this.log(`fetched animal id=${id}`)),
    catchError(this.handleError<Animal>(`getAnimal id=${id}`))
  );
}

/** POST: add a new animal to the server */
addAnimal (animal: Animal): Observable<Animal> {
  return this.http.post<Animal>(this.animalsUrl, animal, httpOptions).pipe(
    tap((animal: Animal) => this.log(`added animal w/ id=${animal.id}`)),
    catchError(this.handleError<Animal>('addAnimal'))
  );
}

/** DELETE: delete the animal from the server */
deleteAnimal (animal: Animal | number): Observable<Animal> {
  const id = typeof animal === 'number' ? animal : animal.id;
  const url = `${this.animalsUrl}/${id}`;

  return this.http.delete<Animal>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted animal id=${id}`)),
    catchError(this.handleError<Animal>('deleteAnimal'))
  );
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}


