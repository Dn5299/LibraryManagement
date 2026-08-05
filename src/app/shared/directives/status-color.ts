import {
  Directive,
  ElementRef,
  Renderer2,
  effect,
  input,
  inject
} from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective {

  status = input.required<string>();

  private el = inject(ElementRef);

  private renderer = inject(Renderer2);

  constructor() {

    effect(() => {

      const value = this.status();

      let color = '#16a34a';

      switch (value) {

        case 'Hết':
        case 'Đã trả':
          color = '#dc2626';
          break;

        case 'Đang mượn':
          color = '#f59e0b';
          break;

        case 'Còn':
          color = '#16a34a';
          break;

      }

      this.renderer.setStyle(
        this.el.nativeElement,
        'color',
        color
      );

      this.renderer.setStyle(
        this.el.nativeElement,
        'fontWeight',
        '600'
      );

    });

  }

}