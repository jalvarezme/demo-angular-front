import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IGame } from "../../../interfaces";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-product-form",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent {
  @Input()
  title: string = "";
  @Input()
  toUpdateProduct: any = {};
  @Output()
  callParentEvent: EventEmitter<any> = new EventEmitter<any>();

  addEdit() {
    this.toUpdateProduct.category = { id: parseInt(this.toUpdateProduct.categoryID) };

    this.callParentEvent.emit({
      product: this.toUpdateProduct,
      title: this.title,
    });
  }
}
