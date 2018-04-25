import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';

import {
  createStore,
  Store,
  StoreEnhancer
} from 'redux';
import { counterReducer } from './counter-reducer';
import { AppState } from './app-state';
import { AppStore } from './app-store';
import CounterComponent from './CounterComponent';

let devtools: StoreEnhancer<AppState> = // 使用Redux DevTools插件
  window['devToolsExtension'] ?
    window['devToolsExtension']() : f => f; // identity functiong

// let store: Store<AppState> = createStore<AppState>(//TOCHECK: error TS2558: Expected 4 type arguments, but got 1.
let store: Store<AppState> = createStore(
  counterReducer,
  devtools
);

@Component({
  selector: 'app-root',
  template: `
    <counter-component></counter-component>
  `
})
export class AppComponent {
  title = 'app';
}


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: AppStore, useValue: store }  // 注入store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
