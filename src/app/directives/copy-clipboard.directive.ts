import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[copyClipboard]'
})
export class CopyClipboardDirective {
  @Input()
  public copyClipboard: string;

  @Output('copied')
  public copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {

    event.preventDefault();
    if (!this.copyClipboard)
      return;

    const range = document.createRange();
    range.selectNodeContents(document.body);
    document.getSelection().addRange(range);

    const listener: any = (e: ClipboardEvent) => {
      const clipboard: any = e.clipboardData || window['clipboardData'];
      clipboard.setData('text', this.copyClipboard.toString());
      e.preventDefault();

      this.copied.emit(this.copyClipboard);
    };

    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);

    document.getSelection().removeAllRanges();
  }
}
