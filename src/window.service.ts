import { Injectable } from '@angular/core';

export function _window(): Window {
    // return the global native browser window object
    return window;
}

@Injectable()
export class WindowService {
    get nativeWindow(): Window {
        return _window();
    }
}
