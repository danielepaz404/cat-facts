import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board {

  constructor(gameService: GameService) {
  }
}
