import { Component, DestroyRef, OnInit } from '@angular/core';
import { Portfolio } from '../../models/Portfolio';
import { PortfolioService } from './portfolio.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [MatProgressSpinnerModule, CurrencyPipe, MatDividerModule, DatePipe],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements OnInit {
  portfolioData: Portfolio;
  isLoading = true;
  isPortfolioEmpty = true;

  constructor(
    private portfolioService: PortfolioService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.getPortfolioDetails();
  }

  getPortfolioDetails() {
    this.portfolioService
      .getUserPortfolio()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.portfolioData = response;
        this.isPortfolioEmpty = this.portfolioData != null ? false : true;
        this.isLoading = false;
      });
  }
}
