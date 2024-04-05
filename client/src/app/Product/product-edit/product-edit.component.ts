import { CommonModule } from '@angular/common';
// import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  // MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  // MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
// import { ProductService } from '../product.service';
// import { EditProductData, Product } from '../product.model';

// @Component({
//   selector: 'app-product-edit',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatFormFieldModule,
//     MatInputModule,
//     FormsModule,
//     MatButtonModule,
//     MatDialogActions,
//     MatDialogClose,
//     MatDialogContent,
//     MatDialogTitle,
//   ],
//   templateUrl: './product-edit.component.html',
//   styleUrl: './product-edit.component.css',
// })
// export class ProductEditComponent implements OnInit {
//   productByIdData: EditProductData = {
//     data: {
//       _id: '',
//       name: '',
//       description: '',
//       image: '',
//       price: 0,
//       stock: 0,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   };

//   constructor(
//     public dialogRef: MatDialogRef<ProductEditComponent>,
//     private productService: ProductService,
//     @Inject(MAT_DIALOG_DATA) public data: { productId: string }
//   ) {}

//   ngOnInit(): void {
//     this.productService
//       ?.getProductById(this?.data?.productId)
//       .subscribe((res) => {
//         this.productByIdData = res;
//       });
//   }
//   onConfirm() {
//     this.productService
//       .updateProduct(this.data.productId, this.productByIdData)
//       .subscribe(() => {
//         this.productService.getAllProduct();
//         this.dialogRef.close();
//       });
//   }
// }

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { EditProductData } from '../product.model';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
})
export class ProductEditComponent {
  productByIdData!: any;

  constructor(
    public dialogRef: MatDialogRef<ProductEditComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string }
  ) {}

  ngOnInit(): void {
    this.productService.getProductById(this.data.productId).subscribe((res) => {
      this.productByIdData = res;
    });
  }

  onConfirm(): void {
    this.productService
      .updateProduct(this.data.productId, this.productByIdData.data)
      .subscribe((res) => {
        console.log(res);
        this.dialogRef.close();
        this.productService.getAllProduct().subscribe((res) => {
          return res;
        });
      });
  }
}
