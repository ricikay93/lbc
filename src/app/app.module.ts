import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { ChurchesComponent } from './components/';

import { AppRoutingModule } from './routes/app-routing';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MyDatePickerModule } from 'mydatepicker';

import { HomeComponent, CircuitsComponent, CircuitAddEditComponent } from './components/';
import { LookUpService, CircuitService, PubSubService, ChurchService } from './services';
import { ChurchCouncilComponent } from './components/church-council/church-council.component';
import { ChurchDeaconComponent } from './components/church-deacon/church-deacon.component';
import { ChurchGroupsComponent } from './components/church-groups/church-groups.component';
import { ChurchPositionsComponent } from './components/church-positions/church-positions.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ChurchClassLeadersComponent } from './components/church-class-leaders/church-class-leaders.component';
import { CouncilComponent } from './components/council/council.component';
import { CircuitCouncilComponent } from './components/circuit-council/circuit-council.component';
import { VisitorsComponent } from './components/visitors/visitors.component';
import { SocialOutreachComponent } from './components/social-outreach/social-outreach.component';
import { ChurchClassesComponent } from './components/church-classes/church-classes.component';
import { VisitorAddEditComponent } from './components/visitor-add-edit/visitor-add-edit.component';
import { ChurchItemComponent } from './components/church-item/church-item.component';
import { ChurchAddEditComponent } from './components/church-add-edit/church-add-edit.component';

import { NgxMyDatePickerModule } from 'ngx-mydatepicker';



@NgModule({
  declarations: [
    AppComponent,
    ChurchesComponent,
    HomeComponent,
    CircuitsComponent,
    CircuitAddEditComponent,
    ChurchCouncilComponent,
    ChurchDeaconComponent,
    ChurchGroupsComponent,
    ChurchPositionsComponent,
    GroupsComponent,
    ChurchClassLeadersComponent,
    CouncilComponent,
    CircuitCouncilComponent,
    VisitorsComponent,
    SocialOutreachComponent,
    ChurchClassesComponent,
    VisitorAddEditComponent,
    ChurchItemComponent,
    ChurchAddEditComponent
  ],
  imports: [
    NgxMyDatePickerModule.forRoot(),
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    LookUpService,
    CircuitService,
    PubSubService,
    ChurchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
