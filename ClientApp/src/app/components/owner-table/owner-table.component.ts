import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Owner } from 'src/app/models/owner';
import { OwnerService } from 'src/app/services/owner.service';
import { ToastService } from "../../services/toast.service";
import { OwnerQuery } from "../../models/query/ownerQuery";
import { QueryResult } from 'src/app/models/query/queryResult';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-owner-table',
  templateUrl: './owner-table.component.html',
  styleUrls: ['./owner-table.component.css']
})
export class OwnerTableComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_PAGE_SIZE = 3;
  public query: OwnerQuery = { sortBy: '', isSortedAscending: true, page: this.DEFAULT_PAGE, pageSize: this.DEFAULT_PAGE_SIZE };
  public queryResult = {};
  public ownersLoaded = false;

  public owners: Owner[] = [];

  public columns = [
    { title: 'Name', key: 'name', isSortable: true },
    { title: 'Email', key: 'email', isSortable: true },
    { title: 'Mobile' },
    { title: 'Actions' }
  ];

  public faSortUp = faSortUp;
  public faSortDown = faSortDown;
  
  private _getOwnersSubscription = new Subscription();
  private _deleteOwnerSubscription = new Subscription();

  constructor(private _ownerService: OwnerService, private _toastService: ToastService) { }

  ngOnInit() {
    this.ownersLoaded = false;
    this.getOwners();
  }

  ngOnDestroy() {
    this._getOwnersSubscription.unsubscribe();
    this._deleteOwnerSubscription.unsubscribe();
  }

  onEditOwner(owner) {
    this._ownerService.selectedOwnerSubject.next(owner);
  }

  onDeleteOwner(selectedOwner: Owner) {
    if(window.confirm('Do you really want to delete this suburb?')) {
      this._deleteOwnerSubscription = this._ownerService.deleteOwner(selectedOwner.id)
        .subscribe(
          () => {
            let index = this.owners.findIndex(owner => owner.id == selectedOwner.id);
            this.owners.splice(index, 1);
            this._toastService.onSuccessCall('Successfully delete an owner');
          },
          (error) => this._toastService.onErrorCall(error)
        );
    }
  }

  sortBy(column) {
    if(this.query.sortBy === column) {
      this.query.isSortedAscending = !this.query.isSortedAscending;
    }
    else {
      this.query.sortBy = column;
      this.query.isSortedAscending = true;
    }
    this.getOwners();
  }

  onPageChanged(page) {
    this.query.page = page;
    this.getOwners();
  }

  private getOwners() {
    this._getOwnersSubscription = this._ownerService.getOwners(this.query)
      .subscribe(
        (queryResult: QueryResult<Owner>) => {
          this.queryResult = queryResult;
          this.owners = queryResult.items;
          this.ownersLoaded = true;
        },
        (error) => this._toastService.onErrorCall(error, 'Owners fetching error')
      );
  }
}
