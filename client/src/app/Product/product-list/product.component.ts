import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ProductService } from '../product.service';
import { EditProductData, Product, Products } from '../product.model';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RatingModule,
    FormsModule,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  displayedColumns: string[] = [
    'ID',
    'ProductName',
    'Price',
    'Stock',
    'Rating',
    'Mode',
  ];
  dataSource = new MatTableDataSource<Product>(this.products);
  editData!: EditProductData;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.productService.getAllProduct().subscribe((res: Products) => {
      console.log(res.data);
      this.products = res.data;
      this.dataSource.data = this.products;
    });
  }

  onEditProduct(productId: string) {
    console.log(productId);

    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '600px',
      data: { productId },
    });
    // Listen for the afterClosed event
    dialogRef.afterClosed().subscribe((result) => {
      // Reload the data upon closing the dialog
      this.loadAllData();
    });
  }

  onDeleteProduct(productId: string) {
    this.productService
      .deleteProduct(productId)
      .pipe(
        switchMap(() => {
          return this.productService.getAllProduct();
        })
      )
      .subscribe((res: Products) => {
        this.products = res.data;
        this.dataSource.data = this.products;
      });
  }

  ngOnDestroy(): void {
    this.loadAllData();
  }
}
