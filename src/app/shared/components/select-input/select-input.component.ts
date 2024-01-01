import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectItem } from '../../models/select-item.interface';
import { FormControl } from '@angular/forms';

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
