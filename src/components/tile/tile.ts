import { Component, input, InputSignal } from '@angular/core';
import { Tile } from '../../models/tile.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tile',
  imports: [NgClass],
  templateUrl: './tile.html',
  styleUrl: './tile.css'
})
export class TileComponent {
  data: InputSignal<Tile> = input.required<Tile>();
}
