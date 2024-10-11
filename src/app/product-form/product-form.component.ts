import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../services/products.service';
import { CategoryModel, CreateProductModel, EditProductModel, ProductDto } from '../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  product: ProductDto | null = null;
  editMode: boolean = false;
  form: FormGroup;
  categories: CategoryModel[] = [];

  constructor(
    fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      id: [0],
      name: ['', Validators.required],
      price: [0, Validators.required],
      imageUrl: ['', Validators.required],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      description: [null, Validators.maxLength(2000)],
      categoryId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(data => this.categories = data);

    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      this.editMode = true;

      this.productsService.get(productId).subscribe(data => {
        this.product = data;
        this.form.patchValue(this.product);
        this.form.controls["categoryId"].setValue(this.product.categoryId.toString());
      });
    }
  }

  back() {
    history.back();
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, "OK", {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  submit() {
    if (!this.form.valid) {
      this.openSnackBar("Invalid data.");
      return;
    }

    let model = this.form.value;

    if (model.description === "")
      model.description = null;

    console.log(model);

    if (this.editMode) {
      console.log(model as EditProductModel);
      
      this.productsService.edit(model as EditProductModel).subscribe(x => {
        this.openSnackBar("Product was updated successfully.");
        this.back();
      });
    }
    else {
      console.log(model as CreateProductModel);
      
      this.productsService.create(model as CreateProductModel).subscribe(x => {
        this.openSnackBar("Product was created successfully.");
        this.back();
      });
    }
  }
}
