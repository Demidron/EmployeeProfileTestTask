import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TypesForm } from '../edit-employee/enums/types-form';

@Injectable({
  providedIn: 'root'
})
export class ChangeEmployeeGuard implements CanLoad {
  constructor(private router:Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return segments[0].parameters[TypesForm.TYPE] ? true :  this.router.navigate(['/employees']);
  }
}
