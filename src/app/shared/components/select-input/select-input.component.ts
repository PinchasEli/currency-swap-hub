import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SelectItem } from '../../models/select-item.interface';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent {

  @Input() options: SelectItem[];
  @Input() control: FormControl = new FormControl();

  @Output() change: EventEmitter<SelectItem> = new EventEmitter();

  constructor() {}

}
