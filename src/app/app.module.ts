import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ProjectService } from './services/project.service';

import { registerLocaleData } from '@angular/common';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './auth.guard';

import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { LoginGuard } from './login.guard';
import { ActivitiesListComponent } from './pages/activities-list/activities-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
registerLocaleData(localeEs, 'es-CO', localeEsExtra);

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:8000"],
        blacklistedRoutes: []
      }
    }),
    DragDropModule,
    MatCardModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ActivitiesListComponent,    
  ],
  providers: [ProjectService, AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
