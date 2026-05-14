import { Component, signal } from '@angular/core';
import {Route, Router, RouterOutlet} from '@angular/router';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private router: Router){}

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

}
