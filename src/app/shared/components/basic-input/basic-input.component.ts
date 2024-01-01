import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss']
})
export class BasicInputComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl = new FormControl();
  @Input() type: string = 'text';
  @Input() step: string = '0.01';
  @Input() name: string;
  @Input() maxLength: number;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() direction: string = 'rtl';

  @Output() enter: EventEmitter<void> = new EventEmitter();
  @Output() blur: EventEmitter<void> = new EventEmitter();
  @Output() onIconClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {}
}

