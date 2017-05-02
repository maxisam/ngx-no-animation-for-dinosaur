import { animationFactory, IAnimationConfig } from './animation.factory';
import { BrowserDetectService } from './browser-detect.service';
import { AnimationDriver } from '@angular/animations/browser';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export * from './animation.factory';
export * from './browser-detect.service'
import { WindowTokenModule, WINDOW } from "ngx-window-token";

export const CONFIG_TOKEN = new InjectionToken<IAnimationConfig>('config');
@NgModule({
    imports: [BrowserAnimationsModule, WindowTokenModule]
})
export class BrowserSupportedAnimationsModule {
    public static forRoot(config?: IAnimationConfig): ModuleWithProviders {
        return {
            ngModule: BrowserSupportedAnimationsModule,
            providers: [
                BrowserDetectService,
                { provide: CONFIG_TOKEN, useValue: config },
                { provide: AnimationDriver, useFactory: animationFactory, deps: [WINDOW, BrowserDetectService, CONFIG_TOKEN] }
            ]
        };
    }
}
