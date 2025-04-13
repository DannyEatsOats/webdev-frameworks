import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductType } from '../../models/product-type';
import { CPU } from '../../models/cpu.model';
import { GPU } from '../../models/gpu.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],  // Import CommonModule
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  minPrice = 0;
  maxPrice = 5000;
  sliderValue = 2500;

  // Example products array
  products: Product[] = [
    new CPU(1, 'Ryzen 7 8700G', 'AMD Ryzen 8000G Series', 999.99, true, 'images/amd1.webp'),
    new CPU(2, 'Ryzen 5 8700G', 'AMD Ryzen 8000G Series', 999.99, true, 'url'),
    new CPU(3, 'Intel Core i9', 'Intel Core i7-14700K', 15, true, 'url'),
    new CPU(4, 'Intel Core i7', 'Intel Core i7-14700K', 10, true, 'url'),
    new GPU(5, 'GeForce RTX 5090', 'Powered by NVIDIA Blackwell, GeForce RTX™ 50 Series GPUs bring game-changing capabilities to gamers and creators.', 1999, true, 'url'),
    new GPU(6, 'GeForce RTX 5070', 'Powered by NVIDIA Blackwell, GeForce RTX™ 50 Series GPUs bring game-changing capabilities to gamers and creators.', 1999, true, 'url'),
    new GPU(7, 'AMD Radeon RX 9060', 'Delivering all you need for ultra-fast gaming, with advanced visuals and features - supercharged with AI.', 1999, true, 'url'),
    new GPU(8, 'GeForce RTX 7700', 'Delivering all you need for ultra-fast gaming, with advanced visuals and features - supercharged with AI.', 1999, true, 'url'),
  ];

  ngOnInit() {
    console.log(this.products);
  }
}

