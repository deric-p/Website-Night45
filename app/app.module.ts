import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods,FIREBASE_PROVIDERS} from 'angularfire2';
import { firebaseConfig, firebaseAuthConfig} from '../environments/firebase.config';

import { AppComponent } from './app.component';
import { ModalModule } from 'ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap'
import { TooltipModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';

//feedback
import { FeedbackService} from './Main/Components/general/feedback/feedback.service';

import { NavBarComponent} from './Main/Components/general/navbar/navbar.component';
import { ForgotPasswordComponent } from './Main/Components/authication/login/forgotpassword.component';
import { ProfileComponent } from './Main/Components/user/profile/profile.component';
import { FeedbackComponent } from './Main/Components/general/feedback/feedback.component';
import { AboutComponent } from './Main/Components/general/about/about.component';

// free version
import { VisionComponent } from './Main/Components/user/vision/vision.component';
import { GoalsComponent} from './Main/Components/user/goals/goal.component';
import { WeeklyComponent } from './Main/Components/user/goals/weekly/weekly.component';
import { LongTermComponent } from './Main/Components/user/goals/longterm/longterm.component'; 
import { YearlyComponent} from './Main/Components/user/goals/yearly/yearly.component';
import { MonthlyComponent } from './Main/Components/user/goals/monthly/monthly.componenet';
import { NightlyComponent } from './Main/Components/user/task/task.component';
import { PositivityComponent} from './Main/Components/user/achievements/positivity/positivity.component';
import { AccomplishmentsComponent } from './Main/Components/user/achievements/accomplishments/accomplishments.component';
import { AchievementsComponent} from './Main/Components/user/achievements/achievements.component';
import { CalenderComponent } from './Main/Components/user/calender/calender.component';
import { ltmodComponent } from './Main/Components/user/goals/longtermmod/ltmod.component';
import { SignupComponent} from './Main/Components/authication/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ForgotPasswordComponent,
    GoalsComponent,
    WeeklyComponent,
    LongTermComponent,
    YearlyComponent,
    MonthlyComponent,
    NightlyComponent,
    AchievementsComponent,
    AccomplishmentsComponent,
    PositivityComponent,
    CalenderComponent,
    ltmodComponent,
    SignupComponent,
    ProfileComponent,
    FeedbackComponent,
    AboutComponent,
    VisionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    DatepickerModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    TooltipModule.forRoot(),
    ChartsModule

  ],
  providers: [
    FeedbackService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
