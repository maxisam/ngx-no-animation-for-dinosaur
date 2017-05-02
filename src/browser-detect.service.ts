import { Injectable, Inject } from '@angular/core';
import { WINDOW } from "ngx-window-token";

@Injectable()
export class BrowserDetectService {

    constructor( @Inject(WINDOW) private window) { }
    public isBrowserSupport(ua: string): boolean {
        // tslint:disable-next-line:no-string-literal
        if (!!this.window['chrome'] && !!this.window['chrome']['webstore']) {
            return true;
        } else if (ua.indexOf('MSIE') !== -1) {
            return ua.indexOf('MSIE 10') !== -1; // filter out all IE but IE10
        } else if (ua.indexOf('Edge') !== -1 || ua.indexOf('Trident') !== -1) {
            return true; // IE11 and Edge
        } else if (ua.indexOf('Firefox') !== -1) {
            const match = /((?!Gecko.+)Firefox|Gecko(?!.+Firefox))(?: |\/)([\d]+)/.exec(ua);
            const ver = +match[2];
            return !!match[1] && !isNaN(ver) && ver >= 27; // Firefox 27+
        } else if (ua.indexOf('Safari') !== -1) {
            let match = /(?:iPod|iPhone|iPad).+Version\/(\d+\.\d+).*Safari/.exec(ua); // iOS safari 7.1+
            let ver = match ? +match[1] : NaN;
            if (!isNaN(ver)) { return ver >= 7.1; }
            match = /Version\/(\d+)\.\d+(?:\.\d+)?.*Safari/.exec(ua); // OS X Safari 9+
            ver = match ? +match[1] : 0;
            if (!isNaN(ver)) { return ver >= 9; }
        }
        return false;
    }
}
