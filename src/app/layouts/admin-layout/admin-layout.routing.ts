import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { UserComponent } from 'src/app/pages/user/user.component';
import { ProjectComponent } from 'src/app/pages/project/project.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'projects', component: ProjectComponent },
    { path: 'project', component: TablesComponent },
    { path: 'projects/edit/:id', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/edit/:id', component: UserComponent },
    { path: 'maps', component: MapsComponent }
];
