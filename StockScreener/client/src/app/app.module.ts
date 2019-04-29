import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// Custom Components
import { StockMonitorComponent } from './stock-monitor/stock-monitor.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { SectorsComponent } from './sectors/sectors.component';
import { NewsComponent } from './news/news.component';
import { ChartComponent } from './_shared/chart/chart.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Third party
import { PopoverModule } from 'ngx-popover';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ChartsModule } from 'ng2-charts';
import { CustomToastOptions } from './_core/custom-toast-message-options';
import { ToastOptions } from 'ng2-toastr';
import { JwtHelper } from 'angular2-jwt';

// Services
import { ClockService } from './_shared/clock.service';
import { StockMonitorService } from './_api/services/stock-monitor.service';
import { SectorMonitorService } from './_api/services/sector-monitor.service';
import { NewsMonitorService } from './_api/services/news-monitor.service';
import { StockComponentSharedService } from './_shared/stock-component-shared.service';
import { LoginService } from './_api/services/login.service';
import { AuthGuard } from './_api/services/auth-guard.service';

// Angular Materials
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    StockMonitorComponent,
    StockDetailComponent,
    SectorsComponent,
    NewsComponent,
    ChartComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    PopoverModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ChartsModule,
    MatTableModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    RouterModule.forRoot([
        { path: '', component: AppComponent, pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'login', component: LoginComponent }
      ])
  ],
  providers: [{provide: ToastOptions, useClass: CustomToastOptions},
     ClockService, StockMonitorService, StockComponentSharedService,
     SectorMonitorService, NewsMonitorService, LoginService,
     JwtHelper, AuthGuard],
  bootstrap: [DashboardComponent]
})
export class AppModule { }
