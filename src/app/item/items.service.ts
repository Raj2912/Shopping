import { Injectable } from '@angular/core';
import { Item } from './item';
import { Http, Headers } from '@angular/http';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:Http) { }

  getItems(): Promise<Item[]> {
    let headers = new Headers({
      'Content-type': 'application/json'
  });

  return this.http.get("http://localhost:3000/productDetails", {headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(err => {
          return Promise.reject(err.json().error  || 'Server error');
      });
  }

  cartArray = []

  addToCart(item: any): Observable<Item[]> {
    
    var idArray = [];

    for (var i = 0; i < this.cartArray.length; i++) {
      if (idArray.indexOf(this.cartArray[i].Id) == -1) {
        idArray.push(this.cartArray[i].Id)
      }
    }
    
    if (idArray.indexOf(item.Id) == -1) {
      console.log("item successfully got pushed to idArray", idArray);
      //item.Quantity = item.Quantity + 1;
      if(item.Quantity > 0){
        this.cartArray.push(item);
        alert(item.ProductName + " item added to cart.");
      }
    } else { 
      for (var i=0; i < this.cartArray.length; i++) {
       if (this.cartArray[i].Id == item.Id) {
        this.cartArray[i].Quantity = item.Quantity;
       }
      }
      alert(item.ProductName + " item added to cart."); 
    }

    console.log("cartArray after push", this.cartArray);
    return of(this.cartArray);
  }

  getCartList() :Observable<Item[]> {
    return of(this.cartArray)
  }
}
