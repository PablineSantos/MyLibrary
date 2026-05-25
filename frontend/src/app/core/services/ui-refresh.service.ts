import { Injectable, ChangeDetectorRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiRefreshService {
  private activeDetectors: ChangeDetectorRef[] = [];

  register(cdr: ChangeDetectorRef) {
    this.activeDetectors.push(cdr);
  }

  refreshAll() {
    this.activeDetectors.forEach(cdr => cdr.markForCheck());
  }
}
