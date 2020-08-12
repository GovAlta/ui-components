import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'goa-microsite-logo',
    templateUrl: './microsite-logo.component.html',
    styleUrls: ['./microsite-logo.component.scss'],
})

export class GoAMicrositeLogoComponent implements OnInit {

    /**
     * The name to show on the header/footer as the microsite.
    */
    @Input() serviceName = 'Digital Service Name (microsite)';

    /**
     * The home page URL of the microsite.
     */
    @Input() serviceHome: String = 'https://www.alberta.ca/index.aspx';
    
    constructor() {}
    ngOnInit() {}
}