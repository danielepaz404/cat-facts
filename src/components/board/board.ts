import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { TileComponent } from "../tile/tile";
import { GameService } from '../../services/game.service';
import { Tile } from '../../models/tile.model';

@Component({
  selector: 'app-board',
  imports: [TileComponent],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board {
  protected gameService = inject(GameService);
  protected selectedTiles: WritableSignal<number[]> = signal([]);
  protected currentTile: WritableSignal<Tile | undefined> = signal<Tile | undefined>(undefined);

  constructor() {
    effect(() => {
      console.log(this.gameService.boardDataSignal());
    })

    effect(() => {
      const currentSelectedTiles = this.selectedTiles();
      if(currentSelectedTiles.length > 1) {
        this.checkIfScored(currentSelectedTiles);
      }

      console.log(currentSelectedTiles)
    })
  }

  onClickHandler(incomingTile: Tile) {
    if(incomingTile.scored){
      return;
    }

    this.selectedTiles.update(selectedTiles => [...selectedTiles, incomingTile.id])
    this.currentTile.set(incomingTile);

    this.gameService.boardDataSignal.update(boardData => 
      boardData.map(tile => {
        if (tile.id === incomingTile.id) {
          tile.active = !tile.active;
        }

        return tile;
      })
    )
  }

  checkIfScored(selectedTiles: number[]) {
    const currentTile = this.currentTile();

    if(currentTile && currentTile.pair === selectedTiles[0]) {
      this.gameService.boardDataSignal.update(boardData => 
        boardData.map(tile => {
          if (selectedTiles.includes(tile.id)) {
            tile.scored = true;
          }
  
          return tile;
        })
      )
    } else {
      setTimeout(() => {
        this.gameService.boardDataSignal.update(boardData => 
          boardData.map(tile => {
            if (selectedTiles.includes(tile.id)) {
              tile.active = !tile.active;
            }
  
            return tile;
          })
        )
      }, 500)
    }
    
    this.clearSelected();
  }

  clearSelected() {
    this.selectedTiles.set([]);
    this.currentTile.set(undefined);
  }
}
