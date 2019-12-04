import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {FormModalComponent} from '../form-modal/form-modal.component';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService,
              public dialog: MatDialog,
              private spinner: NgxSpinnerService,
              private notifier: NotifierService) {
  }

  columnsToDisplay = ['poolNumber', 'sender', 'notRoutedReason', 'sentDateTime', 'requestedDeliveryReportMaskText', 'deliveryReportReceivedDateTime', 'isUnicode', 'buttons'];
  messages = null;
  filterText = '';
  tableEmpty = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.reloadMessages();
  }

  reloadMessages(): void {
    this.spinner.show();
    this.apiService.get().subscribe((data: any[]) => {
      this.tableEmpty = data.length === 0;
      this.messages = new MatTableDataSource(data);
      this.messages.sort = this.sort;
      this.applyFilter(this.filterText);
      this.spinner.hide();
    });
  }

  newMessage() {
    this.editMessage({});
  }

  editMessage(message): void {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '500px',
      data: Object.assign({}, message),
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.reloadMessages();
        this.notifier.show({
          type: 'success',
          message: 'Message saved!'
        });
      } else if (result === 'error') {
        this.notifier.show({
          type: 'error',
          message: 'Error saving message!'
        });
      }
    });
  }

  deleteMessage(message): void {
    const messageText = `Are you sure you want to delete message?`;
    const dialogData = new ConfirmDialogModel('Delete Message?', messageText);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (!dialogResult) {
        return;
      }
      this.apiService.delete(message).subscribe(
        val => {
          this.reloadMessages();
          this.notifier.show({
            type: 'success',
            message: 'Message deleted!'
          });
        },
        response => {
          this.notifier.show({
            type: 'error',
            message: 'Delete message failed!'
          });
        },
        () => {
        }
      );

    });
  }

  importFileChangeListener($event: any): void {
    this.spinner.show();
    let file = $event.target.files[0];

    if (!file.name.endsWith('.csv')) {
      return;
    }
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = async (data) => {
      let csvData = reader.result;
      if (typeof csvData !== 'string') {
        return;
      }
      let rows = csvData.split(/\r\n|\n/);
      let headersRow = rows[0].split(',');
      for (let i = 1; i < rows.length; i++) {
        let row = rows[i].split(',');
        if (row.length != headersRow.length) {
          continue;
        }
        let message = {};
        for (let j = 0; j < row.length; j++) {
          message[headersRow[j]] = row[j];
        }
        this.apiService.importMessage(message).subscribe(
          val => {
          },
          response => {
            this.notifier.show({
              type: 'error',
              message: 'Error importing ' + message['messageUUID'] + '!'
            });
          },
          () => {
          }
        );

        // Local JSON server would break without this pause
        await this.delay(100);
      }
      this.reloadMessages();
      this.notifier.show({
        type: 'success',
        message: 'Import Done!'
      });
    };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  export(): void {
    let exportData = JSON.stringify(this.messages.filteredData);
    let blob = new Blob(['\ufeff' + exportData], {
      type: 'application/json;charset=utf-8;'
    });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    console.log(url);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

    //if Safari open in new window to save file with random filename.
    if (isSafariBrowser) {
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', 'messages.json');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  applyFilter(filterValue: string) {
    this.messages.filter = filterValue.trim().toLowerCase();
  }

}

