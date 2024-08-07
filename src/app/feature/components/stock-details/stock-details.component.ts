import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import { Stock } from '../../../models/Stock';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, MatButtonModule],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.css',
})
export class StockDetailsComponent implements OnChanges {
  @Input() stockTicker: string;
  stockDetails: Stock;

  constructor(private stockService: StocksService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.stockTicker != '' && this.stockTicker != undefined) {
      this.getStockDetails(this.stockTicker);
    }
  }
  getStockDetails(stockTickerSymbol: string) {
    this.stockService.getStockDetails(stockTickerSymbol).subscribe((res) => {
      this.stockDetails = res;
    });
  }

  buyStock() {
   this.router.navigate(['/stock/' + this.stockTicker + '/buy']);
  }
}
