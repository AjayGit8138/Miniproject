import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { console.log("Constructor")  }

  ngOnInit(): void {
    console.log("Constructor");
  
  }


mobileview()
{
  let menu = document.querySelector('#menu-btn') as HTMLDivElement;
  let navbar = document.querySelector('.navbar');

     menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}
   
}
