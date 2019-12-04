import {NgModule} from '@angular/core';
import {
  MatTableModule,
  MatToolbarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatIconModule,
  MatRadioModule,
  MatSortModule
} from '@angular/material';

@NgModule({
  imports: [MatTableModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatIconModule, MatRadioModule, MatSortModule],
  exports: [MatTableModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatIconModule, MatRadioModule, MatSortModule]
})

export class AngularMaterialModule {
}
