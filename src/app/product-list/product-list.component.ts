import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductDto } from '../models/product';
import { ProductsService } from '../services/products.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RouterLink } from '@angular/router';

export interface DialogData {
  productName: string;
  productId: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, RouterLink],
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

  edit(id: number) {

  }

  openDeleteDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
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