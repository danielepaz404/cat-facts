import { Component, effect, input } from '@angular/core';
import { Tile } from '../../models/tile.model';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board {
  data = input<Tile[]>();

  constructor() {
    effect(() => {
      console.log(this.data());
    })
  }
}
