// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

// Zoneless: no zone.js in the app, none in the tests either.
getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
