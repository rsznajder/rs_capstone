import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';

/* rubric06, rubric17 */
@Component({
  selector: 'app-togglebutton',
  templateUrl: './togglebutton.component.html',
  styleUrls: ['./togglebutton.component.css']
})
export class TogglebuttonComponent implements OnInit, OnChanges {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() onlabel: string;
  @Input() offlabel: string;
  @Input() onstyle: string;
  @Input() offstyle: string;
  @Input() size: string;
  @Input() style: string;
  @Input() width: number;
  @Input() height: number;
  @Output() checkboxChange = new EventEmitter<number>();
  public _state: any;  // this._state.checked is holding value
  public switchStyle: string;
  public switchClasses: string;
  public labelStyle: string;
  public labelOnClasses: string;
  public labelOffClasses: string;
  public spanClasses: string;

  constructor() {
    if (!this._state) {
      this.initState();
    }
   }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.checked) {
      if (changes.checked.isFirstChange() === true) {
        if (this._state.checked !== changes.checked.currentValue) {
          this._state.checked = changes.checked.currentValue;
          if (this._state.checked === true) {
            this.on(false);
          } else {
            this.off(false);
          }
        }
      } else {
        this.toggle(changes.checked.currentValue);
      }
   }
  }

  toggle(event: MouseEvent | boolean) {
    console.log('toggle: ' + typeof event);
    // this came from ngOnChanges
    if (typeof event === 'boolean') {
      if (this._state.checked !== event) {
        this._state.checked = event;
        if (this._state.checked === true) {
          this.on(false);
        } else {
          this.off(false);
        }
      }
    } else {
      this._state.checked ? this.off(true) : this.on(true);
      this.setClassesAndStyles();
      this.checkboxChange.emit(this._state.checked);
    } 
  }

  on(emitEvent: boolean) {
    if (!this._state.disabled) {
      this._state.checked = true;
      if (emitEvent) {
        this.checkboxChange.emit(this._state.checked);
      }
    }
  }

  off(emitEvent: boolean) {
    if (!this._state.disabled) {
      this._state.checked = false;
      if (emitEvent) {
        this.checkboxChange.emit(this._state.checked);
      }
    }
  }

  enable() {
    this._state.disabled = false;
    this.setClassesAndStyles();
  }

  disable() {
    this._state.disabled = true;
    this.setClassesAndStyles();
  }

  setClassesAndStyles() {
    this.switchStyle = '';
    if (this._state.width) {
      this.switchStyle = 'width:' + this._state.width + 'px';
    }
    if (this._state.height) {
      this.switchStyle = 'height:' + this._state.height + 'px';
    }

    this.switchClasses = 'switch btn ';
    if (this._state.checked) {
      this.switchClasses = this.switchClasses + 'on btn-' + this._state.onstyle;
    } else {
      this.switchClasses = this.switchClasses + 'off btn-' + this._state.offstyle;
    }
    if (this._state.size) {
      this.switchClasses = this.switchClasses + ' btn-' + this._state.size;
    }
    if (this._state.style) {
      this.switchClasses = this.switchClasses + ' ' + this._state.style;
    }

    this.labelStyle = '';
    if (this._state.height) {
      this.labelStyle = 'line-height:' + 'calc(' + this._state.height + 'px * 0.8)';
    }

    this.labelOnClasses = 'switch-on btn btn-' + this._state.onstyle;
    if (this._state.size) {
      this.labelOnClasses = this.labelOnClasses + ' btn-' + this._state.size;
    }

    this.labelOffClasses = 'switch-off btn btn-' + this._state.offstyle;
    if (this._state.size) {
      this.labelOffClasses = this.labelOffClasses + ' btn-' + this._state.size;
    }

    this.spanClasses = 'switch-handle btn btn-light';
    if (this._state.size) {
      this.spanClasses = this.spanClasses + ' btn-' + this._state.size;
    }
  }

  initState() {
    this._state = {
      checked:
        typeof this.checked === 'boolean' ? this.checked : false,
      disabled:
        typeof this.disabled === 'boolean' ? this.disabled : false,
      onlabel: this.onlabel || 'On',
      offlabel: this.offlabel || 'Off',
      onstyle: this.onstyle || 'primary',
      offstyle: this.offstyle || 'light',
      size: this.size || '',
      style: this.style || '',
      width: this.width || null,
      height: this.height || null
    };
  }

  ngOnInit() {
    if (!this._state) {
      this.initState();
    }
    this.setClassesAndStyles();
  }
}
