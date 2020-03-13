import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Intervention} from './models/intervention.model';

@Injectable({
  providedIn: 'root'
})
export class InterventionsService {

  STATE_BROUILLON = 0;
  STATE_VALIDER = 1;
  STATE_TERMINER = 2;

  interventions: Intervention[] = [{
    libelle: 'nid de poule',
    description: 'un enorme trou au milieu de la route',
    nomIntervenant: 'Jorge',
    lieu: 'Nantes route de Clisson',
    etat: 1
  },
    {
      libelle: 'feux rouge cassé',
      description: 'pose des problème de circulation',
      nomIntervenant: 'EDF',
      lieu: 'Rezé',
      etat: 2
    }, {
      libelle: 'Chaudière en panne',
      description: 'mauvais fonctionnement de l\'appareil',
      nomIntervenant: 'Jean Cho',
      lieu: '',
      etat: 0
    }
  ];
  interventionsSubject = new Subject <Intervention[]>();

  constructor() { }

  emitIntervention() {
    this.interventionsSubject.next(this.interventions.slice());
  }
  updateIntervention(intervention: Intervention) {
    const interventionIndextoModify = this.interventions.findIndex(
      (interventionEl) => {
        if (interventionEl === intervention) {
          return true;
        }
      }
    );
    this.interventions[interventionIndextoModify] = intervention;
    this.emitIntervention();
  }
  addIntervention (newIntervention: Intervention) {
    this.interventions.push(newIntervention);
    this.emitIntervention();
  }

  deleteIntervention(intervention: Intervention) {
    const interventionIndextoDelete = this.interventions.findIndex(
      (interventionEl) => {
        if (interventionEl === intervention) {
          return true;
        }
      }
    );
    this.interventions.splice(interventionIndextoDelete, 1);
    this.emitIntervention();
  }

}
