import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 showMenu : boolean = true;

  constructor(
    private router: Router,
  ) {}
  ngOnInit() {}
  createCase(){
      this.router.navigate(['menu/create-case']);
  }

  goToCases(){
    this.router.navigate(['menu/existing-cases']);
  }
}