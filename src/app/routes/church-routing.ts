
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChurchesComponent, CircuitsComponent, CircuitAddEditComponent, ChurchCouncilComponent } from '../components/';
import { ChurchDeaconComponent } from '../components/church-deacon/church-deacon.component';
import { ChurchClassLeadersComponent } from '../components/church-class-leaders/church-class-leaders.component';
import { CouncilComponent } from '../components/council/council.component';
import { CircuitCouncilComponent } from '../components/circuit-council/circuit-council.component';
import { GroupsComponent } from '../components/groups/groups.component';
import { VisitorsComponent } from '../components/visitors/visitors.component';
import { SocialOutreachComponent } from '../components/social-outreach/social-outreach.component';
import { ChurchClassesComponent } from '../components/church-classes/church-classes.component';
import { ChurchPositionsComponent } from '../components/church-positions/church-positions.component';
import { ChurchItemComponent } from '../components/church-item/church-item.component';
import { ChurchAddEditComponent } from '../components/church-add-edit/church-add-edit.component';
import { VisitorAddEditComponent } from '../components/visitor-add-edit/visitor-add-edit.component';
import { VisitorItemComponent } from '../components/visitor-item/visitor-item.component';

const circuitChildrenRoutes: Routes = [
    { path: 'add', component: CircuitAddEditComponent },
    { path: 'edit/:id', component: CircuitAddEditComponent }
];

const churchChildrenRoutes: Routes = [
    { path: 'add', component: ChurchAddEditComponent, outlet: 'task' },
    { path: 'edit/:id', component: ChurchAddEditComponent, outlet: 'task' },
    { path: 'view/:id', component: ChurchItemComponent }
];

const councilChildrenRoutes: Routes = [
    { path: 'churchCouncil', component: ChurchCouncilComponent },
    { path: 'circuitCouncil', component: CircuitCouncilComponent },
    { path: 'deacons', component: ChurchDeaconComponent },
    { path: 'classLeaders', component: ChurchClassLeadersComponent }
];

const groupChildrenRoutes: Routes = [
    { path: 'socialOutreach', component: SocialOutreachComponent },
    { path: 'classes', component: ChurchClassesComponent },
    { path: 'positions', component: ChurchPositionsComponent }
];

const visitorChildrenRoutes: Routes = [
    { path: 'add', component: VisitorAddEditComponent, outlet: 'task' },
    { path: 'edit/:id', component:  VisitorAddEditComponent, outlet: 'task' },
    { path: 'view/:id', component: VisitorItemComponent}
];

export const menuRoutes: Routes = [
    { path: '', redirectTo: 'churches', pathMatch: 'full' },
    { path: 'circuits', component: CircuitsComponent, children: circuitChildrenRoutes },
    { path: 'circuit/churches', component: ChurchesComponent, children: churchChildrenRoutes },
    { path: 'council', component: CouncilComponent, children: councilChildrenRoutes },
    { path: 'groups', component: GroupsComponent, children: groupChildrenRoutes },
    //     { path: 'dashboard', component: DashboardComponent },
    //     { path: 'council', component: CouncilComponent, children: councilChildren },
    //     { path: 'members', component: MembersComponent, children: memberChildren },
    { path: 'visitors', component: VisitorsComponent, children: visitorChildrenRoutes }
];
