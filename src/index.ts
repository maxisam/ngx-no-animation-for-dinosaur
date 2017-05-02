import { animationFactory, IAnimationConfig } from './animation.factory';
import { BrowserDetectService } from './browser-detect.service';
import { AnimationDriver } from '@angular/animations/browser';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export * from './animation.factory';
export * from './browser-detect.service'
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
