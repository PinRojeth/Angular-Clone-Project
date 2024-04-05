import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [MatCardModule, RatingModule, FormsModule],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  formatDate: string = '';
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['productId'];
      this.productService.getProductById(id).subscribe((res) => {
        console.log(res);
        this.product = res;
        this.formatDate = new Date(
          this.product.data.createdAt
        ).toLocaleDateString();
      });
    });
  }
}
