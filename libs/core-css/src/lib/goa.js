/*

Government of Alberta Design System

Version: V 1.0.1

Full system available at https://www.alberta.ca/goa/design-system/

*/



/* js header goa.js ***/

export const goa = new function() {
	
	// this is the common core JS file try to make everything that makes sense register through here
	
	
	// add in language options for component elements
	
	// add in responsive logic here .. provide way to register with responsive object
	
	// provide way to register with init handler
	
	// recpatcha loading
	
	// google map loading
	
	// 
	
	
	this.queryString = {};
	var o = this;
	
	
	this.data = {
		language: 'en-CA',
		media: 'screen',
		ticking: {
			page: false,
			table: false
		},
		viewport: {
			width: 0,
			height: 0
		},
		elements: {
			toggleSearch: null,
			toggleMenu: null
		},
		forms: [],
		locations: [],
		tables: [],
		captchas: []
	};
	
	
	/**************************************************************************
	* settings
	* 
	***/
	
	this.settings = {
		debug: false
	};
	
	
	/**************************************************************************
	* labels
	* 
	***/
	
	this.labels = {
		'en-CA': {
			accordion: {
				expand: 'Expand all',
				collapse: 'Collapse all'
			},
			locations: {
				showAll: 'Show all markers',
				showOnMap: 'Show on map',
				searchLabel: 'Select your location',
				searchButton: 'Search'
			}
		},
		'fr-CA': {
			accordion: {
				expand: 'Afficher tout',
				collapse: 'RÃ©duire  tout'
			},
			locations: {
				showAll: 'Tout afficher',
				showOnMap: 'Indiquer sur la carte',
				searchLabel: 'Selectionner votre position',
				searchButton: 'Rechercher'
			}
		},
		'pa-IN': {
			accordion: {
				expand: 'à¨¸à¨¾à¨°à©‡ à¨«à©ˆà¨²à¨¾à¨“',
				collapse: 'à¨¸à¨¾à¨°à©‡ à¨¬à©°à¨¦ à¨•à¨°à©‹'
			},
			locations: {
				showAll: 'à¨¸à¨¾à¨°à©‡ à¨¦à¨¿à¨–à¨¾à¨“',
				showOnMap: 'à¨¨à¨•à¨¶à©‡ à¨¤à©‡ à¨¦à¨¿à¨–à¨¾à¨“',
				searchLabel: 'à¨†à¨ªà¨£à©€ à¨¸à¨¥à¨¿à¨¤à©€ à¨šà©à¨£à©‹',
				searchButton: 'à¨²à©±à¨­à©‹'
			}
		},
		'zh-CN': {
			accordion: {
				expand: 'å…¨éƒ¨å±•å¼€',
				collapse: 'å…¨éƒ¨æŠ˜å '
			},
			locations: {
				showAll: 'æ˜¾ç¤ºå…¨éƒ¨å†…å®¹',
				showOnMap: 'åœ°å›¾ä¸Šæ˜¾ç¤º',
				searchLabel: 'é€‰æ‹©æ‚¨çš„ä½ç½®',
				searchButton: 'æœç´¢'
			}
		},
		'zh-TW': {
			accordion: {
				expand: 'å…¨éƒ¨å±•é–‹',
				collapse: 'å…¨éƒ¨æ‘ºç–Š'
			},
			locations: {
				showAll: 'é¡¯ç¤ºå…¨éƒ¨å…§å®¹',
				showOnMap: 'åœ°åœ–ä¸Šé¡¯ç¤º',
				searchLabel: 'é¸æ“‡æ‚¨çš„ä½ç½®',
				searchButton: 'æœç´¢'
			}
		},
		'es-MX': {
			accordion: {
				expand: 'Expandir todo',
				collapse: 'Colapsar todo'
			},
			locations: {
				showAll: 'Mostrar todo',
				showOnMap: 'Mostrar en un mapa',
				searchLabel: 'Selecciona tu ubicaciÃ³n',
				searchButton: 'Buscar'
			}
		},
		'ar-JO': {
			accordion: {
				expand: 'ØªÙˆØ³ÙŠØ¹ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©',
				collapse: 'ØªØµØºÙŠØ± Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©'
			},
			locations: {
				showAll: 'Ø¥Ø¸Ù‡Ø§Ø± Ø§Ù„ÙƒÙ„',
				showOnMap: 'Ø¥Ø¸Ù‡Ø§Ø± Ø¹Ù„Ù‰ Ø§Ù„Ø®Ø±ÙŠØ·Ø©',
				searchLabel: 'Ø§Ø®ØªØ± Ù…ÙˆÙ‚Ø¹Ùƒ',
				searchButton: 'Ø¥Ø¨Ø­Ø«'
			}
		}
	};
	
	
	
	/**************************************************************************
	* components
	* 
	***/
	
	// .querySelectorAll
	
	this.ui = new function() {
		
		
		/* accordion *********************************************************/
		
		// is some sort of overall state flag required on expand/collapse all links?
			// with one open neither expand or collapse all is true
		
		this.accordion = function() {
			if(o.settings.debug) console.log('[goa.js] accordion');
			
			var divComponent = document.querySelectorAll('div.goa-accordion');
			
			for(var c = 0; c < divComponent.length; c++) {
				var ulItems = divComponent[c].children[0];
				var liItems = ulItems.children;

				if(liItems.length > 1) {
					
					/* toolbar ***/
					
					var divToolbar = document.createElement('div');
					divToolbar.className = 'goa-toolbar';
					
					/* expand all ***/
					
					var aExpandAll = document.createElement('a');
					aExpandAll.appendChild(document.createTextNode(o.labels[o.data.language].accordion.expand));
					aExpandAll.className = 'button-primary expand';
					aExpandAll.href = '#accordion-expandall';
					aExpandAll.onclick = (function(divComponent, liItems) {
						return function() {
							for(var c = 0; c < liItems.length; c++) {
								var divTitle = liItems[c].querySelector('div.goa-title');
								var divText = liItems[c].querySelector('div.goa-text');
								
								/* set state ***/
								
								divTitle.firstChild.setAttribute('aria-expanded', 'true');
								divText.className = divText.className.replace('collapsed', 'expanded');
							};
							return false;
						};
					})(divComponent, liItems);
					
					
					/* collapse all ***/
					
					var aCollapseAll = document.createElement('a');
					aCollapseAll.appendChild(document.createTextNode(o.labels[o.data.language].accordion.collapse));
					aCollapseAll.className = 'button-primary collapse';
					aCollapseAll.href = '#accordion-collapseall';
					aCollapseAll.onclick = (function(divComponent, liItems) {
						return function() {
							for(var c = 0; c < liItems.length; c++) {
								var divTitle = liItems[c].querySelector('div.goa-title');
								var divText = liItems[c].querySelector('div.goa-text');
								
								/* set state ***/
								
								divTitle.firstChild.setAttribute('aria-expanded', 'false');
								divText.className = divText.className.replace('expanded', 'collapsed');
							};
							return false;
						};
					})(divComponent, liItems);
					
					divToolbar.appendChild(aExpandAll);
					divToolbar.appendChild(aCollapseAll);
					
					divComponent[c].insertBefore(divToolbar, divComponent[c].firstChild);
				};
				
				
				/* items ***/
				
				for(c2 = 0; c2 < liItems.length; c2++) {
					var divTitle = liItems[c2].querySelector('div.goa-title');
				
					var divText = liItems[c2].querySelector('div.goa-text');
					divText.className += ' collapsed';
				
					var a = document.createElement('a');
					a.appendChild(divTitle.firstChild);
				
					a.className = '';
					a.href = '?a=accordion';
					a.setAttribute('aria-expanded', 'false');
				
					a.onclick = (function(divText, a) {
						return function() {
							if(divText.className.indexOf('collapsed') > -1) {
								divText.className = divText.className.replace('collapsed', 'expanded');
								a.setAttribute('aria-expanded', 'true');
							} else {
								divText.className = divText.className.replace('expanded', 'collapsed');
								a.setAttribute('aria-expanded', 'false');
							};
						
							return false;
						};
					})(divText, a);
				
					divTitle.appendChild(a);
				};
			};
		};
		
		
		
		/* form **************************************************************/
		
		this.form = function() {
			// inject form stuff and recaptcha script
		};
		
		
		/* locations *********************************************************/
		
		this.locations = function() {
			if(o.settings.debug) console.log('[goa.js] locations');
			
			
			var a = document.querySelectorAll('div.goa-locations');
			
			for(var c = 0; c < a.length; c++) {
				var localities = [];
				var filteredCount = 0;
				
				var m = document.createElement('div');
				m.id = 'map' + c;
				m.className = 'goa-map';
				a[c].insertBefore(m, a[c].firstChild);
				
				var g = new google.maps.Map(m, {
					center: {
						lat: 53.536673247532704,
						lng: -113.50505621957399
					},
					zoom: 12,
					panControl: false,
					mapTypeControl: false,
					streetViewControl: false
				});
				
				var p = [];
				var l = a[c].getElementsByTagName('li');
				
				for (var d = 0; d < l.length; d++) {
					p[d] = {
						m: new google.maps.Marker({
						   map: g,
						   position: {
						       lat: parseFloat(l[d].getElementsByClassName('latitude')[0].innerText), // 53.536673247532704,
						       lng: parseFloat(l[d].getElementsByClassName('longitude')[0].innerText) // -113.50505621957399
						   },
						   title: 'Location details'
						}),
						i: new google.maps.InfoWindow({
						   content: l[d].innerHTML
						})
					};
					
					if(localities.indexOf(l[d].querySelectorAll('[itemprop="addressLocality"]')[0].innerText) == -1) {
						localities.push(l[d].querySelectorAll('[itemprop="addressLocality"]')[0].innerText);
					};
					
					p[d].m.addListener('click', (function(g, p, d) {
						return function() {
						   p[d].i.open(g, p[d].m);
						};
					})(g, p, d));
					
					var b = document.createElement('a');
					b.className = 'goa-cta';
					b.href = '';
					b.onclick = (function(g, p, d, m) {
						return function() {
							location.href = '#' + m.id;
							p[d].i.open(g, p[d].m);
							return false;
						};
					})(g, p, d, m);
					
					b.appendChild(document.createTextNode(o.labels[o.data.language].locations.showOnMap));
					l[d].appendChild(b);
				};
				
				// search/filter
				var divFilterText = document.createElement('div');
				divFilterText.className = 'filterText';
				divFilterText.innerHTML = '<strong>' + l.length + '</strong> location' + (l.length > 1 ? 's' : '') + ' in <strong>all cities</strong> found:';
				
				a[c].insertBefore(divFilterText, m.nextSibling);
				
				var divLocaleFilter = document.createElement('div');
				var formLocaleFilter = document.createElement('form');
				var labelLocaleFilter = document.createElement('label');
				var selectLocaleFilter = document.createElement('select');
				var buttonLocaleFilter = document.createElement('button');
				buttonLocaleFilter.className = 'goa-button';
				
				divLocaleFilter.className = 'goa-form filter';
				
				formLocaleFilter.onsubmit = (function(selectLocaleFilter, divFilterText, p, l) {
					return function() {
						console.log('Filter to: ' + selectLocaleFilter.value);
						
						filteredCount = 0;
				
						for (var c = 0; c < p.length; c++) {
							if(selectLocaleFilter.value == 'All') {
								l[c].className = 'location';
								filteredCount = filteredCount + 1;
							} else {
								if(selectLocaleFilter.value == l[c].querySelectorAll('[itemprop=\'addressLocality\']')[0].innerText) {
									l[c].className = 'location filtered';
									filteredCount = filteredCount + 1;
								} else {
									l[c].className = 'location hidden';
								};
							};
						};
						
						if(selectLocaleFilter.value == 'All') {
							divFilterText.innerHTML =  '<strong>' + l.length + '</strong> location' + (l.length > 1 ? 's' : '') + ' in <strong>all cities</strong> found:';
						} else {
							divFilterText.innerHTML =  '<strong>' + filteredCount + '</strong> location' + (filteredCount > 1 ? 's' : '') + ' near <strong>' + selectLocaleFilter.value + '</strong> found:';
						};
						
						return false;
					}
				})(selectLocaleFilter, divFilterText, p, l);
				
				(function (p, l) {
					return function () {
						for (var c = 0; c < p.length; c++) {
							l[c].className = '';
						};
						return false;
					};
				})(p, l);
				
				selectLocaleFilter.id = 'localeFilter' + c;
				
				labelLocaleFilter.htmlFor = 'localeFilter' + c;
				labelLocaleFilter.appendChild(document.createTextNode(o.labels[o.data.language].locations.searchLabel));
				buttonLocaleFilter.appendChild(document.createTextNode(o.labels[o.data.language].locations.searchButton));
				
				selectLocaleFilter.required = 'required';
				
				var option = document.createElement('option');
				option.text = 'All cities';
				option.value = 'All';
				selectLocaleFilter.add(option);
				
				localities.sort();
				
				for(var oc = 0; oc < localities.length; oc++) {
					var option = document.createElement('option');
					option.text = localities[oc];
					option.value = localities[oc];
					selectLocaleFilter.add(option);
				};
				
				formLocaleFilter.appendChild(labelLocaleFilter);
				formLocaleFilter.appendChild(selectLocaleFilter);
				formLocaleFilter.appendChild(buttonLocaleFilter);
				divLocaleFilter.appendChild(formLocaleFilter);
				
				if(localities.length > 1) {
					a[c].insertBefore(divLocaleFilter, m.nextSibling);
				};
			};
		};
		
		
		/* goa-table *********************************************************/
		
		this.tables = function() {
			if(o.settings.debug) console.log('[goa.js] tables');
			
			
			var divComponents = document.querySelectorAll('div.goa-table');
			
			for(var c = 0; c < divComponents.length; c++) {
				var divComponent = divComponents[c];
				
				var divTableOuter = document.createElement('div');
				divTableOuter.className = 'goa-tableouter';
				
				divComponent.parentNode.insertBefore(divTableOuter, divComponent);
				divTableOuter.appendChild(divComponent);
				
				o.data.tables.push(divTableOuter);
				
				if(divComponent.scrollWidth == divComponent.clientWidth) {
					divTableOuter.className = 'goa-tableouter';
				} else if(divComponent.scrollLeft == 0) {
					divTableOuter.className = 'goa-tableouter goa--start';
				} else if(divComponent.scrollLeft == divComponent.scrollWidth - divComponent.clientWidth) {
					divTableOuter.className = 'goa-tableouter goa--end';
				} else {
					divTableOuter.className = 'goa-tableouter goa--middle';
				};
				
				divTableOuter.firstChild.addEventListener('scroll', (function(divComponent, divTableOuter) {
					return function() {
						if(divComponent.scrollWidth == divComponent.clientWidth) {
							divTableOuter.className = 'goa-tableouter';
						} else if(divComponent.scrollLeft == 0) {
							divTableOuter.className = 'goa-tableouter goa--start';
						} else if(divComponent.scrollLeft == divComponent.scrollWidth - divComponent.clientWidth) {
							divTableOuter.className = 'goa-tableouter goa--end';
						} else {
							divTableOuter.className = 'goa-tableouter goa--middle';
						};
					}
				})(divComponent, divTableOuter), false);
			};
		};
	};
	
	
	
	
	/**************************************************************************
	* init
	* 
	***/
	
	this.init = function(params) {
		if(o.settings.debug) console.log('[goa.js] init');
		
		
		if(params.debug) o.settings.debug = true;
		
		
		/* init ui components ************************************************/
		
		/* goa-locations ***/
		
		o.data.locations = document.querySelectorAll('div.goa-locations');
		
		if(o.data.locations.length > 0) {
			var s = document.createElement('script');
			s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDgDWjTlfR1LjJ74kvBfx8VDZ_ZamSos4M&callback=goa.ui.locations&language=' + o.data.language.slice(0,2) + '&region=' + o.data.language.slice(3,5);
			document.body.appendChild(s);
		};
		
		/* goa-forms ***/
		
		o.data.forms = document.querySelectorAll('div.goa-form');
		
		if(o.data.forms.length > 0) {
			var s = document.createElement('script');
			s.src = 'https://www.google.com/recaptcha/api.js?onload=initAlbertaForms&render=explicit&hl=' + o.data.language;
			document.body.appendChild(s);
		};
		
		o.ui.accordion();
		
		/* tables ***/

		o.ui.tables();		
	};
	
	
	/**************************************************************************
	* constructor
	* 
	***/
	
	(function() {
		if(o.settings.debug) console.log('[goa.js] constructor');
		
		
		/* Array.indexOf polyfill ***/
		
		if(!Array.indexOf){
			Array.prototype.indexOf = function(a, b) {
				var c = 0;
				for(c = (b || 0); c < this.length; c++) {
					if(this[c] == a) {
						return c;
					};
				};
				return -1;
			};
		};
		
		
		/* queryString ***/
		
		var params = location.href.indexOf('?') > -1 ? location.href.slice(location.href.indexOf('?') + 1).split('&') : new Array(); 
		var nameValue = [];
		var c = 0;
		
		for(c = 0; c < params.length; c++) {
			nameValue = params[c].split('=');
			o.queryString[nameValue[0]] = nameValue[1];
		};
		
		/* html ***/
		
		var html = document.querySelectorAll('html')[0];
		html.className = html.className.replace('nojs', 'js');
		
		/* language ***/
		
		o.data.language = html.lang;
	
		html.className += ' goa-scrollup';
		
		
		var previousPosition = 0;
		
		function scrollTest() {
			var currentPosition = document.documentElement.scrollTop + document.body.scrollTop;
			if(currentPosition > previousPosition && currentPosition > 160) {
				html.className = html.className.replace('goa-scrollup', 'goa-scrolldown');
			} else {
				html.className = html.className.replace('goa-scrolldown', 'goa-scrollup');
			};
			previousPosition = currentPosition;
		};
		
		window.addEventListener('scroll', scrollTest, false);
	})();
};


initAlbertaForms = function() {
	if(goa && !location.href.match(/^(file:)/ig)) {
		for(var c = 0; c < goa.data.forms.length; c++) {
			var holder = goa.data.forms[c].querySelector('div.recaptcha');

			if(holder) {
				goa.data.captchas.push(grecaptcha.render(holder, {
					'sitekey': '6Le0WxsTAAAAABU25_hDRbaESb8fA3YDDG4VkYY0'
				}));
			};
		};
	};
};