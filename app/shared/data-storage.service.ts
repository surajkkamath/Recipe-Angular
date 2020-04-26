import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-book-646d5.firebaseio.com/recipes.json',
        recipes  // we can token here same as we did below but we will use interceptor instead 
      )
      .subscribe(response => {
        console.log(response);
      });
  }

 /* fetchRecipes() { // accessing only current user and not all subscription
    return this.authService.user.pipe(
      take(1), // latest user i.e current user
      exhaustMap(user => { // exhaustmap waits for first observable to complete i.e to get current user and then pass that user
        return this.http.get<Recipe[]>(
          'https://recipe-book-646d5.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', user.token) // adding token using query parameter, auth is for authentication built in
          }
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }*/

  // we used interceptors for passing token instead of passing it through params

  fetchRecipes() { 
        return this.http.get<Recipe[]>(
          'https://recipe-book-646d5.firebaseio.com/recipes.json',
         
        )
      .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
  
}
