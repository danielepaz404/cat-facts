import { Component, effect, inject } from '@angular/core';
import { TileComponent } from "../tile/tile";
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-board',
  imports: [TileComponent],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board {
  protected gameService = inject(GameService);

  constructor() {
    effect(() => {
      console.log(this.gameService.boardDataSignal());
    })
  }

  onClickHandler(index: number) {
    this.gameService.boardDataSignal.update(boardData => 
      boardData.map(tile => {
        if (tile.id === index) {
          tile.active = !tile.active;
        }

        return tile;
      })
    )
  }
}
