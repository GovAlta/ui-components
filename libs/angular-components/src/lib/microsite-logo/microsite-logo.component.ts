import { Component, OnInit, Input } from '@angular/core';
import { MobileLogo, DesktopLogo } from '@abgov/shared/common';

@Component({
    selector: 'goa-microsite-logo',
    templateUrl: './microsite-logo.component.html',
    styleUrls: ['./microsite-logo.component.scss'],
})

export class GoAMicrositeLogoComponent implements OnInit {

    desktopLogo = DesktopLogo;
    mobileLogo = MobileLogo;

    /**
     * The name to show on the header/footer as the microsite.
    */
    @Input() serviceName = 'Digital Service Name (microsite)';

    /**
     * The home page URL of the microsite.
     */
    @Input() microServiceHomeLink: String = 'https://www.alberta.ca/index.aspx';
    
    constructor() {}
    ngOnInit() {}
}