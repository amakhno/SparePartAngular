import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart.service';
import { CartPosition } from '../model/Cart/cart-position-model';
import { forEach } from '@angular/router/src/utils/collection';
import { CartPositionFull } from '../model/Cart/cart-position-full-model';
import { SparePartRest } from '../model/sparepart.rest';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartPositions: CartPositionFull[] = [];

  date: Date;

  constructor(private Cart: Cart, private spareRepo: SparePartRest) { }

  ngOnInit() {
    this.Cart.cartPositions.forEach(element => {
      this.spareRepo.Get(element.sparePartId).subscribe((data) => {
        let newPosition = new CartPositionFull();
        newPosition.price = data.price;
        newPosition.quantity = element.quantity;
        newPosition.sparePart = data;
        this.cartPositions.push(newPosition);
      });
    });
  }

  getTotal() {
    return this.cartPositions.map((elem) => {
      return elem.price * elem.quantity
    }).reduce((sum, current) => sum + current);
  }

  Send(sendForm: NgForm) {
    alert("Ok");
  }

  removeFromCart(sparePartId: number) {
    this.Cart.removeFromCart(sparePartId);
    this.cartPositions = this.cartPositions.filter(x => x.sparePart.id != sparePartId);
  }

  checkAbove(sparePartId: number, event: any) {
    let number: number = +event.target.value;
    console.log(Number.isInteger(number));
    let newValue = number;
    if (!Number.isInteger(number)) {
      newValue = Math.trunc(number);
    }
    if (newValue < 1) {
      newValue = 1;
    }
    let index = this.cartPositions.indexOf(this.cartPositions.find(x => x.sparePart.id == sparePartId));
    this.cartPositions[index].quantity = newValue;
  }
}
