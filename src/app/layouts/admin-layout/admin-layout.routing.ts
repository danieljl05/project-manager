import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { UserComponent } from 'src/app/pages/user/user.component';
import { ProjectComponent } from 'src/app/pages/project/project.component';
import { AuthGuard } from 'src/app/auth.guard';
import { TagsComponent } from 'src/app/pages/tags/tags.component';
import { TagComponent } from 'src/app/pages/tag/tag.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'projects', component: ProjectComponent, canActivate: [AuthGuard] },
    { path: 'project', component: TablesComponent, canActivate: [AuthGuard] },
    { path: 'projects/:id/edit', component: TablesComponent, canActivate: [AuthGuard] },
    // { path: 'projects/:id/tags', component: TagsComponent, canActivate: [AuthGuard] },
    { path: 'tags', component: TagsComponent, canActivate: [AuthGuard] },
    { path: 'tag', component: TagComponent, canActivate: [AuthGuard] },
    { path: 'tag/:id/edit', component: TagComponent, canActivate: [AuthGuard] },
    { path: 'icons', component: IconsComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'users/:id/edit', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'maps', component: MapsComponent, canActivate: [AuthGuard] }
];
