import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsComponent }      from './persons/persons.component';
import { AnimalsComponent }      from './animals/animals.component';
import { AnimalDetailComponent }  from './animal-detail/animal-detail.component';

const routes: Routes = [
  { path: 'person', component: PersonsComponent },
  { path: 'animal', component: AnimalsComponent },
  { path: 'animaldetail/:id', component: AnimalDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}