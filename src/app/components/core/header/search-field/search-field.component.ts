import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SearchService } from '../../../../services/search/search.service';

@Component({
  selector: 'sec-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})

export class SearchFieldComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.createSearchForm();
  }

  private createSearchForm(): void {
    this.searchForm = this.fb.group({
      searchField: ['', Validators.required]
    });
    this.watchSearchField();
  }

  private watchSearchField(): void {
    this.searchForm.get('searchField').valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((searchValue: string) => this.searchService.getQuestions(searchValue));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
