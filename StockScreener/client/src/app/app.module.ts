import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { StockMonitorComponent } from './stock-monitor/stock-monitor.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { SectorsComponent } from './sectors/sectors.component';
import { ChartsModule } from 'ng2-charts';

// Third party
import { PopoverModule } from 'ngx-popover';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

// Services
import { ClockService } from './_shared/clock.service';
import { StockMonitorService } from './_api/services/stock-monitor.service';
import { SectorMonitorService } from './_api/services/sector-monitor.service';
import { StockComponentSharedService } from './_shared/stock-component-shared.service';

// Customization for third party
import { CustomToastOptions } from './_core/custom-toast-message-options';
import { ToastOptions } from 'ng2-toastr';

import { AppComponent } from './app.component';
import { ChartComponent } from './_shared/chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    StockMonitorComponent,
    StockDetailComponent,
    SectorsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    PopoverModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ChartsModule
  ],
  providers: [{provide: ToastOptions, useClass: CustomToastOptions},
     ClockService, StockMonitorService, StockComponentSharedService, SectorMonitorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
