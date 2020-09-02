import { Component, OnInit, Input } from '@angular/core';

/**
 * A header component for a Government of Alberta hosted microsite.
 */
@Component({
    selector: 'goa-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class GoAHeaderComponent implements OnInit {

    /**
     * The name to show on the header as the microsite.
    */
    @Input() serviceName: string;

    /**
     * The home page URL of the microsite.
     */
    @Input() serviceHome = 'https://www.alberta.ca/index.aspx';

    constructor() {}

    /**
     * @ignore
     */
    ngOnInit() {
        if(this.serviceName === undefined || this.serviceName === null) {
            throw new TypeError(`Input 'serviceName' is required.`);
        }
    }
}