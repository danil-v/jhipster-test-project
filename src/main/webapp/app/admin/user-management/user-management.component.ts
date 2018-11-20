import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, User, UserService, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-mgmt',
    templateUrl: './user-management.component.html'
})
export class UserMgmtComponent implements OnInit, OnDestroy {

    currentAccount: any;
    users: User[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    jsonSchema: any;
    arrTypeDocument: { label: string, value: string }[];

    submission: any = {
        data: {
            firstName: 'Joe',
            lastName: 'Smith'
        }
    };

    constructor(
        private userService: UserService,
        private alertService: JhiAlertService,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
        this.userService.getJsonSchema().subscribe(json => {
            console.log("jsonSchema: ", json);
            this.jsonSchema = json;
            console.log("jsonSchema - 2: ", this.jsonSchema);
        });
        this.arrTypeDocument = [
            { label: 'Паспорт гражданина СССР', value: '1' },
            { label: 'Паспорт гражданина России', value: '2' },
            { label: 'Загранпаспорт гражданина СССР', value: '3' },
            { label: 'Свидетельство о рождении', value: '4' },
            { label: 'Удостоверение личности офицера', value: '5' },
            { label: 'Справка об освобождении из места лишения свободы', value: '6' },
            { label: 'Паспорт Минморфлота', value: '7' },
            { label: 'Военный билет солдата (матроса, сержанта, старшины)', value: '8' },
            { label: 'Удостоверение личности военнослужащего', value: '9' },
            { label: 'Дипломатический паспорт гражданина РФ', value: '10' },
            { label: 'Иностранный паспорт', value: '11' },
            { label: 'Свидетельство о регистрации ходатайства о признании иммигранта беженцем', value: '12' },
            { label: 'Вид на жительство', value: '13' },
            { label: 'Удостоверение беженца РФ', value: '14' },
            { label: 'Временное удостоверение личности гражданина РФ', value: '15' },
            { label: 'Загранпаспорт гражданина РФ', value: '16' },
            { label: 'Паспорт Моряка', value: '17' },
            { label: 'Военный билет офицера запаса', value: '18' },
            { label: 'Иные документы, выдаваемые органами МВД', value: '19' }
        ];
    }

    ngOnDestroy() {
        this.routeData.unsubscribe();
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('userListModification', (response) => this.loadAll());
    }

    setActive(user, isActivated) {
        user.activated = isActivated;

        this.userService.update(user).subscribe(
            (response) => {
                if (response.status === 200) {
                    this.error = null;
                    this.success = 'OK';
                    this.loadAll();
                } else {
                    this.success = null;
                    this.error = 'ERROR';
                }
            });
    }

    loadAll() {
        this.userService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    trackIdentity(index, item: User) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/user-management'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    onSubmit(submission: string) {
        console.log("Formio submission: " + JSON.stringify(submission));
        this.userService.getDataFromFormio(submission);
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.users = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
}
