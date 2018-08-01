import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;
  n: number = 1;

  constructor(private alertService: AlertService) {
    setTimeout(() => {
      this.n = this.n + 10;
    }, 1000);
  }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => { this.message = message; });
  }

}
