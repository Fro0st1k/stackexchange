import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './components/core/app.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { SearchComponent } from './pages/search/search.component';
import { ResultsComponent } from './pages/results/results.component';
import { QuestionComponent } from './pages/question/question.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { QuestionItemComponent } from './components/question-item/question-item.component';
import { AnswersListComponent } from './components/answers-list/answers-list.component';
import { AnswersItemComponent } from './components/answers-item/answers-item.component';
import { PostUserInfoComponent } from './components/shared/post/post-user-info/post-user-info.component';
import { PostTagsComponent } from './components/shared/post/post-tags/post-tags.component';
import { PostBodyComponent } from './components/shared/post/post-body/post-body.component';
import { PostInfoComponent } from './components/shared/post/post-info/post-info.component';
import { HeaderComponent } from './components/header/header.component';
import { LocalSpinnerComponent } from './components/shared/local-spinner/local-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    SearchComponent,
    ResultsComponent,
    QuestionComponent,
    SearchFieldComponent,
    QuestionsListComponent,
    QuestionItemComponent,
    AnswersListComponent,
    AnswersItemComponent,
    PostUserInfoComponent,
    PostTagsComponent,
    PostBodyComponent,
    PostInfoComponent,
    HeaderComponent,
    LocalSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
