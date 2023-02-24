import { Component } from '@angular/core';
// import { ViewWillEnter } from '@ionic/angular';
import { Subscription, interval } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements ViewWillEnter {
  
  private subscription?: Subscription;
  private secondsCounter = 0;
  private timerON: boolean = false;
  clock = '00:00:00';
  userName!: string | null;
  zone!: string | null;

  constructor() {}
  ionViewWillEnter(): void {
    this.setValue();
  }

  private timelaps(secondCount: number): string {
    const secNum = parseInt(secondCount.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - hours * 3600) / 60);
    const seconds = secNum - hours * 3600 - minutes * 60;
    const hoursString = hours < 10 ? '0' + hours : hours.toString();
    const minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
    const secondsString = seconds < 10 ? '0' + seconds : seconds.toString();
    this.clock = hoursString + ':' + minutesString + ':' + secondsString;
    return this.clock;
  }

  public startTimer() {
    this.timerON = true;
    if (!this.subscription) {
      this.subscription = interval(1000).subscribe(() => {
        this.secondsCounter++;
        this.clock = this.timelaps(this.secondsCounter);
      });
    }
  }

  public pauseTimer() {
    this.timerON = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  public resetTimer() {
    this.timerON = false;
    this.subscription?.unsubscribe();
    this.subscription = undefined;
    this.secondsCounter = 0;
    this.clock = '00:00:00';
  }

  private setValue = () => {
    const setName = async () => {
      const { value } = await Preferences.get({ key: 'userName' });
      this.userName = value;
    };
    setName();

    const setZone = async () => {
      const { value } = await Preferences.get({ key: 'totalZones' });
      this.zone = value;
    };
    setZone();
  };
}

// ngOnDestroy() {
//   this.subscription?.unsubscribe();
// }
