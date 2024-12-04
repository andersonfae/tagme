import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// Inicializa o ambiente de testes
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Encontra todos os arquivos de teste .spec.ts
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);