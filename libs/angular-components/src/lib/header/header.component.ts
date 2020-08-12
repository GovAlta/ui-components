import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'goa-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class GoAHeaderComponent implements OnInit {

    /**
     * The name to show on the header as the microsite.
    */
    @Input() serviceName = 'Digital Service Name (microsite)';

    /**
     * The home page URL of the microsite.
     */
    @Input() microServiceHomeLink: String = 'https://www.alberta.ca/index.aspx';

    constructor() {}
    ngOnInit() {}
}