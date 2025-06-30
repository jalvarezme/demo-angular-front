import { inject, Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends BaseService<any> {
  protected override source: string = "category";
  private itemListSignal = signal<any[]>([]);
  private snackBar = inject(MatSnackBar);

  get items$() {
    return this.itemListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response);
        console.log("Categories fetched successfully:", response);
      },
      error: (error: any) => {
        console.log("error", error);
      },
    });
  }

  public save(item: any) {
    item.status = "active";
    this.add(item).subscribe({
      next: (response: any) => {
        this.itemListSignal.update((games: any[]) => [response, ...games]);
      },
      error: (error: any) => {
        this.snackBar.open(error.error.description, "Close", {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });
        console.error("error", error);
        console.error("error", error);
      },
    });
  }

  public update(item: any) {
    this.edit(item.id, item).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().map((category) => {
          return category.id == item.id ? item : category;
        });
        this.itemListSignal.set(updatedItems);
      },
      error: (error: any) => {
        this.snackBar.open(error.error.description, "Close", {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });
        console.error("error", error);
        console.error("error", error);
      },
    });
  }

  public delete(id: string | number) {
    this.del(id).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().filter((g: any) =>
          g.id != id
        );
        this.itemListSignal.set(updatedItems);
      },
      error: (error: any) => {
        this.snackBar.open(error.error.description, "Close", {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });
        console.error("error", error);
      },
    });
  }
}
