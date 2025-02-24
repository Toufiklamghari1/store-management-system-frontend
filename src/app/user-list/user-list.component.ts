import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../shared/stocker';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users?: user[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/users')
      .subscribe(users => {
        this.users = users;
      });
  }

}
