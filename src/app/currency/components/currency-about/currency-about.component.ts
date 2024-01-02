import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { HistoryDataService } from '../../services/history-data.service';

import { HistoryItem } from '../../models/history-item.interface';

@Component({
  selector: 'app-currency-about',
  templateUrl: './currency-about.component.html',
  styleUrls: ['./currency-about.component.scss']
})
export class CurrencyAboutComponent {

  historyData: HistoryItem[];

  private subscription: Subscription;

  constructor(private historyDataService: HistoryDataService) {}

  ngOnInit() {
    this.subscription = this.historyDataService.getData().subscribe(historyDataList => this.historyData = historyDataList);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
