import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { GetResult, Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { stringify } from 'querystring';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements ViewWillEnter{

  formController!: FormGroup;
  defaultTotalZones!:  string | null |GetResult;
  defaultZoneChanges! : string | null;
  defaultUserName! :  string | GetResult ;

  constructor( private formBuilder: FormBuilder, private router: Router) {
    this.ionViewWillEnter();
    this.defaultUserName = 'mon petit marco';

  }

  ionViewWillEnter(): void {
    this.formController = this.formBuilder.group({
      userName: [this.defaultUserName, [Validators.required, Validators.maxLength(20)]],
      totalZones: [this.defaultTotalZones, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]],
      zoneChanges: [this.defaultZoneChanges, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]]
    })
  }

  setByformValue = async (): Promise<void> =>{
    const userName =this.formController.value.userName;
    const totalZones =this.formController.value.totalZones ;
    const zoneChanges =this.formController.value.zoneChanges ;

    await Preferences.set({key:'userName',value:userName});
    await Preferences.set({key:'totalZones',value:totalZones});
    await Preferences.set({key:'zoneChanges',value:zoneChanges});
  }

  submitForm() {
    if (this.formController.valid) {
      console.log(this.formController.value);
      this.setByformValue();
      this.router.navigate(['tabs'])
    }
  }

  savePreferences =  async () => {
    if (this.formController.valid)  {

      this.defaultUserName = await Preferences.get({ key: 'userName' }); 
       
      this.defaultTotalZones = await Preferences.get({ key: 'totalZones' }); 
      this.router.navigate(['tabs']); 
  }

  
}
}