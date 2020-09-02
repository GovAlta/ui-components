import { Component, OnInit, Input } from '@angular/core';

/**
 * A footer component for a Government of Alberta hosted microsite.
 */
@Component({
    selector: 'goa-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})

export class GoAFooterComponent implements OnInit {

    /**
     * The name to show on the footer as the microsite.
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