import { Component, OnInit } from '@angular/core';

import { ItemsService }  from '../item/items.service';
import { Item } from '../item/item'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  cartArray: Item[];
  total: number = 0;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.getCartList();
  }

  getCartList() :void{
    this.itemsService.getCartList()
     .subscribe(cartArray => {
       this.cartArray = cartArray;
    })
  }

  checkout(){
    for(var i=0; i < this.cartArray.length; i++){
      var tempTotal = this.cartArray[i].Price * this.cartArray[i].Quantity;
      this.total = this.total + tempTotal;
    }
    console.log("total-"+ this.total);
  }
}
