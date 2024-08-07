import { Component } from '@angular/core';
import { Stock } from '../../../models/Stock';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  finalize,
  map,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { StocksService } from '../../services/stocks.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StockDetailsComponent } from '../stock-details/stock-details.component';

@Component({
  selector: 'app-ticker-search',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    StockDetailsComponent
  ],
  templateUrl: './ticker-search.component.html',
  styleUrl: './ticker-search.component.css',
})
export class TickerSearchComponent {
  stocks: Stock[] = [];
  searchForm: FormGroup;
  filteredOptions: Stock[];
  selectedStock: string;

  constructor(
    private fb: FormBuilder,
    private stockService: StocksService,
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      userInput: null,
    });
    this.getAllStocks();
  }

  getAllStocks() {
    this.stockService.getAllStocks().subscribe((res) => {
      this.stocks = res;
      this.filteredOptions = this.stocks;
    });
  }

  filterStocks() {
    this.filteredOptions = this.stocks;
    this.searchForm
      .get('userInput')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      )
      .subscribe((result) => {
        this.filteredOptions = result;
      });
  }

  private _filter(value: string): Stock[] {
    const filterValue = value.toLowerCase();

    return this.filteredOptions.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(selectedStock: string) {
    this.selectedStock = selectedStock;
  }
}
