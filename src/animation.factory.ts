import { AnimationDriver, ɵWebAnimationsDriver } from '@angular/animations/browser';

export function animationFactory(): any {
    const noop = AnimationDriver.NOOP;
    const driver = new ɵWebAnimationsDriver();
    let isBrowserSupport = () => {
        const ua = window.navigator.userAgent;
        if (!!window['chrome'] && !!window['chrome']['webstore']) {
            return true;
        } else if (ua.indexOf('Firefox') !== -1) {
            const match = /((?!Gecko.+)Firefox|Gecko(?!.+Firefox))(?: |\/)([\d]+)/.exec(ua);
            const ver = +match[2];
            return !!match[1] && !isNaN(ver) && ver >= 27; // Firefox 27+
        } else if (ua.indexOf('MSIE 10') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge') !== -1) {
            return true; // IE 10+, Edge
        } else if (ua.indexOf('Safari') !== -1) {
            let match = /(?:iPod|iPhone|iPad).+Version\/(\d+\.\d+).*Safari/.exec(ua); // iOS safari 7.1+
            let ver = match ? +match[1] : 0;
            if (!isNaN(ver)) { return ver >= 7.1; }
            match = /Version\/(\d+)\.\d+(?:\.\d+)?.*Safari/.exec(ua); // OS X Safari 9+
            ver = match ? +match[1] : 0;
            if (!isNaN(ver)) { return ver >= 9; }
        }
        return false;
    };
    const isSupported = isBrowserSupport();
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
