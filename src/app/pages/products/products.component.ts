import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CPU } from '../../models/cpu.model';
import { GPU } from '../../models/gpu.model';
import { BuildService } from '../../services/build.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  minPrice = 0;
  maxPrice = 5000;
  sliderValue = 2500;

  products: Product[] = [
    new CPU(1, 'Ryzen 7 8700G', 'AMD Ryzen 8000G Series', 999.99, true, 'images/amd1.webp'),
    new CPU(2, 'Ryzen 5 8700G', 'AMD Ryzen 8000G Series', 999.99, true, 'assets/images/amd2.webp'),
    new CPU(3, 'Intel Core i9', 'Intel Core i9-14900K', 799.99, true, 'assets/images/intel1.webp'),
    new CPU(4, 'Intel Core i7', 'Intel Core i7-14700K', 699.99, true, 'assets/images/intel2.webp'),
    new GPU(5, 'GeForce RTX 5090', 'Next-gen NVIDIA Blackwell, GeForce RTX™ 50 Series GPUs.', 1999, true, 'assets/images/rtx5090.webp'),
    new GPU(6, 'GeForce RTX 5070', 'Game-changing capabilities to gamers and creators.', 1699, true, 'assets/images/rtx5070.webp'),
    new GPU(7, 'AMD Radeon RX 9060', 'Supercharged with AI. Ultra-fast gaming.', 1499, true, 'assets/images/rx9060.webp'),
    new GPU(8, 'GeForce RTX 7700', 'Advanced visuals and features, lightning fast.', 1299, true, 'assets/images/rtx7700.webp'),
  ];

  constructor(private buildService: BuildService) { }

  ngOnInit(): void {
    console.log(this.products);
  }

  addToBuild(product: Product) {
    this.buildService.addProduct(product);
    console.log('Added to build:', product);
  }
}

