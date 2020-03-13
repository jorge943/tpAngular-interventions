import {Component, OnDestroy, OnInit} from '@angular/core';
import {Intervention} from '../models/intervention.model';
import {Subscription} from 'rxjs';
import {InterventionsService} from '../interventions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-liste-intervention',
  templateUrl: './liste-intervention.component.html',
  styleUrls: ['./liste-intervention.component.scss']
})
export class ListeInterventionComponent implements OnInit, OnDestroy {

  interventions: Intervention[];
  interventionsSubscription: Subscription;

  constructor(private interventionsService: InterventionsService, private router: Router) {
  }

  ngOnInit() {
    this.interventionsSubscription = this.interventionsService.interventionsSubject.subscribe(
      (interventions: Intervention[]) => {
        this.interventions = interventions;
      }
    );
    this.interventionsService.emitIntervention();
  }

  getColor(id: number) {
    let clr: string;
    if (this.interventions[id].etat === this.interventionsService.STATE_BROUILLON) {
      clr = 'ALICEBLUE';
    } else if (this.interventions[id].etat === this.interventionsService.STATE_VALIDER) {
      clr = 'LIGHTSTEELBLUE';
    } else if (this.interventions[id].etat === this.interventionsService.STATE_TERMINER) {
      clr = 'LIGHTGREEN';
    } else {
      clr = 'ffffff';
    }
    return clr;
  }

  onNewIntervention() {
    this.router.navigate(['/interventions', 'ajout']);
  }

  onDeleteIntervention(intervention: Intervention) {
    this.interventionsService.deleteIntervention(intervention);
  }

  onUpdateIntervention(intervention: Intervention) {
    const id = this.interventions.findIndex(
      (interventionEl) => {
        if (interventionEl === intervention) {
          return true;
        }
      }
    );
    this.router.navigate(['/interventions', 'modif', id]);
  }

  onViewIntervention(id: number) {
    this.router.navigate(['/interventions', 'description', id]);
  }

  ngOnDestroy() {
    this.interventionsSubscription.unsubscribe();
  }

}
