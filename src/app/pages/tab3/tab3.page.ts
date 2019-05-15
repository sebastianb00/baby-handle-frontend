import { Component } from '@angular/core';
import * as Consejos from '../../utils/consejos.class';
import { Consejo } from '../../interfaces/consejo';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  consejos: Consejo[];

  constructor() {
    this.consejos = Consejos.consejos;
    console.log(this.consejos);
  }

}
