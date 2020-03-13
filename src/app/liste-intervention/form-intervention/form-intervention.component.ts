import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {InterventionsService} from '../../interventions.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Intervention} from '../../models/intervention.model';

@Component({
  selector: 'app-form-intervention',
  templateUrl: './form-intervention.component.html',
  styleUrls: ['./form-intervention.component.scss']
})
export class FormInterventionComponent implements OnInit {

  interventionForm: FormGroup;
  id: number;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private interventionsService: InterventionsService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id == null) {
      this.id = -1;
    }
    console.log(this.id);
    this.initForm();
  }
  initForm() {
    const interv = this.interventionsService.interventions[this.id];
    this.interventionForm = this.formBuilder.group({
      libelle: [((this.id === -1) ? '' : interv.libelle)],
      description: [((this.id === -1) ? '' : interv.description)],
      nomIntervenant: [((this.id === -1) ? '' : interv.nomIntervenant)],
      lieu: [((this.id === -1) ? '' : interv.lieu)]
    });
  }

  onAddIntervention(save : number) {
    let newIntervention;

    const interv = this.interventionsService.interventions[this.id];
    if (interv != null) {
      interv.lieu = this.interventionForm.get('lieu').value;
      interv.libelle = this.interventionForm.get('libelle').value;
      interv.description = this.interventionForm.get('description').value;
      interv.nomIntervenant = this.interventionForm.get('nomIntervenant').value;

      // test si toutes les champs sont valorisées
      if (interv.lieu !== '' && interv.libelle !== '' && interv.description !== '' && interv.nomIntervenant !== '') {
        interv.etat = this.interventionsService.STATE_VALIDER;
      }
    } else {
      const libelle = this.interventionForm.get('libelle').value;
      const description = this.interventionForm.get('description').value;
      const intervenant = this.interventionForm.get('nomIntervenant').value;
      const lieu = this.interventionForm.get('lieu').value;
      const valid = (lieu !== '' && libelle !== '' && description !== '' && intervenant !== '');


      newIntervention = new Intervention(
        libelle,
        description,
        intervenant,
        lieu,
        valid ? this.interventionsService.STATE_VALIDER : this.interventionsService.STATE_BROUILLON
      );
    }


    if(save !== -1) {
      this.interventionsService.updateIntervention(interv);
    } else {
      this.interventionsService.addIntervention(newIntervention);
    }

    this.router.navigate(['/interventions']);
  }


}
