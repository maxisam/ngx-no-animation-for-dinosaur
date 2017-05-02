import { BrowserDetectService } from './browser-detect.service';
import { AnimationDriver, ɵNoopAnimationDriver, ɵWebAnimationsDriver } from '@angular/animations/browser';
// import { isBrowserSupport } from "./browser-detect";
export interface IAnimationConfig {
    disable: boolean;
}
export function animationFactory(browserDetectService: BrowserDetectService, config?: IAnimationConfig): any {
    const isSupported = browserDetectService.isBrowserSupport(window.navigator.userAgent);
    if (!isSupported || (config && config.disable)) {
        return new ɵNoopAnimationDriver();
    } else {
        return new ɵWebAnimationsDriver();
    }
};
