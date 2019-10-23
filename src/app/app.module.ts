import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PlanSheikoComponent } from './components/plan-sheiko/plan-sheiko.component';
import { PlansComponent } from './components/plans/plans.component';
import { PlanComponent } from './components/plan/plan.component';
import { AuthGuard } from './services/auth-guard.service';
import { WorkoutService } from './services/workout.service';
import { PlanService } from './services/plan.service';
import { WorkoutComponent } from './components/workout/workout.component';
import { ExerciseService } from './services/exercise.service';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { SvgDefinitionsComponent } from './components/svg-definitions/svg-definitions.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestsUtilService } from './services/requests-util.service';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { LoaderIconComponent } from './components/loader-icon/loader-icon.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { OepExerciseComponent } from './components/oep-exercise/oep-exercise.component';
import { PlanSheikoService } from './services/plan-sheiko.service';
import { PlanSearchComponent } from './components/plan-search/plan-search.component';
import { ParsedExerciseComponent } from './components/parsed-exercise/parsed-exercise.component';
import { PlanSettingsComponent } from './components/plan-settings/plan-settings.component';
import { InstructionsAddExerciseComponent } from './components/instructions-add-exercise/instructions-add-exercise.component';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';
import { PlanPreviewComponent } from './components/plan-preview/plan-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PlanSheikoComponent,
    PlansComponent,
    PlanComponent,
    WorkoutComponent,
    SvgIconComponent,
    SvgDefinitionsComponent,
    LoaderIconComponent,
    ExerciseComponent,
    OepExerciseComponent,
    PlanSearchComponent,
    ParsedExerciseComponent,
    PlanSettingsComponent,
    InstructionsAddExerciseComponent,
    CopyClipboardDirective,
    PlanPreviewComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'plan-sheiko', component: PlanSheikoComponent },
      { path: 'plans/:planId', component: PlanComponent, canActivate: [AuthGuard] },
      { path: 'plans', component: PlansComponent, canActivate: [AuthGuard] },
      { path: 'plan-search', component: PlanSearchComponent, canActivate: [AuthGuard] },
      { path: 'plan-search/plan/:planId', component: PlanPreviewComponent },
      { path: '**', redirectTo: '/home', pathMatch: 'full' }
    ]),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    AuthService,
    AuthGuard,
    WorkoutService,
    PlanService,
    ExerciseService,
    RequestsUtilService,
    PlanSheikoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
