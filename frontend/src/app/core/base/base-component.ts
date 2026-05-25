import { ChangeDetectorRef, Directive } from '@angular/core';

@Directive()
export abstract class BaseComponent {
  constructor(protected cdr: ChangeDetectorRef) {}

  protected refresh() {
    this.cdr.markForCheck();
  }
}
