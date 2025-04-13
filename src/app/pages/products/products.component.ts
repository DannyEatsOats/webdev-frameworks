import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CPU } from '../../models/cpu.model';
import { GPU } from '../../models/gpu.model';
import { BuildService } from '../../services/build.service';
import { Motherboard } from '../../models/motherboard.model';
import { RAM } from '../../models/ram.model';
import { Case } from '../../models/case.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  minPrice = 0;
  maxPrice = 5000;
  sliderValue = 2500;

  products: Product[] = [
    new CPU(1, 'Ryzen 7 8700G', 'AMD Ryzen 8000G Series', 999.99, true, 'images/amd1.webp'),
    new CPU(2, 'Ryzen 5 8700G', 'AMD Ryzen 8000G Series', 999.99, true, 'images/amd2.webp'),
    new CPU(3, 'Intel Core i9', 'Intel Core i9-14900K', 799.99, true, 'images/intel1.webp'),
    new CPU(4, 'Intel Core i7', 'Intel Core i7-14700K', 699.99, true, 'images/intel2.webp'),
    new GPU(5, 'GeForce RTX 5090', 'Next-gen NVIDIA Blackwell, GeForce RTX™ 50 Series GPUs.', 1999, true, 'images/rtx1.webp'),
    new GPU(6, 'GeForce RTX 5070', 'Game-changing capabilities to gamers and creators.', 1699, true, 'images/rtx2.webp'),
    new GPU(7, 'AMD Radeon RX 9060', 'Supercharged with AI. Ultra-fast gaming.', 1499, true, 'images/radeon1.webp'),
    new Motherboard(
      8,
      'ASUS TUF Gaming B550-PLUS',
      'Durable motherboard with military-grade components and comprehensive cooling.',
      149.99,
      true,
      'images/motherboard1.webp',
    ),
    new RAM(
      9,
      'Corsair Vengeance LPX',
      'High-performance DDR4 memory for gaming and multitasking.',
      89.99,
      true,
      'images/ram1.webp',
    ),
    new Case(
      10,
      'NZXT H510',
      'Compact mid-tower ATX case with tempered glass side panel.',
      99.99,
      true,
      'images/case1.webp',
    )
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

