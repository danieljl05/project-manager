import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
  // { path: '/maps', title: '',  icon:'ni-folder-17 text-orange', class: '' },
  // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/projects', title: 'Proyectos', icon: 'ni-folder-17 text-orange', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.verify().subscribe(data => {
      console.log(data);
      if (data['idrol'] == 1) {
        ROUTES.push(
          { path: '/users', title: 'Usuarios', icon: 'ni-user-run text-info', class: '' },
        );
        this.menuItems = ROUTES.filter(menuItem => menuItem);
      }
    });
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
