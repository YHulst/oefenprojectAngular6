import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  persons: Person[];
  selectedPerson: Person;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons(): void {
    this.personService.getPersons()
        .subscribe(persons => this.persons = persons);
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

  addPerson(person: Person): void {
    console.log("de methode addPerson is aangeroepen");
    this.personService.addPerson(person)
      .subscribe(person => {
        this.persons.push(person);
      });
  }

  deletePerson(person: Person): void {
    this.persons = this.persons.filter(p => p !== person);
    this.personService.deletePerson(person).subscribe();
  }

  save(): void {
    this.personService.updatePerson(this.selectedPerson)
      .subscribe();
  }  

}
