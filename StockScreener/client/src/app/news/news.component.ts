import { Component, OnInit} from '@angular/core';
import { NewsMonitorService } from '../_api/services/news-monitor.service';
import { SubscriberEntity } from '../_core/subscriber-entity';
import { News } from '../_shared/models/news';
import { ClockService } from '../_shared/clock.service';
import { AuthGuard } from '../_api/services/auth-guard.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent extends SubscriberEntity implements OnInit  {
  public news: News[] = [];
  private updateNewsTimeInSeconds = 30;
  private secondsRemainingUntilNextUpdate = 0;
  public displayedColumns = ['headline', 'source'];
  constructor(
    private clockService: ClockService,
    private newsMonitorService: NewsMonitorService,
    private auth: AuthGuard) {
      super();
   }

  public ngOnInit(): void {
    this.clockService.getClock()
    .takeUntil(this.destroyed)
    .subscribe((secondsRemaining) => this.updateTime(secondsRemaining));
    this.newsMonitorService.getNews().subscribe((news) => this.news = news);
  }

  private updateTime(seconds: number): void {
    this.secondsRemainingUntilNextUpdate = seconds;
    if (this.secondsRemainingUntilNextUpdate % this.updateNewsTimeInSeconds === 0) {
      this.updateNews();
    }
  }

  private updateNews(): void {
    if (this.auth.isLoggedIn()) {
        this.newsMonitorService.getNews().subscribe((news) => this.news = news);
    }
  }
}
