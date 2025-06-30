import { Component, inject } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ProductService } from "../../services/product.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductFormComponent } from "../../components/products/product-form/product-form.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-category",
  standalone: true,
  imports: [LoaderComponent, ProductFormComponent, ModalComponent],
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent {
  public modalService: NgbModal = inject(NgbModal);
 public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;
  
  productService = inject(ProductService);
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.productService.getAll());
     this.route.data.subscribe((data) => {
      this.areActionsAvailable = this.authService.areActionsAvailable(
        data["authorities"] ? data["authorities"] : [],
      );
    });
  }

  onFormEventCalled({ product, title }: { product: any; title: string }) {
    console.log("Form event called with params:", { product, title });
    if (title === "Add Product") {
      this.productService.save(product);
    } else if (title === "Edit Product") {
      console.log("Updating product:", product);
      this.productService.update(product);
    }
    this.modalService.dismissAll();
  }

  onDeleteProduct(id: number) {
    console.log("Delete product with id:", id);
    this.productService.delete(id);
  }
}
