import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // disabling manage and logout button if user is not authenticated
    // it is done while loading page
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; // (!user ? false : true)
      console.log(!user);  // false not have user
      console.log(!!user); // true have user
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
