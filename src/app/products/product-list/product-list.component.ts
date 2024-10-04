import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, model, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiProduct, ProductDto, ProductsResponse } from '../product';
import { ProductsService } from '../../services/products.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  productName: string;
  productId: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'image', 'name', 'category', 'price', 'discount', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<ProductDto>([]);

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.productsService.getAll()
      .subscribe(data => this.dataSource.data = data
      )
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDeleteDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: {
        productName: name,
        productId: id
      },
    });

    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.productsService.delete(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(x => x.id !== id);
          this.openSnackBar();
        });
      }
    });
  }

  openSnackBar() {
    this.snackBar.open('Product deleted successfuly', 'Dismiss', {
      horizontalPosition: "center",
      verticalPosition: "top",
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
  readonly id = model(this.data.productId);
}