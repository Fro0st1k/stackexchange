import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../pages/search/search.component';
import { QuestionComponent } from '../pages/question/question.component';
import { ResultsComponent } from '../pages/results/results.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchComponent
  },
  {
    path: 'question',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'question/:questionId',
    pathMatch: 'full',
    component: QuestionComponent
  },
  {
    path: 'results',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'results/:value',
    pathMatch: 'full',
    component: ResultsComponent
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
