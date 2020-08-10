import { Component, OnInit, Input } from '@angular/core';
import { MobileLogo } from '../microsite-logo/inlineAssets';


@Component({
    selector: 'goa-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})

export class GoAFooterComponent implements OnInit {

    mobileLogo = MobileLogo;

    /**
     * The name to show on the footer as the microsite.
    */
    @Input() serviceName = 'Digital Service Name (microsite)';

    /**
     * The home page URL of the microsite.
     */
    @Input() microServiceHomeLink: String = 'https://www.alberta.ca/index.aspx';

    constructor() {}
    ngOnInit() {}
}