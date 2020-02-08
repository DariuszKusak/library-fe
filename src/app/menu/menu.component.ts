import {Component, OnInit} from '@angular/core';
import {Navlink} from '../model/navlink';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  navLinks: Navlink[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getNavLinks().subscribe(
      navLinks => {
        this.navLinks = navLinks;
        console.log(this.navLinks);
      }
    );
  }

}
