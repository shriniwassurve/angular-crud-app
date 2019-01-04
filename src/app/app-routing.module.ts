import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import {AddRecordComponent} from './add-record/add-record.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddRecordComponent},
  { path: ':id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
