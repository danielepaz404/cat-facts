import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Tile } from '../models/tile.model';
import { HttpClient } from '@angular/common/http';
import { CatImageResponse } from '../models/cat-image-response.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private boardData: Tile[] = [];
  boardDataSignal: WritableSignal<Tile[]> = signal([]);
  private http: HttpClient = inject(HttpClient);

  constructor() {
    this.generateImgArray();
  }

  private generateImgArray(): void {
    this.http.get<CatImageResponse[]>('https://api.thecatapi.com/v1/images/search', {
      params: {'limit': 4}
    }).subscribe((data : CatImageResponse[]) => {
      this.generateBoardData(data.map((entry: CatImageResponse) => entry.url));
    })
  }

  private generateBoardData(imgArray: string[]): void {

    const boardData: Tile[] = [];
    const numEls: number = 6;

    for(let i = 0; i < numEls/2; i++) {

      let currentTile = { id: i, img: imgArray[i], active: false, pair: i + numEls/2 } as Tile;
      let currentTilePair = { id: i + numEls/2, img: imgArray[i], active: false, pair: i} as Tile; 

      boardData.push(currentTile);
      boardData.push(currentTilePair);
    }

    this.boardData = boardData;
    this.shuffleArray();
    this.boardDataSignal.set(this.boardData);
  }

  private shuffleArray(): void {
    this.boardData.sort(() => Math.random() - 0.5);
  }
}
