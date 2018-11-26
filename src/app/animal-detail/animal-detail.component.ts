import { Component, OnInit, Input } from '@angular/core';
import { Animal } from '../animal';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AnimalService }  from '../animal.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})

export class AnimalDetailComponent implements OnInit {
  @Input() animal: Animal;
  animals: Animal[];

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAnimal();
  }

  goBack(): void {
    this.location.back();
  }

  getAnimal(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.animalService.getAnimal(id)
      .subscribe(animal => this.animal = animal);
  }

  deleteAnimal(animal: Animal): void {
    this.animals = this.animals.filter(p => p !== animal);
    this.animalService.deleteAnimal(animal).subscribe();
  }


}
