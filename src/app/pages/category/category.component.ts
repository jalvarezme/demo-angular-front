import { Component, inject } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { LoaderComponent } from "../../components/loader/loader.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../../components/modal/modal.component";
import { CategoryFormComponent } from "../../components/category/category-form/category-form.component";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-category",
  standalone: true,
  imports: [LoaderComponent, ModalComponent, CategoryFormComponent],
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent {
  public modalService: NgbModal = inject(NgbModal);

  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;

  categoryService = inject(CategoryService);
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.categoryService.getAll());
    this.route.data.subscribe((data) => {
      this.areActionsAvailable = this.authService.areActionsAvailable(
        data["authorities"] ? data["authorities"] : [],
      );
    });
  }

  onFormEventCalled({ category, title }: { category: any; title: string }) {
    console.log("Form event called with params:", { category, title });
    if (title === "Add Category") {
      this.categoryService.save(category);
    } else if (title === "Edit Category") {
      this.categoryService.update(category);
    }
    this.modalService.dismissAll();
  }

  onDeleteCategory(id: number) {
    console.log("Delete category with id:", id);
    this.categoryService.delete(id);
  }
}
