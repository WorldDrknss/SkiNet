import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SkyNet';

  constructor(private basketService: BasketService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe({
      next: () => { console.log('loader user') },
      error: (e: any) => { console.log(e) },
      complete: () => { console.log('completed') }
    });
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe({
        next: () => { console.log('initialized basket') },
        error: (e: any) => { console.log(e) },
        complete: () => { console.log('Complete') }
      });
    }
  }
}
