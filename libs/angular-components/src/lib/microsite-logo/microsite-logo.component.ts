import { Component, OnInit, Input } from '@angular/core';

/**
 * A logo for a Government of Alberta hosted microsite.
 * selector: goa-microsite-logo
 */
@Component({
    selector: 'goa-microsite-logo',
    templateUrl: './microsite-logo.component.html',
    styleUrls: ['./microsite-logo.component.scss'],
})

export class GoAMicrositeLogoComponent implements OnInit {

    /**
     * The name to show on the header/footer as the microsite.
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