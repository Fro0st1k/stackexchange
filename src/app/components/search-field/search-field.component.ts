import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sec-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})

export class SearchFieldComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public searchForm: FormGroup;
  @Output() searchFieldChangedEvent = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private router: Router
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

  public goToResults(): void {
    if (this.searchForm.valid) {
      this.router.navigate([`/results/${this.searchForm.get('searchField').value}`]);
    }
  }

  private watchSearchField(): void {
    this.searchForm.get('searchField').valueChanges
      .pipe(
        filter(text => text.length > 2),
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((searchValue: string) => this.searchFieldChangedEvent.emit(searchValue));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
