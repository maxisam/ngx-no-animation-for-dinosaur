import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationDriver, ɵWebAnimationsDriver } from '@angular/animations/browser';
import { IAnimationConfig, animationFactory } from './animation.factory';
export * from './animation.factory';
import { BrowserDetectService } from "./browser-detect.service";
export const CONFIG_TOKEN = new InjectionToken<IAnimationConfig>('config');
@NgModule({
    imports: [BrowserAnimationsModule]
})
export class BrowserSupportedAnimationsModule {
    public static forRoot(config?: IAnimationConfig): ModuleWithProviders {
        return {
            ngModule: BrowserSupportedAnimationsModule,
            providers: [
                BrowserDetectService,
                { provide: CONFIG_TOKEN, useValue: config },
                { provide: AnimationDriver, useFactory: animationFactory, deps: [BrowserDetectService, CONFIG_TOKEN] }
            ]
        };
    }
}
