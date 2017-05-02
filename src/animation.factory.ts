import { BrowserDetectService } from './browser-detect.service';
import { ɵNoopAnimationDriver, ɵWebAnimationsDriver } from '@angular/animations/browser';
export interface IAnimationConfig {
    disable: boolean;
}
export function animationFactory(win, browserDetectService: BrowserDetectService, config?: IAnimationConfig): any {
    const isSupported = browserDetectService.isBrowserSupport(win.navigator.userAgent);
    if (!isSupported || (config && config.disable)) {
        return new ɵNoopAnimationDriver();
    } else {
        return new ɵWebAnimationsDriver();
    }
};
