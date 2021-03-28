import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core';
import { faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  	@Input('total-items') totalItems;
	@Input('page-size') pageSize = 10;
	@Output('page-changed') pageChanged = new EventEmitter();

	pages: any[];
	currentPage = 1;

	public faChevronLeft = faChevronLeft;
  	public faChevronRight = faChevronRight;
  	public faAngleDoubleLeft = faAngleDoubleLeft;
  	public faAngleDoubleRight = faAngleDoubleRight;

	ngOnChanges() {
		this.currentPage = 1;
			
		var pagesCount = Math.ceil(this.totalItems / this.pageSize); 
		this.pages = [];
		for (var i = 1; i <= pagesCount; i++)
			this.pages.push(i);
	}

	changePage(page) {
		this.currentPage = page; 
		this.pageChanged.emit(page);
	}

	previousPage() {
		if (this.currentPage == 1)
			return;
		this.currentPage--;
		this.pageChanged.emit(this.currentPage);
	}

	nextPage() {
		if (this.currentPage == this.pages.length)
			return; 
		this.currentPage++;
		this.pageChanged.emit(this.currentPage);
	}

	firstPage() {
		if (this.currentPage == 1)
			return;
		this.currentPage = 1;
		this.pageChanged.emit(this.currentPage);
	}

	lastPage() {
		if (this.currentPage == this.pages.length)
			return;
		this.currentPage = this.pages.length;
		this.pageChanged.emit(this.currentPage);
	}
}
