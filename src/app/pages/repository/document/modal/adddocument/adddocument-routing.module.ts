import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdddocumentComponent } from './adddocument.component';

const routes: Routes = [
    { path: '', component: AdddocumentComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdddocumentRountingModule { }