// scan-history.component.ts

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-history',
  templateUrl: './scan-history.component.html',
  styleUrls: ['./scan-history.component.scss'],
})
export class ScanHistoryComponent implements OnInit {
  @Input() profesorInfo: any;
  @Input() asistencia: any[];

  constructor() {}

  ngOnInit() {}
}
