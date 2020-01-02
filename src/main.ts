import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import Quill from "node_modules/quill/quil.js";
//
// let BlockEmbed = Quill.import('blots/block/embed');
//
// class DividerBlot extends BlockEmbed { }
// DividerBlot.blotName = 'divider';
// DividerBlot.tagName = 'hr';
//
// Quill.register(DividerBlot);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
