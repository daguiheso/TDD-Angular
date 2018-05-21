import { Component } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(private usersService: UsersService ) {
    this.usersService.getUsers()
      .subscribe(res => {
        // debugger
      }, error => {
        // debugger
      })
  }

  ngOnInit() { }
}
