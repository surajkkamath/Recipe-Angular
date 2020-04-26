import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http'

import { AuthService } from './auth.service'
import { exhaustMap, take } from 'rxjs/operators'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        // here both user and next is observable so we can solve it by using exhaustMap
       // this.authService.user.subscribe()
       // return next.handle(req)
       return this.authService.user.pipe(
           take(1),  //latest user i.e current user
           exhaustMap(user => { 
               // add token only if user exits
               if (!user){ // if there are no user
                   return next.handle(req)
               }
               const modifiedReq = req.clone({ // modifying the req to add token to all req by interceptor
                   params: new HttpParams().set('auth', user.token)
               })
               return next.handle(modifiedReq)
           })
       )
    }
}