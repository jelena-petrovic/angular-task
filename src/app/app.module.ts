import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {AngularMaterialModule} from './angular-material.module';
import {FormModalComponent} from './form-modal/form-modal.component';
import {FormsModule} from '@angular/forms';
import {SenderValidatorDirective} from './sender-validator.directive';
import {NgxSpinnerModule} from 'ngx-spinner';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {NotifierModule} from 'angular-notifier';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormModalComponent,
    SenderValidatorDirective,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    NgxSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NotifierModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FormModalComponent, ConfirmDialogComponent]
})
export class AppModule {
}
