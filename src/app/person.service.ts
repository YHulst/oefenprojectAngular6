import { Injectable } from '@angular/core';
import { Person } from './person';
import { PERSONS } from './mock-persons';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personsUrl = 'http://localhost:8081/api/v1/person';

  constructor(private http: HttpClient) { }

  /** GET persons from the server */
getPersons (): Observable<Person[]> {
  return this.http.get<Person[]>(this.personsUrl)
}

}
