import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // 必须导入这两个
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  items: Item[] = [
    { id: 1, name: 'Vinyl', category: 'Music', price: 30.00, inStock: true },
    { id: 2, name: 'Book', category: 'Education', price: 15.99, inStock: true }
  ];

  newItem = { name: '', category: '', price: 0 };

  addItem() {
    if (!this.newItem.name || !this.newItem.category || this.newItem.price <= 0) {
      alert('Please fill all fields correctly!');
      return;
    }
    const newId = Math.max(...this.items.map(i => i.id), 0) + 1;
    this.items.push({ ...this.newItem, id: newId, inStock: true });
    this.newItem = { name: '', category: '', price: 0 }; // 清空
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}