import { Component, OnInit} from '@angular/core';
import { SectorMonitorService } from '../_api/services/sector-monitor.service';
import { SubscriberEntity } from '../_core/subscriber-entity';
import { Sector } from '../_shared/models/sector';
import { ClockService } from '../_shared/clock.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html'
})

export class SectorsComponent extends SubscriberEntity implements OnInit  {
  public sectors: Sector[] = [];
  private updateSectorsTimeInSeconds = 30;
  private secondsRemainingUntilNextUpdate = 0;
  public displayedColumns = ['sectorName', 'percentChange'];
  constructor(
    private clockService: ClockService,
    private sectorMonitorService: SectorMonitorService) {
      super();

   }

  public ngOnInit(): void {
    this.clockService.getClock()
    .takeUntil(this.destroyed)
    .subscribe((secondsRemaining) => this.updateTime(secondsRemaining));
    this.sectorMonitorService.getSectorInfo().subscribe((sectors) => this.sectors = sectors);
  }

  private updateTime(seconds: number): void {
    this.secondsRemainingUntilNextUpdate = seconds;
    if (this.secondsRemainingUntilNextUpdate % this.updateSectorsTimeInSeconds === 0) {
      this.updateSectors();
    }
  }

  private updateSectors(): void {
    this.sectorMonitorService.getSectorInfo().subscribe((sectors) => this.sectors = sectors);
  }
}
