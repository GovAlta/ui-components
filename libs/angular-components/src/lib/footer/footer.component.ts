import { Component, OnInit, Input } from '@angular/core';
import { FooterImages } from '../../../../core-css/src/lib/microsite-logo/inlineImages'


@Component({
    selector: 'goa-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})

export class GoAFooterComponent implements OnInit {

    base64Images = FooterImages

    /**
     * The name to show on the footer as the microsite.
    */
    @Input() serviceName = 'Digital Service Name (microsite)'

    /**
     * The home page URL of the microsite.
     */
    @Input() microServiceHomeLink: String = 'https://www.alberta.ca/index.aspx'

    constructor() {}
    ngOnInit() {}
}