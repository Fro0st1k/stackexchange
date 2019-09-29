import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { SearchService } from '../../../../services/search/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sec-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})

export class SearchFieldComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public searchForm: FormGroup;
  public isOptionsVisible: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.createSearchForm();
  }

  private createSearchForm(): void {
    this.searchForm = this.fb.group({
      intitle: ['', Validators.required],
      sort: [false],
      order: [false]
    });
    this.formChangesWatcher();
  }

  private formChangesWatcher(): void {
    this.searchForm.valueChanges
      .pipe(
        tap(() => this.redirectToSearchPage()),
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        map(formValue => ({
          ...formValue,
          sort: formValue.sort ? 'votes' : 'activity',
          order: formValue.order ? 'asc' : 'desc'
        }))
      )
      .subscribe((formValue) => this.searchService.getQuestions(formValue));
  }

  public toggleOptions(): void {
    this.isOptionsVisible = !this.isOptionsVisible;
  }

  private redirectToSearchPage(): void {
    if (this.router.url !== '') {
      this.router.navigate(['']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
