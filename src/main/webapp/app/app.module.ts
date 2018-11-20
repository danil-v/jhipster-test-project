import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { TestAppSharedModule, UserRouteAccessService } from './shared';
import { TestAppAppRoutingModule} from './app-routing.module';
import { TestAppHomeModule } from './home/home.module';
import { TestAppAdminModule } from './admin/admin.module';
import { TestAppAccountModule } from './account/account.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
    JhiMainComponent,
    NavbarComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        BrowserModule,
        TestAppAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        TestAppSharedModule,
        TestAppHomeModule,
        TestAppAdminModule,
        TestAppAccountModule,
        MaterialModule,
        FlexLayoutModule,
        HttpClientModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService,
    ],
    bootstrap: [ JhiMainComponent ]
})
export class TestAppAppModule {}
