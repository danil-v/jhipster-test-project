import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestAppSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormioModule } from 'angular-formio';

@NgModule({
    imports: [
        TestAppSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        FlexLayoutModule,
        FormioModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestAppHomeModule {}
