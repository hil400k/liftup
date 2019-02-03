import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PlanComponent } from './components/plan/plan.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CustomPlanComponent } from './components/custom-plan/custom-plan.component';
import { CustomPlanItemComponent } from './components/custom-plan-item/custom-plan-item.component';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PlanComponent,
    CustomPlanComponent,
    CustomPlanItemComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'plan', component: PlanComponent, canActivate: [AuthGuard]  },
      { path: 'custom-plan/:name', component: CustomPlanItemComponent, canActivate: [AuthGuard] },
      { path: 'custom-plan', component: CustomPlanComponent, canActivate: [AuthGuard] }
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
