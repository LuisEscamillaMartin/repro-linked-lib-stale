import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibreriaServicio } from 'libreria';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('proyecto-22');

  libreriaServicio: LibreriaServicio = inject(LibreriaServicio);

  constructor() {
    this.libreriaServicio.hola();
  }
}
