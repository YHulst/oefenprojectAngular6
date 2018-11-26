import { Injectable } from '@angular/core';
import { Person } from './person';
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
export class PersonService {
  private personsUrl = 'http://localhost:8081/api/v1/person';

  constructor(private http: HttpClient, public messageService: MessageService) { }

  /** Log a PersonService message with the MessageService */
private log(message: string) {
  this.messageService.add(`PersonService: ${message}`);
}

  /** GET persons from the server */
  getPersons (): Observable<Person[]> {
  // TODO: send the message _after_ fetching the persons
  this.messageService.add('PersonService: fetched persons');
  return this.http.get<Person[]>(this.personsUrl)
  .pipe(
    tap(persons => this.log('fetched persons')),
    catchError(this.handleError('getPersons', []))
  );
}

/** GET person by id. Will 404 if id not found */
getPerson(id: number): Observable<Person> {
  const url = `${this.personsUrl}/${id}`;
  return this.http.get<Person>(url).pipe(
    tap(_ => this.log(`fetched person id=${id}`)),
    catchError(this.handleError<Person>(`getPerson id=${id}`))
  );
}

/** PUT: update the person on the server */
updatePerson (person: Person): Observable<any> {
  return this.http.put(this.personsUrl, person, httpOptions).pipe(
    tap(_ => this.log(`updated person id=${person.id}`)),
    catchError(this.handleError<any>('updatePerson'))
  );
}

/** POST: add a new person to the server */
addPerson (person: Person): Observable<Person> {
  return this.http.post<Person>(this.personsUrl, person, httpOptions).pipe(
    tap((person: Person) => this.log(`added person w/ id=${person.id}`)),
    catchError(this.handleError<Person>('addPerson'))
  );
}

/** DELETE: delete the person from the server */
deletePerson (person: Person | number): Observable<Person> {
  const id = typeof person === 'number' ? person : person.id;
  const url = `${this.personsUrl}/${id}`;

  return this.http.delete<Person>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted person id=${id}`)),
    catchError(this.handleError<Person>('deletePerson'))
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
