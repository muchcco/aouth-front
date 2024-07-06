import { ResolveFn } from '@angular/router';

export const repositoryResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
