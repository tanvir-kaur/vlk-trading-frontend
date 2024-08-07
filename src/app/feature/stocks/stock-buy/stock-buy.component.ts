import { Component, DestroyRef, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from '../../../models/Stock';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { PortfolioService } from '../../portfolio/portfolio.service';
import { Portfolio } from '../../../models/Portfolio';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MessageComponent } from '../../../shared/components/message/message.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-stock-buy',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    MatDividerModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './stock-buy.component.html',
  styleUrl: './stock-buy.component.css',
})
export class StockBuyComponent implements OnInit {
  stockTicker: string;
  stockDetails: Stock;
  portfolioDetails: Portfolio;
  orderUnits: number = 0;
  totalAmount: number = 0;

  constructor(
    private stockService: StocksService,
    private portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.stockTicker = this.route.snapshot.paramMap.get('name');
    this.getStockDetails(this.stockTicker);
    this.getPortfolioDetails();
  }
  getStockDetails(stockTickerSymbol: string) {
    this.stockService
      .getStockDetails(stockTickerSymbol)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.stockDetails = res;
      });
  }

  getPortfolioDetails() {
    this.portfolioService
      .getUserPortfolio()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.portfolioDetails = response;
      });
  }

  confirmOrder() {
    let message = '';
    let isError = false;
    this.calculateTotalAmount();
    if (this.orderUnits <= 0) {
      isError = true;
      message = 'Order Units is required';
    } else if (this.portfolioDetails.balance < this.totalAmount) {
      isError = true;
      message = 'Insufficient funds';
    } else {
      message = 'Are you sure you want to place the order?';
    }
    this.openDialog(message, isError);
  }

  placeOrder() {
    this.stockService
      .buyStock(this.orderUnits, this.stockDetails.tickerSymbol)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['/portfolio']);
          this.openSnackBar(
            'Order placed successfully. Pending for execution',
            ''
          );
        } else {
          this.openDialog(res.message, !res.isSuccess);
        }
      });
  }

  openDialog(message: string, isError: boolean) {
    const dialogRef = this.dialog.open(MessageComponent, {
      data: {
        isError: isError,
        message: message,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        console.log('The dialog was closed');
        if (result !== undefined && result) {
          this.placeOrder();
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  calculateTotalAmount() {
    let transactionMoney = (this.totalAmount =
      this.stockDetails.price * this.orderUnits);
    let commissionAmount =
      transactionMoney * (this.portfolioDetails.commissionRate / 100);
    this.totalAmount = transactionMoney + commissionAmount;
  }
}
