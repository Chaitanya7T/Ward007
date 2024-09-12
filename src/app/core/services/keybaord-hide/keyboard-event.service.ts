import { Injectable } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardEventService {
  isKeyboardHide = new Subject;
  constructor(
    public keyboard: Keyboard) { }
  keyboardEvent() {
    this.keyboard.onKeyboardWillShow().subscribe(() => {
      console.log('in onKeyboardWillShow');
      this.isKeyboardHide.next(false);
      // console.log('SHOWK');
    });

    this.keyboard.onKeyboardWillHide().subscribe(() => {
      console.log('in ');
      this.isKeyboardHide.next(true);
      // console.log('HIDEK');
    });
  }
}
