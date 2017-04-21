import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationDriver, ɵWebAnimationsDriver } from '@angular/animations/browser';
import { animationFactory } from "./animation.factory";
export { animationFactory } from './animation.factory';

@NgModule({
    imports: [BrowserAnimationsModule]
})
export class BrowserSupportedAnimationsModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: BrowserSupportedAnimationsModule,
            providers: [
                { provide: AnimationDriver, useFactory: animationFactory }
            ]
        };
    }
}
