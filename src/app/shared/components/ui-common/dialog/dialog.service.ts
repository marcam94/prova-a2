import { Injectable, Type } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

export interface DialogOpt {
  title: string;
  component: Type<any>;
  inputData?: [{ name: string; value: any }];
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openDialog(
    opts: DialogOpt,
    config: {
      disableClose?: boolean;
      height?: string;
      width?: string;
    } = {}
  ): MatDialogRef<DialogComponent> {
    const dialogConf: MatDialogConfig<DialogOpt> = {
      data: opts,
      ...config,
    };
    return this.dialog.open(DialogComponent, dialogConf);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
