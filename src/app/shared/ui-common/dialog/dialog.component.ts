import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DialogOpt } from './dialog.service';

@Component({
  selector: 'ui-common-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatLabel,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true })
  dynamicComponent!: ViewContainerRef;
  disabledClose?: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogOpt,
    public dialog: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit() {
    this.disabledClose = this.dialog.disableClose;
    this.loadComponent();
  }

  private loadComponent() {
    this.dynamicComponent.clear();
    const componentRef = this.dynamicComponent.createComponent(
      this.data.component
    );
    componentRef.instance.inputData = this.data.inputData;
    componentRef.instance.outputData?.subscribe((res: any) =>
      this.dialog.close(res)
    );
  }
}
