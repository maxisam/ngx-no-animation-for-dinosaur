import { AnimationDriver, ɵWebAnimationsDriver } from '@angular/animations/browser';
import { isBrowserSupport } from "./browser-detect";

export function animationFactory(): any {
    const noop = AnimationDriver.NOOP;
    const driver = new ɵWebAnimationsDriver();
    const isSupported = isBrowserSupport(window.navigator.userAgent);
    return {
        animate: (element: any,
            keyframes: Array<{ [key: string]: string | number; }>,
            duration: number, delay: number, easing: string, previousPlayers?: any[]) => {

            if (!isSupported) {
                return noop.animate(element, keyframes, duration, delay, easing, previousPlayers);
            } else {
                return driver.animate(element, keyframes, duration, delay, easing, previousPlayers);
            }
        }
    };
};
