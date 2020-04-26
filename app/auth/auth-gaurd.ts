import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/internal/Observable'
import { AuthService } from './auth.service'
import { map, tap, take } from 'rxjs/operators'


@Injectable({ providedIn: 'root'})
export class AuthGaurd implements CanActivate{
    constructor(private authService: AuthService, private router: Router){}
  /*  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
        // now check if user is authenticated of using behaviour subject
        // here we authservice user which is an observable gives us user object 
        // to convert that to boolean as our observable take boolean here we convert it by using map
       return this.authService.user.pipe(map(user => {
           return !!user
       })
       // to navigate user to auth page as app loads
       // we are doing this here as we have given default route recipe when app opens
       ,tap(isAuth => {
           if(!isAuth){
               this.router.navigate(['/auth'])
           }
       })
       )
    }*/

    // instead of using tap and doing it maually we can do like this using url tree

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        // now check if user is authenticated of using behaviour subject
        // here we authservice user which is an observable gives us user object 
        // to convert that to boolean as our observable take boolean here we convert it by using map
       return this.authService.user.pipe(
        take(1),  
        map(user => {
           const isAuth = !!user
           if(isAuth){
               return true
           }
           return this.router.createUrlTree(['/auth']) 
       })
       
       )
    }


}