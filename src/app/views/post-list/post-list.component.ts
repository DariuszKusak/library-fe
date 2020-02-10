import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/Book';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  usersBooks: Book[];
  panelOpenState = false;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBooks4User().subscribe(
      data => {
        this.usersBooks = data;
      }
    );
  }

}
