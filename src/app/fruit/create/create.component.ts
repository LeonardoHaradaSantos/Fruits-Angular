import { Component } from '@angular/core';
import { FruitService } from '../fruit.service';
import { Route } from '@angular/router';
import { FruitModule } from '../fruit.module';
import { Router } from '@angular/router';
import { Fruit } from '../fruit';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  formdata: Fruit = { id: 0, name: '', quantity: 0, price: 0 };
 
  constructor(private fruitService: FruitService, private router: Router) {
    // Buscar frutas para calcular o próximo id no momento da inicialização
    this.fruitService.getAll().subscribe({
      next: (fruits) => {
        const maxId = fruits.length > 0 ? Math.max(...fruits.map(fruit => fruit.id)) : 0;
        // Inicializar formdata com o próximo id
        this.formdata = {
          id: maxId + 1,
          name: '',
          quantity: 0,
          price: 0
        };
      }
    });
  }

  create() {
    this.fruitService.creat(this.formdata).subscribe({
      next: (data) => {
        this.router.navigate(["fruit/home"]);
      },
      error: (er) => {
        console.log(er);
      }
    });
  }
}