import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profiles.service';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[ProfilesService]
})
export class RegisterComponent implements OnInit {
  model:any = {};
  loading = false;

  constructor(private profileService:ProfilesService,
              private router:Router,
              private alertService: AlertService) {
  }

  ngOnInit() {

  }

  register() {
    this.loading = true;
    // myid indicates detailed profile has not been created
    this.model.myid = 0;
    console.log("### RegisterComp: register(), model:", this.model);
    this.profileService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }
}
