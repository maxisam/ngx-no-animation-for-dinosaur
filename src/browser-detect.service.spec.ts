/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrowserDetectService } from './browser-detect.service';
import { WindowTokenModule, WINDOW } from "ngx-window-token";

const chromeWindows10 = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36';
const firefox27 = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0';
const firefox26 = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:26.0) Gecko/20100101 Firefox/26.0';
const MSIE10 = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)';
const MSIE11 = 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E; rv:11.0) like Gecko';
const EDGE = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393';
const safari7Osx = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/7.1.8 Safari/537.85.17';
const safari8Osx = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/8.0.8 Safari/600.8.9';
const safari9Osx = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.8 (KHTML, like Gecko) Version/9.1.3 Safari/601.7.8';
const safari10Osx = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8';
const safari7Ios = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B554a Safari/9537.53';
const safari8Ios = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4';
const safari10Ios = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1';

describe('Service: BrowserDetect', () => {
  describe('test isBrowserSupport for chrome browser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WindowTokenModule],
        providers: [BrowserDetectService]
      });
    });

    it('chrome is supported', inject([BrowserDetectService], (service: BrowserDetectService) => {
      expect(service.isBrowserSupport(chromeWindows10)).toBeTruthy();
    }));
  });

  describe('test isBrowserSupport for non-chrome browser', () => {
    let service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: WINDOW, useValue: {} },
          BrowserDetectService]
      });
      service = TestBed.get(BrowserDetectService);
    });

    // Firefox

    it('firefox >= 27 is supported', () => {
      expect(service.isBrowserSupport(firefox27)).toBeTruthy();
    });

    it('firefox < 27 is not supported', () => {
      expect(service.isBrowserSupport(firefox26)).toBeFalsy();
    });

    // MS IE

    it('MSIE 10 is supported', () => {
      expect(service.isBrowserSupport(MSIE10)).toBeTruthy();
    });

    it('MSIE 11 is supported', () => {
      expect(service.isBrowserSupport(MSIE11)).toBeTruthy();
    });

    it('EDGE is supported', () => {
      expect(service.isBrowserSupport(EDGE)).toBeTruthy();
    });

    // Safari on OSX

    it('Safari 8 on OSX is not supported', () => {
      expect(service.isBrowserSupport(safari8Osx)).toBeFalsy();
    });

    it('Safari 9 on OSX is supported', () => {
      expect(service.isBrowserSupport(safari9Osx)).toBeTruthy();
    });

    it('Safari 10 on OSX is supported', () => {
      expect(service.isBrowserSupport(safari10Osx)).toBeTruthy();
    });

    // Safari on ISO

    it('Safari 7 on IOS is NOT supported', () => {
      expect(service.isBrowserSupport(safari7Ios)).toBeFalsy();
    });

    it('Safari 8 on IOS is supported', () => {
      expect(service.isBrowserSupport(safari8Ios)).toBeTruthy();
    });

    it('Safari 10 on IOS is supported', () => {
      expect(service.isBrowserSupport(safari10Ios)).toBeTruthy();
    });
  });
});
