import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Owner } from 'src/app/models/owner';
import { OwnerService } from 'src/app/services/owner.service';
import { ToastService } from "../../services/toast.service";

@Component({
  selector: 'app-owner-table',
  templateUrl: './owner-table.component.html',
  styleUrls: ['./owner-table.component.css']
})
export class OwnerTableComponent implements OnInit, OnDestroy {
  public owners: Owner[] = [];
  public ownersLoaded = false;
  
  private _getOwnersSubscription = new Subscription();
  private _deleteOwnerSubscription = new Subscription();

  constructor(private _ownerService: OwnerService, private _toastService: ToastService) { }

  ngOnInit() {
    this.ownersLoaded = false;
    this._getOwnersSubscription = this._ownerService.getOwners()
      .subscribe(
        (owners: Owner[]) => {
          this.owners = owners;
          this.ownersLoaded = true;
        },
        (error) => this._toastService.onErrorCall(error, 'Owners fetching error')
      );
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
          (error) => this._toastService.onErrorCall(error, 'Owner deletion error')
        );
    }
  }
}
