import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginator],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  @Input() length!: number;
  @Input() pageSize!: number;
  @Input() pageIndex!: number;
  @Output() page = new EventEmitter<PageEvent>();

  pageChanged(event: PageEvent): void {
    this.page.emit(event);
  }
}
