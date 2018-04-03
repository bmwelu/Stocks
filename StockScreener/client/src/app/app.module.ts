import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StockMonitorComponent } from './components/stock-monitor/stock-monitor.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { ChartsModule } from 'ng2-charts';

// Third party
import { PopoverModule } from 'ngx-popover';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

// Services
import { ClockService } from './services/clock.service';
import { StockMonitorService } from './services/stock-monitor.service';
import { StockComponentSharedService } from './services/stock-component-shared.service';

// Customization for third party
import { CustomToastOptions } from './custom-options';
import {ToastOptions} from 'ng2-toastr';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    StockMonitorComponent,
    StockDetailComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    PopoverModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ChartsModule
  ],
  providers: [{provide: ToastOptions, useClass: CustomToastOptions}, ClockService, StockMonitorService, StockComponentSharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
