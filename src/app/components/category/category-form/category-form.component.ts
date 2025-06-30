import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGame } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  @Input() title: string = '';
  @Input() toUpdateCategory: any = {};
  @Output() callParentEvent: EventEmitter<any> = new EventEmitter<any>();

  addEdit()  {

    this.callParentEvent.emit({category: this.toUpdateCategory, title: this.title});
  }
}
