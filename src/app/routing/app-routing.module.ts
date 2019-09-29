import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../pages/search/search.component';
import { QuestionComponent } from '../pages/question/question.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchComponent,
    // data: { animation: 'isLeft' }
  },
  {
    path: 'question',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'question/:questionId',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: QuestionComponent,
    data: { animation: 'isRight' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
