import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Board } from '../components/board/board';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Board],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'cat-facts';
  protected gameService = inject(GameService);
}
