import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {

  constructor(private apiService: ApiService,
              public dialogRef: MatDialogRef<FormModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.data = data;
  }

  ngOnInit() {
  }

  save() {
    this.apiService.save(this.data).subscribe(
      val => {
        this.dialogRef.close('success');
      },
      response => {
        this.dialogRef.close('error');
      },
      () => {
      }
    );
  }
}



