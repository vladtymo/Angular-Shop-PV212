import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiProduct, ProductsResponse } from '../product';
import { ProductsService } from '../../services/products.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  productName: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  displayedColumns: string[] = ['Id', 'Name', 'Category', 'Price', 'Rating', 'Actions'];
  dataSource: ApiProduct[] = [];

  constructor(private productsService: ProductsService, private dialog: MatDialog) {
    this.productsService.getAll()
      .subscribe(data => this.dataSource = data.products
      )
  }

  openDeleteDialog(productName: string) {

    console.log(productName);

    this.dialog.open(ConfirmDialog, {
      width: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: {
        productName: productName
      }
    });
  }
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
}