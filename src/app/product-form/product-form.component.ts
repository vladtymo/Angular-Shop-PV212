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
import { CategoryModel, CreateProductModel } from '../models/product';

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

  form: FormGroup;
  categories: CategoryModel[] = [];

  constructor(
    fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productsService: ProductsService
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      imageUrl: ['', Validators.required],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      description: [null, Validators.maxLength(2000)],
      categoryId: [0, Validators.required]
    });
  }

  // onChanges(): void {
  //   this.form.get('description')?.valueChanges.subscribe(val => {
  //     this.form.setValue() = `My name is ${val}.`;
  //   });
  // }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(data => {
      console.log(data);
      this.categories = data;
    });
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

    let model = this.form.value as CreateProductModel;

    if (model.description === "")
      model.description = null; 

    console.log(model);

    this.productsService.create(model).subscribe(x => {
      this.openSnackBar("Product was created successfully.");
      this.back();
    });
  }
}
