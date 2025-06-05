import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Tile } from '../models/tile.model';
import { HttpClient } from '@angular/common/http';
import { CatImageResponse } from '../models/cat-image-response.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private boardData: Tile[] = [];
  private boardDataSignal: WritableSignal<Tile[]> = signal([]);
  private imgArray: string[] = [];
  private http: HttpClient = inject(HttpClient);

  constructor() {
  }

  private generatePairs() : void {
    const boardDataCopy = Object.assign(this.boardData);
    
    let index: number = 0;
    let currentElement: Tile = boardDataCopy.splice(index, 1)[0];

    while(boardDataCopy.length > 1) {

      const generatedIndex: number = this.generateRandomNum(boardDataCopy.length);

      this.boardData[index].pair = boardDataCopy[generatedIndex].id;
      this.boardData[index].img = boardDataCopy[generatedIndex].img = this.imgArray[0];

      boardDataCopy.splice(generatedIndex, 1);
      
      index++;
      currentElement = boardDataCopy.splice(index, 1)[0];
    }
  }

  private generateRandomNum(limit: number) {
    return Math.floor(Math.random() * limit)
  }

  private generateImgArray(): void {
    this.http.get<CatImageResponse[]>('https://api.thecatapi.com/v1/images/search', {
      params: {'limit': 4}
    }).subscribe((data : CatImageResponse[]) => {
      this.imgArray = data.map((entry: CatImageResponse) => entry.url);
    })
  }

  setBoardData(): void {
    this.generateImgArray();
    this.generatePairs();

    this.boardDataSignal.set(this.boardData);
  }
}
