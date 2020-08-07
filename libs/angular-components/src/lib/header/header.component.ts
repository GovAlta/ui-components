import { Component, OnInit, Input } from '@angular/core';
import { FooterImages } from '../../../../core-css/src/lib/microsite-logo/inlineImages'


@Component({
    selector: 'goa-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class GoAHeaderComponent implements OnInit {

    base64Images = FooterImages

    /**
     * The name to show on the header as the microsite.
    */
    @Input() serviceName = 'Digital Service Name (microsite)'

    /**
     * The home page URL of the microsite.
     */
    @Input() microServiceHomeLink: String = 'https://www.alberta.ca/index.aspx'

    constructor() {}
    ngOnInit() {}
}