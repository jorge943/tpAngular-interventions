import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListeInterventionComponent } from './liste-intervention/liste-intervention.component';
import { InterventionComponent } from './liste-intervention/intervention/intervention.component';
import { FormInterventionComponent } from './liste-intervention/form-intervention/form-intervention.component';
import { HeaderComponent } from './header/header.component';
import {InterventionsService} from './interventions.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: 'interventions', component: ListeInterventionComponent},
  {path: 'interventions/ajout', component: FormInterventionComponent},
  {path: 'interventions/modif/:id', component: FormInterventionComponent},
  {path: 'interventions/description/:id', component: InterventionComponent},
  {path: '', redirectTo: 'interventions', pathMatch: 'full'},
  {path: '**', redirectTo: 'interventions'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListeInterventionComponent,
    InterventionComponent,
    FormInterventionComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    InterventionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
