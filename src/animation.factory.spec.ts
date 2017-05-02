import { animationFactory, CONFIG_TOKEN, IAnimationConfig } from './';
import { BrowserDetectService } from './browser-detect.service';
import { AnimationDriver, ɵNoopAnimationDriver, ɵWebAnimationsDriver } from '@angular/animations/browser';
import { animate, Component, state, style, transition, trigger } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'test-component',
    template: `<button (click)="show=!show">Fly in</button><h1 [@flyInOut] *ngIf="show">test</h1>`,
    // tslint:disable-next-line:object-literal-sort-keys
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]
})
export class TestComponent {
    public show: boolean;
}

function getFixture(mockedService: BrowserDetectService, mockedConfig: IAnimationConfig) {
    return TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [
            BrowserAnimationsModule,
        ],
        providers: [
            { provide: BrowserDetectService, useValue: mockedService },
            { provide: CONFIG_TOKEN, useValue: mockedConfig },
            { provide: AnimationDriver, useFactory: animationFactory, deps: [BrowserDetectService, CONFIG_TOKEN] }
        ]
    }).createComponent(TestComponent);
}

describe('factory: animationFactory', () => {
    let spy: jasmine.Spy;
    let config: IAnimationConfig;
    let fixture: ComponentFixture<TestComponent>;
    let animationDriver: AnimationDriver;
    let browserDetectService: BrowserDetectService;
    let browserDetectServiceDouble: BrowserDetectService;
    let button: HTMLButtonElement;

    describe('if browser is not supported', () => {
        beforeEach(() => {
            // create a mocked service
            browserDetectServiceDouble = {
                isBrowserSupport: (ua: string) => false
            };
            fixture = getFixture(browserDetectServiceDouble, undefined);
            animationDriver = fixture.debugElement.injector.get(AnimationDriver);
            browserDetectService = fixture.debugElement.injector.get(BrowserDetectService);
            fixture.detectChanges();
        });

        it('isBrowserSupport should be false', () => {
            expect(browserDetectService.isBrowserSupport('')).toBeFalsy();
        });

        it('should use ɵNoopAnimationDriver', () => {
            expect(animationDriver instanceof ɵNoopAnimationDriver).toBeTruthy();
        });
    });
    describe('if browser is supported', () => {
        beforeEach(() => {
            // create a mock service
            browserDetectServiceDouble = {
                isBrowserSupport: (ua: string) => true
            };
            fixture = getFixture(browserDetectServiceDouble, undefined);
            animationDriver = fixture.debugElement.injector.get(AnimationDriver);
            browserDetectService = fixture.debugElement.injector.get(BrowserDetectService);
            fixture.detectChanges();
        });

        it('isBrowserSupport should be true', () => {
            expect(browserDetectService.isBrowserSupport('')).toBeTruthy();
        });

        it('should use ɵWebAnimationsDriver', () => {
            expect(animationDriver instanceof ɵWebAnimationsDriver).toBeTruthy();
        });
    });

    describe('if browser is supported, but set disable in config', () => {
        beforeEach(() => {
            // create a mock service
            browserDetectServiceDouble = {
                isBrowserSupport: (ua: string) => true
            };
            fixture = getFixture(browserDetectServiceDouble, { disable: true });
            animationDriver = fixture.debugElement.injector.get(AnimationDriver);
            browserDetectService = fixture.debugElement.injector.get(BrowserDetectService);
            fixture.detectChanges();
        });

        it('isBrowserSupport should be true', () => {
            expect(browserDetectService.isBrowserSupport('')).toBeTruthy();
        });

        it('should use ɵNoopAnimationDriver', () => {
            expect(animationDriver instanceof ɵNoopAnimationDriver).toBeTruthy();
        });
    });
});

