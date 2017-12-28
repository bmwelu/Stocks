import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { StockMonitorComponent } from './components/stock-monitor/stock-monitor.component';

//Third party
import { PopoverModule } from 'ngx-popover';

//Services
import { ClockService } from './services/clock.service';
import { StockMonitorService } from './services/stock-monitor.service';

//Pipes
import { CompanyNameFilterPipe } from './pipes/CompanyNameFilterPipe';
import { CompanySortAlphabeticalPipe } from './pipes/CompanySortAlphabeticalPipe';

@NgModule({
  declarations: [
    AppComponent,
    StockMonitorComponent,
    CompanyNameFilterPipe,
    CompanySortAlphabeticalPipe
  ],
  imports: [
    BrowserModule, 
    PopoverModule,
    FormsModule,
    HttpModule
  ],
  providers: [ClockService, StockMonitorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
