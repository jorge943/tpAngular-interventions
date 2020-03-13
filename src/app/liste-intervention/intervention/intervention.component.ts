import { Component, OnInit } from '@angular/core';
import {Intervention} from '../../models/intervention.model';
import {ActivatedRoute, Router} from '@angular/router';
import {InterventionsService} from '../../interventions.service';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.scss']
})
export class InterventionComponent implements OnInit {

  intervention: Intervention;
  id: number;
  constructor(private route: ActivatedRoute,
              private interventionsService: InterventionsService,
              private router: Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.intervention = this.interventionsService.interventions[+this.id];

  }

  onBack() {
    this.router.navigate(['/interventions']);
  }

}
