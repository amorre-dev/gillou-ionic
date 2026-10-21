import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AME_URL, BrandFooterComponent } from './brand-footer.component';

describe('BrandFooterComponent', () => {
  let fixture: ComponentFixture<BrandFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BrandFooterComponent] }).compileComponents();
    fixture = TestBed.createComponent(BrandFooterComponent);
    fixture.detectChanges();
  });

  it('opens am-e.dev in a new window on tap', () => {
    const open = spyOn(window, 'open').and.returnValue(null);
    const link = fixture.nativeElement.querySelector('a.brand-footer') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(AME_URL);
    link.dispatchEvent(new MouseEvent('click', { cancelable: true, bubbles: true }));
    expect(open).toHaveBeenCalledWith(AME_URL, '_blank', 'noopener');
  });
});
