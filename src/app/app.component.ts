import { Component } from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
    auth.user$.subscribe(user => {
      if (!user) { return; }

      userService.save(user);

      const ru: string = localStorage.getItem('returnUrl');

      if (!ru) { return; }

      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(ru);


    });
  }
}
