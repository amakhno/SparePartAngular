import { Injectable } from '@angular/core';
import { CartPosition } from './model/Cart/cart-position-model';
import { SparePartForUsers } from './model/SparePart/spare-part-for-users';
import { SparePartRest } from './model/sparepart.rest';

@Injectable()
export class Cart {
    cartPositions: CartPosition[];

    constructor(private spareRest: SparePartRest) {
        this.cartPositions = [];
    }

    addToCart(sparePartId: number) {
        this.spareRest.Get(sparePartId).subscribe(
            result => {
                const cartPosition = { price: result.price, sparePartId: sparePartId, quantity: 1 };
                this.cartPositions.push(cartPosition);
            }
        );
    }

    removeFromCart(sparePartId: number) {
        let list = this.cartPositions.filter(x=>x.sparePartId == sparePartId);
        if (list.length > 0) {
            let itemToDelete = list[0];
            this.cartPositions.splice(this.cartPositions.indexOf(itemToDelete), 1);
        }
    }

    getCost(): number {
        let sum = 0;
        for (let i = 0; i < this.cartPositions.length; i++) {
            sum += this.cartPositions[i].quantity * this.cartPositions[i].price;
        }
        return sum;
    }
}
