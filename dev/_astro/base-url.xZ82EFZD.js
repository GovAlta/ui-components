const s="/";function i(t){if(!t)return s;if(t.startsWith("http://")||t.startsWith("https://"))return t;const r=t.startsWith("/")?t.slice(1):t;return`${s}${r}`}export{i as w};
