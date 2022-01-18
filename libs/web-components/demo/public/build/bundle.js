
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }
    function attribute_to_object(attributes) {
        const result = {};
        for (const attribute of attributes) {
            result[attribute.name] = attribute.value;
        }
        return result;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    let SvelteElement;
    if (typeof HTMLElement === 'function') {
        SvelteElement = class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            connectedCallback() {
                const { on_mount } = this.$$;
                this.$$.on_disconnect = on_mount.map(run).filter(is_function);
                // @ts-ignore todo: improve typings
                for (const key in this.$$.slotted) {
                    // @ts-ignore todo: improve typings
                    this.appendChild(this.$$.slotted[key]);
                }
            }
            attributeChangedCallback(attr, _oldValue, newValue) {
                this[attr] = newValue;
            }
            disconnectedCallback() {
                run_all(this.$$.on_disconnect);
            }
            $destroy() {
                destroy_component(this, 1);
                this.$destroy = noop;
            }
            $on(type, callback) {
                // TODO should this delegate to addEventListener?
                const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
                callbacks.push(callback);
                return () => {
                    const index = callbacks.indexOf(callback);
                    if (index !== -1)
                        callbacks.splice(index, 1);
                };
            }
            $set($$props) {
                if (this.$$set && !is_empty($$props)) {
                    this.$$.skip_bound = true;
                    this.$$set($$props);
                    this.$$.skip_bound = false;
                }
            }
        };
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/PageBlock.wc.svelte generated by Svelte v3.46.2 */

    const file$w = "src/PageBlock.wc.svelte";

    function create_fragment$w(ctx) {
    	let div;
    	let slot;

    	const block = {
    		c: function create() {
    			div = element("div");
    			slot = element("slot");
    			this.c = noop;
    			add_location(slot, file$w, 7, 2, 129);
    			attr_dev(div, "class", "page-content");
    			add_location(div, file$w, 6, 0, 100);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, slot);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-page-block', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-page-block> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class PageBlock_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.page-content{max-width:100%;margin:0 auto;padding:0 1.75rem}@media(min-width: 768px){.page-content{max-width:80vh}}@media(min-width: 1024px){.page-content{max-width:100ch}}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$w,
    			create_fragment$w,
    			safe_not_equal,
    			{},
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}
    		}
    	}
    }

    customElements.define("goa-page-block", PageBlock_wc);

    /* src/app-header/AppHeader.wc.svelte generated by Svelte v3.46.2 */

    const file$v = "src/app-header/AppHeader.wc.svelte";

    function create_fragment$v(ctx) {
    	let goa_page_block;
    	let div1;
    	let a;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let span;
    	let t2;
    	let t3;
    	let div0;
    	let slot;

    	const block = {
    		c: function create() {
    			goa_page_block = element("goa-page-block");
    			div1 = element("div");
    			a = element("a");
    			img0 = element("img");
    			t0 = space();
    			img1 = element("img");
    			t1 = space();
    			span = element("span");
    			t2 = text(/*title*/ ctx[1]);
    			t3 = space();
    			div0 = element("div");
    			slot = element("slot");
    			this.c = noop;
    			attr_dev(img0, "alt", "GoA Logo");
    			attr_dev(img0, "class", "image-mobile");
    			if (!src_url_equal(img0.src, img0_src_value = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='16' height='16' viewBox='0 0 16 16'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:none;%7D.b%7Bfill:%2300aad2;%7D.c%7Bclip-path:url(%23a);%7D.d%7Bfill:%23fff;%7D%3C/style%3E%3CclipPath id='a'%3E%3Crect class='a' width='14' height='14' transform='translate(-0.345 -0.21)'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg transform='translate(0 -0.135)'%3E%3Ccircle class='b' cx='8' cy='8' r='8' transform='translate(0 0.135)'/%3E%3Cg transform='translate(1.345 1.344)'%3E%3Cg class='c' transform='translate(0 0)'%3E%3Cpath class='d' d='M12.612,13.636a16.24,16.24,0,0,1-1.86-.822,13.436,13.436,0,0,0,1.6-.708,11.312,11.312,0,0,0,.264,1.53M16.032,7.3c-.266-.034-.128.091-.2.442a5.465,5.465,0,0,1-2.8,3.338,16.141,16.141,0,0,1,.249-4.84c.275-1,.6-.813.2-1.022-.427-.22-.887.071-1.258.813A27.247,27.247,0,0,1,7.4,13.522a2.141,2.141,0,0,1-2.918.461c-.206-.174-.282.095-.026.37a2.412,2.412,0,0,0,3.387-.082A32.715,32.715,0,0,0,12.219,7.51a23.541,23.541,0,0,0,.063,3.971,11.464,11.464,0,0,1-1.964.749c-.388.1-.628.26-.635.439-.007.2.253.363.63.541.67.318,2.633,1.246,3.117,1.527.414.24.616.053.739-.207.16-.338-.279-.533-.7-.661a13.175,13.175,0,0,1-.382-2.179,7.143,7.143,0,0,0,2.547-2.454,4.7,4.7,0,0,0,.4-1.133,2.125,2.125,0,0,0,.048-.742s-.007-.054-.048-.059' transform='translate(-3.51 -3.943)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$v, 11, 6, 220);
    			attr_dev(img1, "alt", "GoA Logo");
    			attr_dev(img1, "class", "image-desktop");
    			if (!src_url_equal(img1.src, img1_src_value = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='149.351' height='42' viewBox='0 0 149.351 42'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:none;%7D.b%7Bclip-path:url(%23a);%7D.c%7Bfill:%2300aad2;%7D.d%7Bfill:%235f6a72;%7D%3C/style%3E%3CclipPath id='a'%3E%3Crect class='a' width='149.351' height='42'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg class='b'%3E%3Crect class='c' width='13.555' height='13.555' transform='translate(135.796 21.524)'/%3E%3Cpath class='d' d='M63.082,33.088c-1.383.138-2.835.277-4.357.346.553-4.357,2.835-10.373,5.671-9.405,1.66.553.761,5.671-1.314,9.059m-3.527,2.974a3.761,3.761,0,0,1-1.245,0,.851.851,0,0,0,.346-.692v-.553c.761,0,1.936-.138,3.389-.277a4.327,4.327,0,0,1-2.49,1.521M76.844,25.688c1.8-1.66,2.7-1.521,2.9-1.106.484.968-1.591,4.357-5.671,6.224a10.328,10.328,0,0,1,2.766-5.118m66.736,1.66c-.207-3.389-3.181-3.942-3.6-2.974-.138.346,1.106.207,1.106,2.628,0,3.942-4.011,9.129-9.129,9.129-5.532,0-6.985-4.357-7.261-6.432-.207-1.452.138-3.458-2.351-3.181-1.729.207-3.25,3.527-5.463,6.362-1.867,2.42-2.7,2.213-2.282.138.553-2.628,2.7-8.714,5.187-9.129,1.176-.207,1.591,1.8,2.075.553s.069-4.011-2.559-4.011c-1.8,0-3.942,1.936-5.74,4.08-1.521,1.936-9.336,13.416-12.656,10.927-1.521-1.176-1.383-5.878-.415-11.411,3.873-1.521,7.123-1.037,8.921-.138.9.415,1.037.346.622-.622-.553-1.452-3.665-3.734-8.575-2.7-.138,0-.207.069-.346.069.415-1.8.83-3.665,1.383-5.463.484-1.66,1.8-4.5-1.729-4.979-1.106-.207-.622.346-1.037,1.867-.692,2.766-1.521,6.362-2.144,10.028a19.745,19.745,0,0,0-7.538,8.091,38.59,38.59,0,0,0,.9-4.772,1.589,1.589,0,0,0-1.245-1.729c-.761-.207-1.729.138-2.628,1.452-2.144,3.043-4.841,7.815-8.99,9.82-2.974,1.452-4.288,0-4.357-2.282a9.869,9.869,0,0,0,1.521-.553c5.394-2.351,7.192-5.947,5.878-8.16-1.314-2.075-4.979-1.452-7.953,1.66a11.175,11.175,0,0,0-2.7,6.5c-1.245.277-2.628.484-4.219.692,2.49-4.08,2.282-9.613-1.383-10.581-4.288-1.106-6.432,3.043-7.331,6.5.346-3.873.9-7.745,1.591-11.549.346-1.66,1.452-4.5-2.075-4.979-1.106-.207-.968.346-.9,1.867.138,2.075-2.144,14.454-.968,19.848-1.521.484-2.144,1.66-.207,2.835,1.383.83,4.357,1.106,7.331-.346a9.3,9.3,0,0,0,2.766-2.144c1.8-.207,3.665-.553,5.394-.83.277,2.42,1.867,4.219,5.463,3.873,5.118-.484,9.682-6.777,11.411-9.82-.346,3.25-2.42,10.373,1.176,10.028,1.383-.138.83-.346.9-1.591.346-4.288,3.873-7.953,7.4-10.166-.622,5.256-.415,9.958,2.006,11.411,4.426,2.766,10.581-4.5,14.039-8.921-1.729,3.942-2.7,8.921-.138,9.682,3.043.9,5.463-4.219,8.3-8.091.346,2.766,2.213,7.607,9.682,7.607,8.022-.069,13.071-4.91,12.863-10.1m-108.3,8.645A66.439,66.439,0,0,1,27.4,32.534a59.168,59.168,0,0,0,6.777-2.974,54.453,54.453,0,0,0,1.106,6.432m20.4,3.873c-.069-.207-.622.069-1.106,0-1.452-.207-3.389-2.213-3.942-5.463-1.037-5.878-.415-11.687,1.314-20.332.346-1.66,1.452-4.5-2.075-5.048-1.106-.138-.553.415-.83,1.867C47.66,17.32,42.4,21.954,37.149,25.066,36.6,17.735,36.8,9.505,38.186,4.526c1.176-4.219,2.559-3.458.83-4.357s-3.734.277-5.325,3.458S24.839,23.89,13.221,35.439C7.273,41.317,1.879,38.274.842,37.375c-.9-.761-1.176.415-.138,1.591,4.772,5.256,11.826,2.282,14.384-.277,7.054-7.054,15.283-22.268,18.6-28.7a98.251,98.251,0,0,0,.277,16.874,50.129,50.129,0,0,1-8.3,3.181c-1.66.415-2.7,1.106-2.7,1.867s1.106,1.521,2.7,2.282c2.835,1.383,11.2,5.256,13.209,6.5,1.729,1.037,2.628.207,3.112-.9.692-1.452-1.176-2.282-2.974-2.766a60.545,60.545,0,0,1-1.66-9.267c4.219-2.628,8.437-6.086,10.788-10.443C47.522,20.916,46,33.3,49.873,38.482a5.451,5.451,0,0,0,4.564,2.213c.968-.069,1.383-.692,1.245-.83' transform='translate(-0.038 0.124)'/%3E%3C/g%3E%3C/svg%3E")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file$v, 16, 6, 1718);
    			attr_dev(span, "class", "title");
    			add_location(span, file$v, 21, 6, 5375);
    			attr_dev(a, "href", /*url*/ ctx[0]);
    			attr_dev(a, "class", "app-link");
    			add_location(a, file$v, 10, 4, 182);
    			add_location(slot, file$v, 26, 6, 5451);
    			add_location(div0, file$v, 25, 4, 5439);
    			attr_dev(div1, "class", "app-header");
    			add_location(div1, file$v, 9, 2, 153);
    			add_location(goa_page_block, file$v, 8, 0, 134);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, goa_page_block, anchor);
    			append_dev(goa_page_block, div1);
    			append_dev(div1, a);
    			append_dev(a, img0);
    			append_dev(a, t0);
    			append_dev(a, img1);
    			append_dev(a, t1);
    			append_dev(a, span);
    			append_dev(span, t2);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, slot);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 2) set_data_dev(t2, /*title*/ ctx[1]);

    			if (dirty & /*url*/ 1) {
    				attr_dev(a, "href", /*url*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(goa_page_block);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-app-header', slots, []);
    	let { url } = $$props;
    	let { title } = $$props;
    	const writable_props = ['url', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-app-header> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ url, title });

    	$$self.$inject_state = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url, title];
    }

    class AppHeader_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>:host{font-family:var(--font-family)}.app-header{display:flex;align-items:center;justify-content:space-between;margin:0 auto;padding:1rem 0;max-width:1028px;border-bottom:1px solid var(--color-gray-100)}.app-link{display:flex;align-items:center;text-decoration:none;color:inherit}.title{margin-left:0.5rem;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.image-desktop{display:none}.image-mobile{display:block}@media(min-width: 768px){.image-desktop{display:block}.image-mobile{display:none}.title{margin-left:1.75rem}.image-desktop{display:block}.image-mobile{display:none}}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$v,
    			create_fragment$v,
    			safe_not_equal,
    			{ url: 0, title: 1 },
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*url*/ ctx[0] === undefined && !('url' in props)) {
    			console.warn("<goa-app-header> was created without expected prop 'url'");
    		}

    		if (/*title*/ ctx[1] === undefined && !('title' in props)) {
    			console.warn("<goa-app-header> was created without expected prop 'title'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["url", "title"];
    	}

    	get url() {
    		return this.$$.ctx[0];
    	}

    	set url(url) {
    		this.$$set({ url });
    		flush();
    	}

    	get title() {
    		return this.$$.ctx[1];
    	}

    	set title(title) {
    		this.$$set({ title });
    		flush();
    	}
    }

    customElements.define("goa-app-header", AppHeader_wc);

    function toBoolean(value) {
        // this is how false will need to be represented
        if (value === "false") {
            return false;
        }
        // for element props empty strings are also a true value
        // ex. <input type="text" disabled />  /* is a disabled input */
        if (value === "") {
            return true;
        }
        return !!value;
    }
    function fromBoolean(value) {
        return value ? "true" : "false";
    }

    /* src/badge/Badge.wc.svelte generated by Svelte v3.46.2 */
    const file$u = "src/badge/Badge.wc.svelte";

    // (35:2) {#if showIcon}
    function create_if_block_1$8(ctx) {
    	let goa_icon;

    	const block = {
    		c: function create() {
    			goa_icon = element("goa-icon");
    			set_custom_element_data(goa_icon, "type", /*iconType*/ ctx[3]);
    			set_custom_element_data(goa_icon, "size", "small");
    			add_location(goa_icon, file$u, 35, 4, 874);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, goa_icon, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*iconType*/ 8) {
    				set_custom_element_data(goa_icon, "type", /*iconType*/ ctx[3]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(goa_icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$8.name,
    		type: "if",
    		source: "(35:2) {#if showIcon}",
    		ctx
    	});

    	return block;
    }

    // (38:2) {#if content}
    function create_if_block$b(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*content*/ ctx[2]);
    			attr_dev(div, "class", "goa-badge-content");
    			add_location(div, file$u, 38, 4, 944);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*content*/ 4) set_data_dev(t, /*content*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(38:2) {#if content}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$u(ctx) {
    	let div;
    	let t;
    	let div_class_value;
    	let if_block0 = /*showIcon*/ ctx[4] && create_if_block_1$8(ctx);
    	let if_block1 = /*content*/ ctx[2] && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			this.c = noop;
    			attr_dev(div, "data-testid", /*testId*/ ctx[1]);
    			attr_dev(div, "data-type", "goa-badge");
    			attr_dev(div, "class", div_class_value = "goa-badge badge-" + /*type*/ ctx[0]);
    			toggle_class(div, "icon-only", /*showIcon*/ ctx[4] && !/*content*/ ctx[2]);
    			add_location(div, file$u, 28, 0, 725);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t);
    			if (if_block1) if_block1.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*showIcon*/ ctx[4]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$8(ctx);
    					if_block0.c();
    					if_block0.m(div, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*content*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$b(ctx);
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*testId*/ 2) {
    				attr_dev(div, "data-testid", /*testId*/ ctx[1]);
    			}

    			if (dirty & /*type*/ 1 && div_class_value !== (div_class_value = "goa-badge badge-" + /*type*/ ctx[0])) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*type, showIcon, content*/ 21) {
    				toggle_class(div, "icon-only", /*showIcon*/ ctx[4] && !/*content*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	let showIcon;
    	let iconType;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-badge', slots, []);
    	let { type } = $$props;
    	let { testId = "" } = $$props;
    	let { icon } = $$props;
    	let { content = "" } = $$props;
    	const writable_props = ['type', 'testId', 'icon', 'content'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-badge> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('testId' in $$props) $$invalidate(1, testId = $$props.testId);
    		if ('icon' in $$props) $$invalidate(5, icon = $$props.icon);
    		if ('content' in $$props) $$invalidate(2, content = $$props.content);
    	};

    	$$self.$capture_state = () => ({
    		toBoolean,
    		type,
    		testId,
    		icon,
    		content,
    		iconType,
    		showIcon
    	});

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('testId' in $$props) $$invalidate(1, testId = $$props.testId);
    		if ('icon' in $$props) $$invalidate(5, icon = $$props.icon);
    		if ('content' in $$props) $$invalidate(2, content = $$props.content);
    		if ('iconType' in $$props) $$invalidate(3, iconType = $$props.iconType);
    		if ('showIcon' in $$props) $$invalidate(4, showIcon = $$props.showIcon);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*icon*/ 32) {
    			// export let icon: WCBoolean = WC_FALSE;
    			$$invalidate(4, showIcon = toBoolean(icon));
    		}

    		if ($$self.$$.dirty & /*type*/ 1) {
    			$$invalidate(3, iconType = ({
    				success: "checkmark-circle",
    				warning: "alert-circle",
    				information: "information-circle",
    				emergency: "warning",
    				inactive: "information-circle",
    				dark: "information-circle",
    				midtone: "information-circle",
    				light: "information-circle"
    			})[type]);
    		}
    	};

    	return [type, testId, content, iconType, showIcon, icon];
    }

    class Badge_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>:host{box-sizing:border-box}.goa-badge{display:inline-flex;align-items:center;border-radius:0.25rem;padding:3px 0.5rem;gap:0.25rem}.icon-only{padding:0.25rem}.goa-badge-content{text-transform:capitalize;font-size:var(--fs-sm);line-height:var(--lh-sm)}.goa-badge.badge-information{background-color:var(--color-white);color:var(--color-blue)}.goa-badge.badge-success{background-color:var(--color-green);color:var(--color-white)}.goa-badge.badge-warning{background-color:var(--color-orange);color:var(--color-black)}.goa-badge.badge-emergency{background-color:var(--color-red);color:var(--color-white)}.goa-badge.badge-dark{background-color:var(--color-gray-900);color:var(--color-white)}.goa-badge.badge-midtone{background-color:var(--color-gray-600);color:var(--color-white)}.goa-badge.badge-light{background-color:var(--color-white);color:var(--color-black)}.goa-badge.badge-inactive{background-color:var(--color-white);color:var(--color-black)}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$u,
    			create_fragment$u,
    			safe_not_equal,
    			{ type: 0, testId: 1, icon: 5, content: 2 },
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*type*/ ctx[0] === undefined && !('type' in props)) {
    			console.warn("<goa-badge> was created without expected prop 'type'");
    		}

    		if (/*icon*/ ctx[5] === undefined && !('icon' in props)) {
    			console.warn("<goa-badge> was created without expected prop 'icon'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["type", "testId", "icon", "content"];
    	}

    	get type() {
    		return this.$$.ctx[0];
    	}

    	set type(type) {
    		this.$$set({ type });
    		flush();
    	}

    	get testId() {
    		return this.$$.ctx[1];
    	}

    	set testId(testId) {
    		this.$$set({ testId });
    		flush();
    	}

    	get icon() {
    		return this.$$.ctx[5];
    	}

    	set icon(icon) {
    		this.$$set({ icon });
    		flush();
    	}

    	get content() {
    		return this.$$.ctx[2];
    	}

    	set content(content) {
    		this.$$set({ content });
    		flush();
    	}
    }

    customElements.define("goa-badge", Badge_wc);

    /* src/Button.wc.svelte generated by Svelte v3.46.2 */
    const file$t = "src/Button.wc.svelte";

    function create_fragment$t(ctx) {
    	let button;
    	let slot;
    	let button_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			slot = element("slot");
    			this.c = noop;
    			add_location(slot, file$t, 27, 2, 928);
    			attr_dev(button, "class", button_class_value = "" + (/*type*/ ctx[0] + " " + /*size*/ ctx[1] + " " + /*variant*/ ctx[2]));
    			attr_dev(button, "title", /*title*/ ctx[3]);
    			button.disabled = /*isDisabled*/ ctx[4];
    			add_location(button, file$t, 21, 0, 822);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, slot);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", clickHandler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*type, size, variant*/ 7 && button_class_value !== (button_class_value = "" + (/*type*/ ctx[0] + " " + /*size*/ ctx[1] + " " + /*variant*/ ctx[2]))) {
    				attr_dev(button, "class", button_class_value);
    			}

    			if (dirty & /*title*/ 8) {
    				attr_dev(button, "title", /*title*/ ctx[3]);
    			}

    			if (dirty & /*isDisabled*/ 16) {
    				prop_dev(button, "disabled", /*isDisabled*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function clickHandler(e) {
    	this.dispatchEvent(new CustomEvent("_click", { composed: true, bubbles: true }));
    	e.stopPropagation();
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let isDisabled;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-button', slots, []);
    	let { type = "primary" } = $$props;
    	let { size = "medium" } = $$props;
    	let { variant = "default" } = $$props;
    	let { title } = $$props;
    	let { disabled } = $$props;
    	const writable_props = ['type', 'size', 'variant', 'title', 'disabled'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('variant' in $$props) $$invalidate(2, variant = $$props.variant);
    		if ('title' in $$props) $$invalidate(3, title = $$props.title);
    		if ('disabled' in $$props) $$invalidate(5, disabled = $$props.disabled);
    	};

    	$$self.$capture_state = () => ({
    		toBoolean,
    		type,
    		size,
    		variant,
    		title,
    		disabled,
    		clickHandler,
    		isDisabled
    	});

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('variant' in $$props) $$invalidate(2, variant = $$props.variant);
    		if ('title' in $$props) $$invalidate(3, title = $$props.title);
    		if ('disabled' in $$props) $$invalidate(5, disabled = $$props.disabled);
    		if ('isDisabled' in $$props) $$invalidate(4, isDisabled = $$props.isDisabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*disabled*/ 32) {
    			// export let type: ButtonType = "primary";
    			// export let size: ButtonSize =  "medium";
    			// export let variant: ButtonVariant = "default";
    			// export let title: string = "";
    			// export let disabled: WCBoolean = WC_FALSE;
    			$$invalidate(4, isDisabled = toBoolean(disabled));
    		}
    	};

    	return [type, size, variant, title, isDisabled, disabled];
    }

    class Button_wc extends SvelteElement {
    	constructor(options) {
    		super();

    		this.shadowRoot.innerHTML = `<style>@media(max-width: 320px){:host{width:100%}button{width:100%}}button{border-radius:0.25rem;border:2px solid var(--color-blue-500, "blue");box-sizing:border-box;cursor:pointer;font-size:var(--fs-base, 1rem);font-weight:700;line-height:2.375rem;padding:0 0.75rem;min-width:5rem;transition:transform 0.1s ease-in-out, background-color 0.2s ease-in-out,
      border-color 0.2s ease-in-out;transform:scaleX(1)}button:active{transform:scale(0.95)}button.primary{border:2px solid var(--color-blue-500, blue);background:var(--color-blue-500, blue);color:var(--color-white, white)}button.primary:hover{border-color:var(--color-blue-600);background:var(--color-blue-600)}button.primary:focus,button.primary:active{border-color:var(--color-blue-600);box-shadow:0 0 0 3px var(--color-orange-500);background:var(--color-blue-600);outline:none}button.secondary{border:2px solid var(--color-blue-500, blue);background:var(--color-blue-500, blue);color:var(--color-white, white)}button.secondary:hover{border-color:var(--color-blue-600);background:var(--color-blue-600)}button.secondary:focus,button.secondary:active{border-color:var(--color-blue-600);box-shadow:0 0 0 3px var(--color-orange-500);background:var(--color-blue-600);outline:none}button.tertiary{border-color:var(--color-gray-200);background:var(--color-white);color:var(--color-blue-500)}button.tertiary:hover{color:var(--color-blue-600)}button.tertiary:focus,button.tertiary:active{border-color:var(--color-blue-600);color:var(--color-blue-600);box-shadow:0 0 0 3px var(--color-orange-500);outline:none}button.borderless{background:none;color:var(--color-blue-500);border:none}button.borderless:hover{background-color:var(--color-blue-100);color:var(--color-blue-500)}button.borderless:focus,button.borderless:active{outline:none;box-shadow:none;background-color:var(--color-blue-100)}.primary.danger{color:var(--color-white);background:var(--color-red-500);border-color:var(--color-red-500)}.primary.danger:hover{background:var(--color-red-600);border-color:var(--color-red-600)}.primary.danger:focus,.primary.danger:active{background:var(--color-red-600);border-color:var(--color-red-600)}.secondary.danger{color:var(--color-red-500);border-color:var(--color-red-500);background:var(--color-white)}.secondary.danger:hover{border-color:var(--color-red-600);color:var(--color-red-600);background:var(--color-white)}.secondary.danger:focus,.secondary.danger:active{color:var(--color-red-600);border-color:var(--color-red-600);background:var(--color-white)}button:disabled{pointer-events:none;color:var(--color-gray-700);background-color:var(--color-gray-100);border-color:var(--color-gray-100)}.tertiary.danger{color:var(--color-red-500);border-color:var(--color-gray-200);background:var(--color-white)}.tertiary.danger:hover{border-color:var(--color-red-600);color:var(--color-red-600);background:var(--color-white)}.tertiary.danger:focus,.tertiary.danger:active{color:var(--color-red-600);border-color:var(--color-red-600);background:var(--color-white)}.borderless.danger{color:var(--color-red-500)}.borderless.danger:hover{background:var(--color-red-100);color:var(--color-red-500)}.borderless.danger:focus,.borderless.danger:active{background:var(--color-red-100);color:var(--color-red-500)}.large{font-size:var(--fs-lg);line-height:3rem}.large.borderless{line-height:calc(3rem + 4px)}.medium{font-size:var(--fs-base);line-height:2.375rem}.medium.borderless{line-height:calc(2.375rem + 4px)}.small{font-size:var(--fs-sm);line-height:1.75rem}.small.borderless{line-height:calc(1.75rem + 4px)}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$t,
    			create_fragment$t,
    			safe_not_equal,
    			{
    				type: 0,
    				size: 1,
    				variant: 2,
    				title: 3,
    				disabled: 5
    			},
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*title*/ ctx[3] === undefined && !('title' in props)) {
    			console.warn("<goa-button> was created without expected prop 'title'");
    		}

    		if (/*disabled*/ ctx[5] === undefined && !('disabled' in props)) {
    			console.warn("<goa-button> was created without expected prop 'disabled'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["type", "size", "variant", "title", "disabled"];
    	}

    	get type() {
    		return this.$$.ctx[0];
    	}

    	set type(type) {
    		this.$$set({ type });
    		flush();
    	}

    	get size() {
    		return this.$$.ctx[1];
    	}

    	set size(size) {
    		this.$$set({ size });
    		flush();
    	}

    	get variant() {
    		return this.$$.ctx[2];
    	}

    	set variant(variant) {
    		this.$$set({ variant });
    		flush();
    	}

    	get title() {
    		return this.$$.ctx[3];
    	}

    	set title(title) {
    		this.$$set({ title });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[5];
    	}

    	set disabled(disabled) {
    		this.$$set({ disabled });
    		flush();
    	}
    }

    customElements.define("goa-button", Button_wc);

    /* src/ButtonGroup.wc.svelte generated by Svelte v3.46.2 */

    const file$s = "src/ButtonGroup.wc.svelte";

    function create_fragment$s(ctx) {
    	let div;
    	let slot;

    	const block = {
    		c: function create() {
    			div = element("div");
    			slot = element("slot");
    			this.c = noop;
    			add_location(slot, file$s, 10, 2, 297);
    			set_style(div, "--alignment", "flex-" + /*alignment*/ ctx[0]);
    			add_location(div, file$s, 9, 0, 250);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, slot);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*alignment*/ 1) {
    				set_style(div, "--alignment", "flex-" + /*alignment*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-button-group', slots, []);
    	let { alignment } = $$props;
    	const writable_props = ['alignment'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-button-group> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('alignment' in $$props) $$invalidate(0, alignment = $$props.alignment);
    	};

    	$$self.$capture_state = () => ({ alignment });

    	$$self.$inject_state = $$props => {
    		if ('alignment' in $$props) $$invalidate(0, alignment = $$props.alignment);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [alignment];
    }

    class ButtonGroup_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>div{display:flex;flex-direction:row;justify-content:var(--alignment);flex-wrap:wrap;gap:0.5rem}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$s,
    			create_fragment$s,
    			safe_not_equal,
    			{ alignment: 0 },
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*alignment*/ ctx[0] === undefined && !('alignment' in props)) {
    			console.warn("<goa-button-group> was created without expected prop 'alignment'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["alignment"];
    	}

    	get alignment() {
    		return this.$$.ctx[0];
    	}

    	set alignment(alignment) {
    		this.$$set({ alignment });
    		flush();
    	}
    }

    customElements.define("goa-button-group", ButtonGroup_wc);

    /* src/Callout.wc.svelte generated by Svelte v3.46.2 */

    const file$r = "src/Callout.wc.svelte";

    function create_fragment$r(ctx) {
    	let div;
    	let span0;
    	let goa_icon;
    	let span0_class_value;
    	let t0;
    	let span1;
    	let h2;
    	let t1;
    	let t2;
    	let slot;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			goa_icon = element("goa-icon");
    			t0 = space();
    			span1 = element("span");
    			h2 = element("h2");
    			t1 = text(/*title*/ ctx[1]);
    			t2 = space();
    			slot = element("slot");
    			this.c = noop;
    			set_custom_element_data(goa_icon, "type", /*iconType*/ ctx[2]);
    			set_custom_element_data(goa_icon, "inverted", "");
    			add_location(goa_icon, file$r, 24, 4, 667);
    			attr_dev(span0, "class", span0_class_value = "icon " + /*type*/ ctx[0]);
    			add_location(span0, file$r, 23, 2, 636);
    			add_location(h2, file$r, 27, 4, 744);
    			add_location(slot, file$r, 28, 4, 765);
    			attr_dev(span1, "class", "content");
    			add_location(span1, file$r, 26, 2, 717);
    			attr_dev(div, "class", "notification");
    			add_location(div, file$r, 22, 0, 607);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, goa_icon);
    			append_dev(div, t0);
    			append_dev(div, span1);
    			append_dev(span1, h2);
    			append_dev(h2, t1);
    			append_dev(span1, t2);
    			append_dev(span1, slot);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*iconType*/ 4) {
    				set_custom_element_data(goa_icon, "type", /*iconType*/ ctx[2]);
    			}

    			if (dirty & /*type*/ 1 && span0_class_value !== (span0_class_value = "icon " + /*type*/ ctx[0])) {
    				attr_dev(span0, "class", span0_class_value);
    			}

    			if (dirty & /*title*/ 2) set_data_dev(t1, /*title*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let iconType;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-callout', slots, []);
    	let { type } = $$props;
    	let { title } = $$props;
    	const writable_props = ['type', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-callout> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ type, title, iconType });

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('iconType' in $$props) $$invalidate(2, iconType = $$props.iconType);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*type*/ 1) {
    			$$invalidate(2, iconType = type === "emergency"
    			? "warning"
    			: type === "caution"
    				? "alert-circle"
    				: type === "information"
    					? "information-circle"
    					: type === "success"
    						? "checkmark-circle"
    						: type === "event" ? "calendar" : "");
    		}
    	};

    	return [type, title, iconType];
    }

    class Callout_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.notification{display:flex;align-items:stretch;border-radius:3px;overflow:hidden;margin-bottom:1.75rem}h2{font-size:var(--fs-xl);font-weight:var(--fw-regular);margin-top:0}.emergency{background-color:var(--color-red);color:var(--color-white)}.caution{background-color:var(--color-orange)}.information{background-color:var(--color-blue);color:var(--color-white)}.event{background-color:var(--color-blue);color:var(--color-white)}.success{background-color:var(--color-green);color:var(--color-white)}.icon{flex:0 0 3rem;text-align:center;padding-top:1.75rem}.content{flex:1 1 auto;background-color:var(--color-gray-100);padding:1.75rem}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$r,
    			create_fragment$r,
    			safe_not_equal,
    			{ type: 0, title: 1 },
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*type*/ ctx[0] === undefined && !('type' in props)) {
    			console.warn("<goa-callout> was created without expected prop 'type'");
    		}

    		if (/*title*/ ctx[1] === undefined && !('title' in props)) {
    			console.warn("<goa-callout> was created without expected prop 'title'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["type", "title"];
    	}

    	get type() {
    		return this.$$.ctx[0];
    	}

    	set type(type) {
    		this.$$set({ type });
    		flush();
    	}

    	get title() {
    		return this.$$.ctx[1];
    	}

    	set title(title) {
    		this.$$set({ title });
    		flush();
    	}
    }

    customElements.define("goa-callout", Callout_wc);

    /* src/Card.wc.svelte generated by Svelte v3.46.2 */

    const file$q = "src/Card.wc.svelte";

    function create_fragment$q(ctx) {
    	let div;
    	let slot;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			slot = element("slot");
    			this.c = noop;
    			add_location(slot, file$q, 17, 2, 334);
    			attr_dev(div, "class", "card");

    			attr_dev(div, "style", div_style_value = "--width: " + /*width*/ ctx[1] + "px; " + (/*elevation*/ ctx[0] === 0
    			? `border: 1px solid var(--color-gray-200);`
    			: `box-shadow: var(--shadow-${/*elevation*/ ctx[0]});`) + "");

    			add_location(div, file$q, 8, 0, 144);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, slot);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*width, elevation*/ 3 && div_style_value !== (div_style_value = "--width: " + /*width*/ ctx[1] + "px; " + (/*elevation*/ ctx[0] === 0
    			? `border: 1px solid var(--color-gray-200);`
    			: `box-shadow: var(--shadow-${/*elevation*/ ctx[0]});`) + "")) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-card', slots, []);
    	let { elevation = 0 } = $$props;
    	let { width = 320 } = $$props;
    	const writable_props = ['elevation', 'width'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-card> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('elevation' in $$props) $$invalidate(0, elevation = $$props.elevation);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    	};

    	$$self.$capture_state = () => ({ elevation, width });

    	$$self.$inject_state = $$props => {
    		if ('elevation' in $$props) $$invalidate(0, elevation = $$props.elevation);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [elevation, width];
    }

    class Card_wc extends SvelteElement {
    	constructor(options) {
    		super();

    		this.shadowRoot.innerHTML = `<style>.card{display:flex;flex-direction:column;background-color:var(--color-white);border-radius:4px;overflow:hidden;width:100%}@media(min-width: 320px){.card{width:var(--width);margin:0 auto
    }}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$q,
    			create_fragment$q,
    			safe_not_equal,
    			{ elevation: 0, width: 1 },
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["elevation", "width"];
    	}

    	get elevation() {
    		return this.$$.ctx[0];
    	}

    	set elevation(elevation) {
    		this.$$set({ elevation });
    		flush();
    	}

    	get width() {
    		return this.$$.ctx[1];
    	}

    	set width(width) {
    		this.$$set({ width });
    		flush();
    	}
    }

    customElements.define("goa-card", Card_wc);

    /* src/CardActions.wc.svelte generated by Svelte v3.46.2 */

    const file$p = "src/CardActions.wc.svelte";

    function create_fragment$p(ctx) {
    	let goa_card_content;
    	let goa_button_group;
    	let slot;

    	const block = {
    		c: function create() {
    			goa_card_content = element("goa-card-content");
    			goa_button_group = element("goa-button-group");
    			slot = element("slot");
    			this.c = noop;
    			add_location(slot, file$p, 8, 4, 162);
    			set_custom_element_data(goa_button_group, "alignment", "end");
    			add_location(goa_button_group, file$p, 7, 2, 123);
    			add_location(goa_card_content, file$p, 6, 0, 102);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, goa_card_content, anchor);
    			append_dev(goa_card_content, goa_button_group);
    			append_dev(goa_button_group, slot);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(goa_card_content);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-card-actions', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-card-actions> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class CardActions_wc extends SvelteElement {
    	constructor(options) {
    		super();

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$p,
    			create_fragment$p,
    			safe_not_equal,
    			{},
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}
    		}
    	}
    }

    customElements.define("goa-card-actions", CardActions_wc);

    /* src/CardContent.wc.svelte generated by Svelte v3.46.2 */

    const file$o = "src/CardContent.wc.svelte";

    function create_fragment$o(ctx) {
    	let div;
    	let slot;

    	const block = {
    		c: function create() {
    			div = element("div");
    			slot = element("slot");
    			this.c = noop;
    			add_location(slot, file$o, 7, 2, 131);
    			attr_dev(div, "class", "card-content");
    			add_location(div, file$o, 6, 0, 102);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, slot);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-card-content', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-card-content> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class CardContent_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.card-content{padding:1rem}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$o,
    			create_fragment$o,
    			safe_not_equal,
    			{},
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}
    		}
    	}
    }

    customElements.define("goa-card-content", CardContent_wc);

    /* src/CardGroup.wc.svelte generated by Svelte v3.46.2 */

    const file$n = "src/CardGroup.wc.svelte";

    function create_fragment$n(ctx) {
    	let div;
    	let slot;

    	const block = {
    		c: function create() {
    			div = element("div");
    			slot = element("slot");
    			this.c = noop;
    			add_location(slot, file$n, 7, 2, 127);
    			attr_dev(div, "class", "card-group");
    			add_location(div, file$n, 6, 0, 100);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, slot);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-card-group', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-card-group> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class CardGroup_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.card-group{display:flex;flex-wrap:wrap;justify-content:space-around;gap:1rem;width:100%}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$n,
    			create_fragment$n,
    			safe_not_equal,
    			{},
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}
    		}
    	}
    }

    customElements.define("goa-card-group", CardGroup_wc);

    /* src/CardImage.wc.svelte generated by Svelte v3.46.2 */

    const file$m = "src/CardImage.wc.svelte";

    function create_fragment$m(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			this.c = noop;
    			attr_dev(div, "class", "card-image");
    			set_style(div, "background-image", "url(" + /*src*/ ctx[0] + ")");
    			set_style(div, "height", /*height*/ ctx[1]);
    			set_style(div, "background-size", "cover");
    			set_style(div, "background-position", "center");
    			add_location(div, file$m, 8, 0, 144);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*src*/ 1) {
    				set_style(div, "background-image", "url(" + /*src*/ ctx[0] + ")");
    			}

    			if (dirty & /*height*/ 2) {
    				set_style(div, "height", /*height*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-card-image', slots, []);
    	let { src } = $$props;
    	let { height = "100%" } = $$props;
    	const writable_props = ['src', 'height'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-card-image> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    	};

    	$$self.$capture_state = () => ({ src, height });

    	$$self.$inject_state = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, height];
    }

    class CardImage_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.card-image{}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$m,
    			create_fragment$m,
    			safe_not_equal,
    			{ src: 0, height: 1 },
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*src*/ ctx[0] === undefined && !('src' in props)) {
    			console.warn("<goa-card-image> was created without expected prop 'src'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["src", "height"];
    	}

    	get src() {
    		return this.$$.ctx[0];
    	}

    	set src(src) {
    		this.$$set({ src });
    		flush();
    	}

    	get height() {
    		return this.$$.ctx[1];
    	}

    	set height(height) {
    		this.$$set({ height });
    		flush();
    	}
    }

    customElements.define("goa-card-image", CardImage_wc);

    /* src/Checkbox.wc.svelte generated by Svelte v3.46.2 */
    const file$l = "src/Checkbox.wc.svelte";

    // (49:4) {#if isChecked}
    function create_if_block$a(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*isIndeterminate*/ ctx[4]) return create_if_block_1$7;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(49:4) {#if isChecked}",
    		ctx
    	});

    	return block;
    }

    // (58:6) {:else}
    function create_else_block$3(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M5.09,9.64,1.27,5.82,0,7.09l5.09,5.09L16,1.27,14.73,0Z");
    			add_location(path, file$l, 63, 10, 1660);
    			attr_dev(svg, "id", "checkmark");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 16 12.18");
    			add_location(svg, file$l, 58, 8, 1532);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(58:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (50:6) {#if isIndeterminate}
    function create_if_block_1$7(ctx) {
    	let svg;
    	let rect;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			rect = svg_element("rect");
    			attr_dev(rect, "width", "15");
    			attr_dev(rect, "height", "2");
    			add_location(rect, file$l, 55, 10, 1464);
    			attr_dev(svg, "id", "dashmark");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 15 2");
    			add_location(svg, file$l, 50, 8, 1341);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, rect);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$7.name,
    		type: "if",
    		source: "(50:6) {#if isIndeterminate}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let label;
    	let div0;
    	let input;
    	let input_value_value;
    	let t0;
    	let t1;
    	let div1;
    	let slot;
    	let t2;
    	let mounted;
    	let dispose;
    	let if_block = /*isChecked*/ ctx[3] && create_if_block$a(ctx);

    	const block = {
    		c: function create() {
    			label = element("label");
    			div0 = element("div");
    			input = element("input");
    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			div1 = element("div");
    			slot = element("slot");
    			t2 = text(/*text*/ ctx[1]);
    			this.c = noop;
    			attr_dev(input, "id", /*id*/ ctx[7]);
    			attr_dev(input, "name", /*name*/ ctx[0]);
    			input.checked = /*isChecked*/ ctx[3];
    			input.disabled = /*isDisabled*/ ctx[6];
    			attr_dev(input, "type", "checkbox");
    			input.value = input_value_value = `${/*value*/ ctx[2]}`;
    			add_location(input, file$l, 39, 4, 1119);
    			attr_dev(div0, "class", "goa-checkbox-container");
    			toggle_class(div0, "goa-checkbox--selected", /*isChecked*/ ctx[3]);
    			add_location(div0, file$l, 38, 2, 1037);
    			attr_dev(slot, "name", "main");
    			add_location(slot, file$l, 69, 4, 1812);
    			attr_dev(div1, "class", "goa-checkbox-text");
    			add_location(div1, file$l, 68, 2, 1776);
    			attr_dev(label, "for", /*id*/ ctx[7]);
    			attr_dev(label, "class", "goa-checkbox");
    			toggle_class(label, "goa-checkbox--disabled", /*isDisabled*/ ctx[6]);
    			toggle_class(label, "goa-checkbox--error", /*isError*/ ctx[5]);
    			add_location(label, file$l, 32, 0, 910);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, div0);
    			append_dev(div0, input);
    			append_dev(div0, t0);
    			if (if_block) if_block.m(div0, null);
    			append_dev(label, t1);
    			append_dev(label, div1);
    			append_dev(div1, slot);
    			append_dev(slot, t2);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*onChange*/ ctx[8], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*id*/ 128) {
    				attr_dev(input, "id", /*id*/ ctx[7]);
    			}

    			if (dirty & /*name*/ 1) {
    				attr_dev(input, "name", /*name*/ ctx[0]);
    			}

    			if (dirty & /*isChecked*/ 8) {
    				prop_dev(input, "checked", /*isChecked*/ ctx[3]);
    			}

    			if (dirty & /*isDisabled*/ 64) {
    				prop_dev(input, "disabled", /*isDisabled*/ ctx[6]);
    			}

    			if (dirty & /*value*/ 4 && input_value_value !== (input_value_value = `${/*value*/ ctx[2]}`)) {
    				prop_dev(input, "value", input_value_value);
    			}

    			if (/*isChecked*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$a(ctx);
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*isChecked*/ 8) {
    				toggle_class(div0, "goa-checkbox--selected", /*isChecked*/ ctx[3]);
    			}

    			if (dirty & /*text*/ 2) set_data_dev(t2, /*text*/ ctx[1]);

    			if (dirty & /*id*/ 128) {
    				attr_dev(label, "for", /*id*/ ctx[7]);
    			}

    			if (dirty & /*isDisabled*/ 64) {
    				toggle_class(label, "goa-checkbox--disabled", /*isDisabled*/ ctx[6]);
    			}

    			if (dirty & /*isError*/ 32) {
    				toggle_class(label, "goa-checkbox--error", /*isError*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let id;
    	let isDisabled;
    	let isError;
    	let isChecked;
    	let isIndeterminate;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-checkbox', slots, []);
    	let { name } = $$props;
    	let { text = "" } = $$props;
    	let { value = "" } = $$props;
    	let { checked } = $$props;
    	let { disabled } = $$props;
    	let { indeterminate } = $$props;
    	let { error } = $$props;

    	function onChange(e) {
    		// An empty string is required as setting the second value to `null` caused the data to get
    		// out of sync with the events.
    		const newCheckStatus = !isChecked;

    		const _value = newCheckStatus ? `${value || "checked"}` : "";

    		e.target.dispatchEvent(new CustomEvent('_change',
    		{
    				composed: true,
    				detail: {
    					name,
    					checked: newCheckStatus,
    					value: _value
    				}
    			}));
    	}

    	const writable_props = ['name', 'text', 'value', 'checked', 'disabled', 'indeterminate', 'error'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-checkbox> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    		if ('checked' in $$props) $$invalidate(9, checked = $$props.checked);
    		if ('disabled' in $$props) $$invalidate(10, disabled = $$props.disabled);
    		if ('indeterminate' in $$props) $$invalidate(11, indeterminate = $$props.indeterminate);
    		if ('error' in $$props) $$invalidate(12, error = $$props.error);
    	};

    	$$self.$capture_state = () => ({
    		toBoolean,
    		name,
    		text,
    		value,
    		checked,
    		disabled,
    		indeterminate,
    		error,
    		onChange,
    		isChecked,
    		isIndeterminate,
    		isError,
    		isDisabled,
    		id
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    		if ('checked' in $$props) $$invalidate(9, checked = $$props.checked);
    		if ('disabled' in $$props) $$invalidate(10, disabled = $$props.disabled);
    		if ('indeterminate' in $$props) $$invalidate(11, indeterminate = $$props.indeterminate);
    		if ('error' in $$props) $$invalidate(12, error = $$props.error);
    		if ('isChecked' in $$props) $$invalidate(3, isChecked = $$props.isChecked);
    		if ('isIndeterminate' in $$props) $$invalidate(4, isIndeterminate = $$props.isIndeterminate);
    		if ('isError' in $$props) $$invalidate(5, isError = $$props.isError);
    		if ('isDisabled' in $$props) $$invalidate(6, isDisabled = $$props.isDisabled);
    		if ('id' in $$props) $$invalidate(7, id = $$props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*name*/ 1) {
    			$$invalidate(7, id = `id-${name}`);
    		}

    		if ($$self.$$.dirty & /*disabled*/ 1024) {
    			$$invalidate(6, isDisabled = toBoolean(disabled));
    		}

    		if ($$self.$$.dirty & /*error*/ 4096) {
    			$$invalidate(5, isError = toBoolean(error));
    		}

    		if ($$self.$$.dirty & /*checked*/ 512) {
    			$$invalidate(3, isChecked = toBoolean(checked));
    		}

    		if ($$self.$$.dirty & /*indeterminate*/ 2048) {
    			$$invalidate(4, isIndeterminate = toBoolean(indeterminate));
    		}
    	};

    	return [
    		name,
    		text,
    		value,
    		isChecked,
    		isIndeterminate,
    		isError,
    		isDisabled,
    		id,
    		onChange,
    		checked,
    		disabled,
    		indeterminate,
    		error
    	];
    }

    class Checkbox_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.goa-checkbox{display:inline-flex;align-items:center;min-height:calc(3rem - 4px);cursor:pointer}.goa-checkbox input[type='checkbox']{opacity:0;position:absolute}.goa-checkbox--disabled{opacity:30%}label.goa-checkbox--disabled{cursor:default}.goa-checkbox-container{box-sizing:border-box;border:1px solid var(--color-gray-700);border-radius:2px;background-color:var(--color-white);height:1.5rem;width:1.5rem;display:flex;justify-content:center;padding:3px}.goa-checkbox-container svg{fill:var(--color-white)}.goa-checkbox-container.goa-checkbox--selected{background-color:var(--color-blue-500)}.goa-checkbox-container:hover:not(.goa-checkbox--selected){background-color:var(--color-gray-100)}.goa-checkbox-container:focus-within{box-shadow:0 0 0 3px var(--color-orange-500);outline:none}.goa-checkbox-text{padding-left:0.5rem;user-select:none;font-weight:var(--fw-regular)}.goa-checkbox--error .goa-checkbox-container{border:2px solid var(--color-red-500)}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$l,
    			create_fragment$l,
    			safe_not_equal,
    			{
    				name: 0,
    				text: 1,
    				value: 2,
    				checked: 9,
    				disabled: 10,
    				indeterminate: 11,
    				error: 12
    			},
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*name*/ ctx[0] === undefined && !('name' in props)) {
    			console.warn("<goa-checkbox> was created without expected prop 'name'");
    		}

    		if (/*checked*/ ctx[9] === undefined && !('checked' in props)) {
    			console.warn("<goa-checkbox> was created without expected prop 'checked'");
    		}

    		if (/*disabled*/ ctx[10] === undefined && !('disabled' in props)) {
    			console.warn("<goa-checkbox> was created without expected prop 'disabled'");
    		}

    		if (/*indeterminate*/ ctx[11] === undefined && !('indeterminate' in props)) {
    			console.warn("<goa-checkbox> was created without expected prop 'indeterminate'");
    		}

    		if (/*error*/ ctx[12] === undefined && !('error' in props)) {
    			console.warn("<goa-checkbox> was created without expected prop 'error'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["name", "text", "value", "checked", "disabled", "indeterminate", "error"];
    	}

    	get name() {
    		return this.$$.ctx[0];
    	}

    	set name(name) {
    		this.$$set({ name });
    		flush();
    	}

    	get text() {
    		return this.$$.ctx[1];
    	}

    	set text(text) {
    		this.$$set({ text });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[2];
    	}

    	set value(value) {
    		this.$$set({ value });
    		flush();
    	}

    	get checked() {
    		return this.$$.ctx[9];
    	}

    	set checked(checked) {
    		this.$$set({ checked });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[10];
    	}

    	set disabled(disabled) {
    		this.$$set({ disabled });
    		flush();
    	}

    	get indeterminate() {
    		return this.$$.ctx[11];
    	}

    	set indeterminate(indeterminate) {
    		this.$$set({ indeterminate });
    		flush();
    	}

    	get error() {
    		return this.$$.ctx[12];
    	}

    	set error(error) {
    		this.$$set({ error });
    		flush();
    	}
    }

    customElements.define("goa-checkbox", Checkbox_wc);

    /* src/Container.wc.svelte generated by Svelte v3.46.2 */

    const file$k = "src/Container.wc.svelte";

    function create_fragment$k(ctx) {
    	let div3;
    	let header;
    	let div0;
    	let slot0;
    	let t0;
    	let div1;
    	let slot1;
    	let header_class_value;
    	let t1;
    	let div2;
    	let slot2;
    	let div3_class_value;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			header = element("header");
    			div0 = element("div");
    			slot0 = element("slot");
    			t0 = space();
    			div1 = element("div");
    			slot1 = element("slot");
    			t1 = space();
    			div2 = element("div");
    			slot2 = element("slot");
    			this.c = noop;
    			attr_dev(slot0, "name", "title");
    			add_location(slot0, file$k, 11, 6, 290);
    			attr_dev(div0, "class", "title");
    			add_location(div0, file$k, 10, 4, 264);
    			attr_dev(slot1, "name", "actions");
    			add_location(slot1, file$k, 15, 6, 356);
    			attr_dev(div1, "class", "actions");
    			add_location(div1, file$k, 14, 4, 328);
    			attr_dev(header, "class", header_class_value = "heading--" + /*headingsize*/ ctx[1]);
    			add_location(header, file$k, 9, 2, 220);
    			add_location(slot2, file$k, 19, 4, 431);
    			attr_dev(div2, "class", "content");
    			add_location(div2, file$k, 18, 2, 405);
    			attr_dev(div3, "class", div3_class_value = "goa-container goa-container--" + /*variant*/ ctx[0]);
    			add_location(div3, file$k, 8, 0, 165);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, header);
    			append_dev(header, div0);
    			append_dev(div0, slot0);
    			append_dev(header, t0);
    			append_dev(header, div1);
    			append_dev(div1, slot1);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, slot2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*headingsize*/ 2 && header_class_value !== (header_class_value = "heading--" + /*headingsize*/ ctx[1])) {
    				attr_dev(header, "class", header_class_value);
    			}

    			if (dirty & /*variant*/ 1 && div3_class_value !== (div3_class_value = "goa-container goa-container--" + /*variant*/ ctx[0])) {
    				attr_dev(div3, "class", div3_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-container', slots, []);
    	let { variant = 'default' } = $$props;
    	let { headingsize = 'large' } = $$props;
    	const writable_props = ['variant', 'headingsize'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-container> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('variant' in $$props) $$invalidate(0, variant = $$props.variant);
    		if ('headingsize' in $$props) $$invalidate(1, headingsize = $$props.headingsize);
    	};

    	$$self.$capture_state = () => ({ variant, headingsize });

    	$$self.$inject_state = $$props => {
    		if ('variant' in $$props) $$invalidate(0, variant = $$props.variant);
    		if ('headingsize' in $$props) $$invalidate(1, headingsize = $$props.headingsize);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [variant, headingsize];
    }

    class Container_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.goa-container{margin-bottom:1rem;box-sizing:border-box}.goa-container *{box-sizing:border-box}header{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;font-weight:700;font-size:var(--fs-base);border-width:1px;border-style:solid;border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);padding-left:1.5rem;padding-right:1.5rem}.content{padding:1.5rem;border-bottom:1px solid var(--color-gray-200);border-left:1px solid var(--color-gray-200);border-right:1px solid var(--color-gray-200);border-bottom-left-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius)}.goa-container--default header{background-color:var(--color-gray-100);border-color:var(--color-gray-200);color:var(--color-black)}.goa-container--primary header{background-color:var(--color-tealblue);border-color:var(--color-tealblue);color:var(--color-white)}.goa-container--info header{background-color:var(--color-blue);border-color:var(--color-blue);color:var(--color-white)}.goa-container--error header{background-color:var(--color-red);border-color:var(--color-red);color:var(--color-white)}.goa-container--success header{background-color:var(--color-green);border-color:var(--color-green);color:var(--color-white)}.goa-container--warning header{background-color:var(--color-orange);border-color:var(--color-orange);color:var(--color-white)}.heading--large{padding:0.5rem 1.5rem;max-height:4rem}.heading--large .title{line-height:2rem}.heading--small{height:0.5rem}.heading--none{display:none}.heading--none~.content{border-top:1px solid var(--color-gray-200);border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius)}.heading--small .title,.heading--small .actions{display:none}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$k,
    			create_fragment$k,
    			safe_not_equal,
    			{ variant: 0, headingsize: 1 },
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["variant", "headingsize"];
    	}

    	get variant() {
    		return this.$$.ctx[0];
    	}

    	set variant(variant) {
    		this.$$set({ variant });
    		flush();
    	}

    	get headingsize() {
    		return this.$$.ctx[1];
    	}

    	set headingsize(headingsize) {
    		this.$$set({ headingsize });
    		flush();
    	}
    }

    customElements.define("goa-container", Container_wc);

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    // Stores
    const messageChannel$1 = writable({});

    /* src/Dropdown.wc.svelte generated by Svelte v3.46.2 */

    const { Object: Object_1$3 } = globals;
    const file$j = "src/Dropdown.wc.svelte";

    // (126:2) {#if isMenuVisible}
    function create_if_block_3$3(ctx) {
    	let div;
    	let div_data_testid_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "data-testid", div_data_testid_value = `${/*name*/ ctx[0]}-dropdown-background`);
    			attr_dev(div, "class", "goa-dropdown-background");
    			add_location(div, file$j, 126, 4, 4492);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*closeMenu*/ ctx[12], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 1 && div_data_testid_value !== (div_data_testid_value = `${/*name*/ ctx[0]}-dropdown-background`)) {
    				attr_dev(div, "data-testid", div_data_testid_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$3.name,
    		type: "if",
    		source: "(126:2) {#if isMenuVisible}",
    		ctx
    	});

    	return block;
    }

    // (136:4) {#if !isMenuVisible || !isAutoComplete}
    function create_if_block_2$5(ctx) {
    	let div;
    	let goa_input;
    	let goa_input_id_value;
    	let goa_input_value_value;
    	let div_data_testid_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			goa_input = element("goa-input");
    			set_custom_element_data(goa_input, "disabled", /*isDisabled*/ ctx[10]);
    			set_custom_element_data(goa_input, "leadingicon", /*leadingicon*/ ctx[1]);
    			set_custom_element_data(goa_input, "placeholder", /*placeholder*/ ctx[3]);
    			set_custom_element_data(goa_input, "id", goa_input_id_value = `${/*name*/ ctx[0]}-dropdown-input`);
    			set_custom_element_data(goa_input, "name", "search");
    			set_custom_element_data(goa_input, "readonly", "");
    			set_custom_element_data(goa_input, "trailingicon", "chevron-down");
    			set_custom_element_data(goa_input, "handletrailingiconclick", "");
    			set_custom_element_data(goa_input, "type", "text");
    			set_custom_element_data(goa_input, "value", goa_input_value_value = /*selectedLabels*/ ctx[4].join(', '));
    			add_location(goa_input, file$j, 137, 8, 4763);
    			attr_dev(div, "data-testid", div_data_testid_value = `${/*name*/ ctx[0]}-dropdown`);
    			add_location(div, file$j, 136, 6, 4715);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, goa_input);

    			if (!mounted) {
    				dispose = listen_dev(goa_input, "focus", /*showMenu*/ ctx[11], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*isDisabled*/ 1024) {
    				set_custom_element_data(goa_input, "disabled", /*isDisabled*/ ctx[10]);
    			}

    			if (dirty & /*leadingicon*/ 2) {
    				set_custom_element_data(goa_input, "leadingicon", /*leadingicon*/ ctx[1]);
    			}

    			if (dirty & /*placeholder*/ 8) {
    				set_custom_element_data(goa_input, "placeholder", /*placeholder*/ ctx[3]);
    			}

    			if (dirty & /*name*/ 1 && goa_input_id_value !== (goa_input_id_value = `${/*name*/ ctx[0]}-dropdown-input`)) {
    				set_custom_element_data(goa_input, "id", goa_input_id_value);
    			}

    			if (dirty & /*selectedLabels*/ 16 && goa_input_value_value !== (goa_input_value_value = /*selectedLabels*/ ctx[4].join(', '))) {
    				set_custom_element_data(goa_input, "value", goa_input_value_value);
    			}

    			if (dirty & /*name*/ 1 && div_data_testid_value !== (div_data_testid_value = `${/*name*/ ctx[0]}-dropdown`)) {
    				attr_dev(div, "data-testid", div_data_testid_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$5.name,
    		type: "if",
    		source: "(136:4) {#if !isMenuVisible || !isAutoComplete}",
    		ctx
    	});

    	return block;
    }

    // (155:4) {#if isMenuVisible}
    function create_if_block$9(ctx) {
    	let div;
    	let t;
    	let ul;
    	let slot;
    	let ul_style_value;
    	let if_block = /*isAutoComplete*/ ctx[9] && create_if_block_1$6(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			t = space();
    			ul = element("ul");
    			slot = element("slot");
    			add_location(slot, file$j, 175, 10, 5777);
    			attr_dev(ul, "class", "goa-dropdown-list");
    			attr_dev(ul, "style", ul_style_value = `overflow-y: auto; max-height: ${/*maxheight*/ ctx[2] || MAX_HEIGHT}px`);
    			add_location(ul, file$j, 171, 8, 5638);
    			attr_dev(div, "class", "menu");
    			add_location(div, file$j, 155, 6, 5199);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			append_dev(div, t);
    			append_dev(div, ul);
    			append_dev(ul, slot);
    		},
    		p: function update(ctx, dirty) {
    			if (/*isAutoComplete*/ ctx[9]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1$6(ctx);
    					if_block.c();
    					if_block.m(div, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*maxheight*/ 4 && ul_style_value !== (ul_style_value = `overflow-y: auto; max-height: ${/*maxheight*/ ctx[2] || MAX_HEIGHT}px`)) {
    				attr_dev(ul, "style", ul_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(155:4) {#if isMenuVisible}",
    		ctx
    	});

    	return block;
    }

    // (158:8) {#if isAutoComplete}
    function create_if_block_1$6(ctx) {
    	let goa_input;
    	let goa_input_trailingicon_value;

    	const block = {
    		c: function create() {
    			goa_input = element("goa-input");
    			set_custom_element_data(goa_input, "focused", /*isMenuVisible*/ ctx[5]);
    			set_custom_element_data(goa_input, "name", "filter");
    			set_custom_element_data(goa_input, "placeholder", "Filter");
    			set_custom_element_data(goa_input, "trailingicon", goa_input_trailingicon_value = /*filter*/ ctx[8].length > 0 ? 'close-circle' : 'search');
    			set_custom_element_data(goa_input, "handletrailingiconclick", "");
    			set_custom_element_data(goa_input, "type", "text");
    			set_custom_element_data(goa_input, "value", /*filter*/ ctx[8]);
    			add_location(goa_input, file$j, 158, 10, 5281);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, goa_input, anchor);
    			/*goa_input_binding*/ ctx[17](goa_input);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*isMenuVisible*/ 32) {
    				set_custom_element_data(goa_input, "focused", /*isMenuVisible*/ ctx[5]);
    			}

    			if (dirty & /*filter*/ 256 && goa_input_trailingicon_value !== (goa_input_trailingicon_value = /*filter*/ ctx[8].length > 0 ? 'close-circle' : 'search')) {
    				set_custom_element_data(goa_input, "trailingicon", goa_input_trailingicon_value);
    			}

    			if (dirty & /*filter*/ 256) {
    				set_custom_element_data(goa_input, "value", /*filter*/ ctx[8]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(goa_input);
    			/*goa_input_binding*/ ctx[17](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$6.name,
    		type: "if",
    		source: "(158:8) {#if isAutoComplete}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t1;
    	let if_block0 = /*isMenuVisible*/ ctx[5] && create_if_block_3$3(ctx);
    	let if_block1 = (!/*isMenuVisible*/ ctx[5] || !/*isAutoComplete*/ ctx[9]) && create_if_block_2$5(ctx);
    	let if_block2 = /*isMenuVisible*/ ctx[5] && create_if_block$9(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div0 = element("div");
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			this.c = noop;
    			add_location(div0, file$j, 133, 2, 4630);
    			attr_dev(div1, "class", "goa-dropdown-box");
    			add_location(div1, file$j, 123, 0, 4398);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			if (if_block1) if_block1.m(div0, null);
    			append_dev(div0, t1);
    			if (if_block2) if_block2.m(div0, null);
    			/*div1_binding*/ ctx[18](div1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*isMenuVisible*/ ctx[5]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_3$3(ctx);
    					if_block0.c();
    					if_block0.m(div1, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (!/*isMenuVisible*/ ctx[5] || !/*isAutoComplete*/ ctx[9]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_2$5(ctx);
    					if_block1.c();
    					if_block1.m(div0, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*isMenuVisible*/ ctx[5]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block$9(ctx);
    					if_block2.c();
    					if_block2.m(div0, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			/*div1_binding*/ ctx[18](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const MAX_HEIGHT = 300;

    function instance$j($$self, $$props, $$invalidate) {
    	let isMultiSelect;
    	let isDisabled;
    	let isAutoComplete;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-dropdown', slots, []);
    	let { name } = $$props;
    	let { values } = $$props;
    	let { leadingicon } = $$props;
    	let { maxheight } = $$props;
    	let { placeholder } = $$props;
    	let { multiselect } = $$props;
    	let { disabled } = $$props;
    	let { autocomplete } = $$props;

    	// Private
    	let selectedLabels = [];

    	let selectedValues = [];
    	let isMenuVisible = false;
    	let el;
    	let filterEl;
    	let filter = '';

    	// Init
    	const unsubscribe = messageChannel$1.subscribe(channel => {
    		var _a, _b;

    		if (((_a = channel[name]) === null || _a === void 0
    		? void 0
    		: _a.tag) !== name) {
    			return;
    		}

    		const msg = channel[name];

    		switch ((_b = msg === null || msg === void 0 ? void 0 : msg.payload) === null || _b === void 0
    		? void 0
    		: _b.type) {
    			case 'DropDownAction':
    				{
    					if (msg.payload.action === 'select') {
    						if (isMultiSelect) {
    							$$invalidate(4, selectedLabels = [...selectedLabels, msg.payload.label]);
    							selectedValues = [...selectedValues, msg.payload.value];
    						} else {
    							$$invalidate(4, selectedLabels = [msg.payload.label]);
    							selectedValues = [msg.payload.value];
    						}
    					}

    					if (msg.payload.action === 'deselect') {
    						const _label = msg.payload.label;
    						const _value = msg.payload.value;
    						$$invalidate(4, selectedLabels = selectedLabels.filter(label => label !== _label));
    						selectedValues = selectedValues.filter(value => value !== _value);
    					}

    					if (!isMultiSelect) {
    						$$invalidate(5, isMenuVisible = false);
    					}

    					messageChannel$1.update(old => Object.assign(Object.assign({}, old), { [name]: null }));

    					el.dispatchEvent(new CustomEvent('_change',
    					{
    							composed: true,
    							detail: {
    								event: null,
    								data: { name, value: selectedValues }
    							}
    						}));

    					break;
    				}
    		}
    	});

    	// Hooks
    	onMount(async () => {
    		await tick();

    		// set initial values state
    		messageChannel$1.update(old => Object.assign(Object.assign({}, old), {
    			[name]: {
    				tag: name,
    				payload: {
    					type: 'DropDownInit',
    					values: values ? JSON.parse(values) : [],
    					multiSelect: isMultiSelect
    				}
    			}
    		}));
    	});

    	onDestroy(() => {
    		messageChannel$1.update(old => {
    			delete old[name];
    			return old;
    		});

    		unsubscribe();
    	});

    	// Reactive
    	let filterOnChangeListener = e => {
    		e.stopPropagation();
    		$$invalidate(8, filter = e.detail.data.value);

    		messageChannel$1.update(old => Object.assign(Object.assign({}, old), {
    			[name]: {
    				tag: name,
    				payload: { type: 'FilterChange', filter }
    			}
    		}));
    	};

    	let filterOnTrailingIconClickListener = e => {
    		e.stopPropagation();
    		$$invalidate(8, filter = '');

    		messageChannel$1.update(old => Object.assign(Object.assign({}, old), {
    			[name]: {
    				tag: name,
    				payload: { type: 'FilterChange', filter }
    			}
    		}));

    		filterEl === null || filterEl === void 0
    		? void 0
    		: filterEl.focus();
    	};

    	// Functions
    	async function showMenu() {
    		$$invalidate(5, isMenuVisible = true);
    		await tick();

    		// To prevent the event from bubbling up to the parent, we need to listen to the event on the element itself
    		// then we can stop propagation and prevent default
    		filterEl === null || filterEl === void 0
    		? void 0
    		: filterEl.addEventListener('_change', filterOnChangeListener);

    		filterEl === null || filterEl === void 0
    		? void 0
    		: filterEl.addEventListener('_trailingIconClick', filterOnTrailingIconClickListener);

    		filterEl === null || filterEl === void 0
    		? void 0
    		: filterEl.focus();
    	}

    	function closeMenu() {
    		$$invalidate(5, isMenuVisible = false);

    		filterEl === null || filterEl === void 0
    		? void 0
    		: filterEl.removeEventListener('_change', filterOnChangeListener);

    		filterEl === null || filterEl === void 0
    		? void 0
    		: filterEl.removeEventListener('_trailingIconClick', filterOnTrailingIconClickListener);
    	}

    	const writable_props = [
    		'name',
    		'values',
    		'leadingicon',
    		'maxheight',
    		'placeholder',
    		'multiselect',
    		'disabled',
    		'autocomplete'
    	];

    	Object_1$3.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-dropdown> was created with unknown prop '${key}'`);
    	});

    	function goa_input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			filterEl = $$value;
    			$$invalidate(7, filterEl);
    		});
    	}

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			el = $$value;
    			$$invalidate(6, el);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('values' in $$props) $$invalidate(13, values = $$props.values);
    		if ('leadingicon' in $$props) $$invalidate(1, leadingicon = $$props.leadingicon);
    		if ('maxheight' in $$props) $$invalidate(2, maxheight = $$props.maxheight);
    		if ('placeholder' in $$props) $$invalidate(3, placeholder = $$props.placeholder);
    		if ('multiselect' in $$props) $$invalidate(14, multiselect = $$props.multiselect);
    		if ('disabled' in $$props) $$invalidate(15, disabled = $$props.disabled);
    		if ('autocomplete' in $$props) $$invalidate(16, autocomplete = $$props.autocomplete);
    	};

    	$$self.$capture_state = () => ({
    		messageChannel: messageChannel$1,
    		onDestroy,
    		onMount,
    		tick,
    		toBoolean,
    		MAX_HEIGHT,
    		name,
    		values,
    		leadingicon,
    		maxheight,
    		placeholder,
    		multiselect,
    		disabled,
    		autocomplete,
    		selectedLabels,
    		selectedValues,
    		isMenuVisible,
    		el,
    		filterEl,
    		filter,
    		unsubscribe,
    		filterOnChangeListener,
    		filterOnTrailingIconClickListener,
    		showMenu,
    		closeMenu,
    		isMultiSelect,
    		isAutoComplete,
    		isDisabled
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('values' in $$props) $$invalidate(13, values = $$props.values);
    		if ('leadingicon' in $$props) $$invalidate(1, leadingicon = $$props.leadingicon);
    		if ('maxheight' in $$props) $$invalidate(2, maxheight = $$props.maxheight);
    		if ('placeholder' in $$props) $$invalidate(3, placeholder = $$props.placeholder);
    		if ('multiselect' in $$props) $$invalidate(14, multiselect = $$props.multiselect);
    		if ('disabled' in $$props) $$invalidate(15, disabled = $$props.disabled);
    		if ('autocomplete' in $$props) $$invalidate(16, autocomplete = $$props.autocomplete);
    		if ('selectedLabels' in $$props) $$invalidate(4, selectedLabels = $$props.selectedLabels);
    		if ('selectedValues' in $$props) selectedValues = $$props.selectedValues;
    		if ('isMenuVisible' in $$props) $$invalidate(5, isMenuVisible = $$props.isMenuVisible);
    		if ('el' in $$props) $$invalidate(6, el = $$props.el);
    		if ('filterEl' in $$props) $$invalidate(7, filterEl = $$props.filterEl);
    		if ('filter' in $$props) $$invalidate(8, filter = $$props.filter);
    		if ('filterOnChangeListener' in $$props) filterOnChangeListener = $$props.filterOnChangeListener;
    		if ('filterOnTrailingIconClickListener' in $$props) filterOnTrailingIconClickListener = $$props.filterOnTrailingIconClickListener;
    		if ('isMultiSelect' in $$props) isMultiSelect = $$props.isMultiSelect;
    		if ('isAutoComplete' in $$props) $$invalidate(9, isAutoComplete = $$props.isAutoComplete);
    		if ('isDisabled' in $$props) $$invalidate(10, isDisabled = $$props.isDisabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*multiselect*/ 16384) {
    			isMultiSelect = toBoolean(multiselect);
    		}

    		if ($$self.$$.dirty & /*disabled*/ 32768) {
    			$$invalidate(10, isDisabled = toBoolean(disabled));
    		}

    		if ($$self.$$.dirty & /*autocomplete*/ 65536) {
    			$$invalidate(9, isAutoComplete = toBoolean(autocomplete));
    		}
    	};

    	return [
    		name,
    		leadingicon,
    		maxheight,
    		placeholder,
    		selectedLabels,
    		isMenuVisible,
    		el,
    		filterEl,
    		filter,
    		isAutoComplete,
    		isDisabled,
    		showMenu,
    		closeMenu,
    		values,
    		multiselect,
    		disabled,
    		autocomplete,
    		goa_input_binding,
    		div1_binding
    	];
    }

    class Dropdown_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.goa-dropdown-box{position:relative}.menu goa-input{position:relative}.goa-dropdown-background{position:fixed;inset:0}.goa-dropdown-list{position:absolute;left:0;right:0;padding:0;margin:0;margin-top:3px;list-style-type:none;background:var(--color-white);border-radius:var(--input-border-radius);box-shadow:var(--shadow-1);z-index:99}.goa-dropdown-list{scroll-behavior:smooth;scrollbar-width:thin}.goa-dropdown-list::-webkit-scrollbar{width:6px}.goa-dropdown-list::-webkit-scrollbar-track{background:#f1f1f1}.goa-dropdown-list::-webkit-scrollbar-thumb{background:#888}.goa-dropdown-list::-webkit-scrollbar-thumb:hover{background:#555}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$j,
    			create_fragment$j,
    			safe_not_equal,
    			{
    				name: 0,
    				values: 13,
    				leadingicon: 1,
    				maxheight: 2,
    				placeholder: 3,
    				multiselect: 14,
    				disabled: 15,
    				autocomplete: 16
    			},
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*name*/ ctx[0] === undefined && !('name' in props)) {
    			console.warn("<goa-dropdown> was created without expected prop 'name'");
    		}

    		if (/*values*/ ctx[13] === undefined && !('values' in props)) {
    			console.warn("<goa-dropdown> was created without expected prop 'values'");
    		}

    		if (/*leadingicon*/ ctx[1] === undefined && !('leadingicon' in props)) {
    			console.warn("<goa-dropdown> was created without expected prop 'leadingicon'");
    		}

    		if (/*maxheight*/ ctx[2] === undefined && !('maxheight' in props)) {
    			console.warn("<goa-dropdown> was created without expected prop 'maxheight'");
    		}

    		if (/*placeholder*/ ctx[3] === undefined && !('placeholder' in props)) {
    			console.warn("<goa-dropdown> was created without expected prop 'placeholder'");
    		}

    		if (/*multiselect*/ ctx[14] === undefined && !('multiselect' in props)) {
    			console.warn("<goa-dropdown> was created without expected prop 'multiselect'");
    		}

    		if (/*disabled*/ ctx[15] === undefined && !('disabled' in props)) {
    			console.warn("<goa-dropdown> was created without expected prop 'disabled'");
    		}

    		if (/*autocomplete*/ ctx[16] === undefined && !('autocomplete' in props)) {
    			console.warn("<goa-dropdown> was created without expected prop 'autocomplete'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return [
    			"name",
    			"values",
    			"leadingicon",
    			"maxheight",
    			"placeholder",
    			"multiselect",
    			"disabled",
    			"autocomplete"
    		];
    	}

    	get name() {
    		return this.$$.ctx[0];
    	}

    	set name(name) {
    		this.$$set({ name });
    		flush();
    	}

    	get values() {
    		return this.$$.ctx[13];
    	}

    	set values(values) {
    		this.$$set({ values });
    		flush();
    	}

    	get leadingicon() {
    		return this.$$.ctx[1];
    	}

    	set leadingicon(leadingicon) {
    		this.$$set({ leadingicon });
    		flush();
    	}

    	get maxheight() {
    		return this.$$.ctx[2];
    	}

    	set maxheight(maxheight) {
    		this.$$set({ maxheight });
    		flush();
    	}

    	get placeholder() {
    		return this.$$.ctx[3];
    	}

    	set placeholder(placeholder) {
    		this.$$set({ placeholder });
    		flush();
    	}

    	get multiselect() {
    		return this.$$.ctx[14];
    	}

    	set multiselect(multiselect) {
    		this.$$set({ multiselect });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[15];
    	}

    	set disabled(disabled) {
    		this.$$set({ disabled });
    		flush();
    	}

    	get autocomplete() {
    		return this.$$.ctx[16];
    	}

    	set autocomplete(autocomplete) {
    		this.$$set({ autocomplete });
    		flush();
    	}
    }

    customElements.define("goa-dropdown", Dropdown_wc);

    /* src/DropdownItem.wc.svelte generated by Svelte v3.46.2 */

    const { Object: Object_1$2 } = globals;
    const file$i = "src/DropdownItem.wc.svelte";

    function create_fragment$i(ctx) {
    	let li;
    	let raw_value = (/*filteredLabel*/ ctx[2] || /*label*/ ctx[0]) + "";
    	let li_style_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			li = element("li");
    			this.c = noop;
    			attr_dev(li, "class", "goa-dropdown-option");
    			attr_dev(li, "style", li_style_value = `display: ${/*isHidden*/ ctx[4] ? 'none' : 'block'}`);
    			attr_dev(li, "data-testid", /*testId*/ ctx[1]);
    			toggle_class(li, "goa-dropdown-option--disabled", /*isDisabled*/ ctx[5]);
    			toggle_class(li, "goa-dropdown-option--selected", /*isSelected*/ ctx[3]);
    			add_location(li, file$i, 102, 0, 3028);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			li.innerHTML = raw_value;

    			if (!mounted) {
    				dispose = listen_dev(li, "click", /*onSelect*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*filteredLabel, label*/ 5 && raw_value !== (raw_value = (/*filteredLabel*/ ctx[2] || /*label*/ ctx[0]) + "")) li.innerHTML = raw_value;
    			if (dirty & /*isHidden*/ 16 && li_style_value !== (li_style_value = `display: ${/*isHidden*/ ctx[4] ? 'none' : 'block'}`)) {
    				attr_dev(li, "style", li_style_value);
    			}

    			if (dirty & /*testId*/ 2) {
    				attr_dev(li, "data-testid", /*testId*/ ctx[1]);
    			}

    			if (dirty & /*isDisabled*/ 32) {
    				toggle_class(li, "goa-dropdown-option--disabled", /*isDisabled*/ ctx[5]);
    			}

    			if (dirty & /*isSelected*/ 8) {
    				toggle_class(li, "goa-dropdown-option--selected", /*isSelected*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let isSelected;
    	let isDisabled;
    	let isHidden;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-dropdown-item', slots, []);
    	let { name = '' } = $$props;
    	let { value = '' } = $$props;
    	let { label = '' } = $$props;
    	let { testId = '' } = $$props;
    	let { selected = '' } = $$props;
    	let { disabled = '' } = $$props;
    	let { hide = '' } = $$props;

    	// private
    	let multiSelect;

    	let filteredLabel;

    	onMount(async () => {
    		await tick();
    	});

    	function getFilteredLabel(filter) {
    		if (filter.length === 0) {
    			return label;
    		}

    		if (!label.toLowerCase().includes(filter.toLowerCase())) {
    			return label;
    		}

    		// bold all the matches
    		$$invalidate(2, filteredLabel = '');

    		let lastIndex = 0;

    		[...label.matchAll(new RegExp(filter, 'gi'))].forEach(match => {
    			$$invalidate(2, filteredLabel += label.slice(lastIndex, match.index) + `<b>${match[0]}</b>`);
    			lastIndex = match.index + match[0].length;
    		});

    		$$invalidate(2, filteredLabel += label.slice(lastIndex));
    		return filteredLabel;
    	}

    	messageChannel$1.subscribe(channel => {
    		const msg = channel[name];

    		if (!msg) {
    			return;
    		}

    		if (msg.tag !== name) {
    			return;
    		}

    		switch (msg.payload.type) {
    			case 'FilterChange':
    				{
    					const filter = msg.payload.filter.toLowerCase();

    					if (!value && !label) {
    						$$invalidate(7, hide = 'false');
    					} else {
    						const matches = value.toLowerCase().includes(filter) || label.toLowerCase().includes(filter);
    						$$invalidate(7, hide = fromBoolean(!matches));
    					}

    					$$invalidate(2, filteredLabel = getFilteredLabel(filter));
    					break;
    				}
    			case 'DropDownAction':
    				{
    					if (msg.payload.label !== label && !multiSelect) {
    						$$invalidate(3, isSelected = false);
    					}

    					break;
    				}
    			case 'DropDownInit':
    				{
    					$$invalidate(3, isSelected = msg.payload.values.includes(value));
    					multiSelect = msg.payload.multiSelect;

    					if (isSelected) {
    						messageChannel$1.update(old => Object.assign(Object.assign({}, old), {
    							[name]: {
    								tag: name,
    								payload: {
    									type: 'DropDownAction',
    									action: 'select',
    									label,
    									value
    								}
    							}
    						}));
    					}

    					break;
    				}
    		}
    	});

    	function onSelect() {
    		$$invalidate(3, isSelected = !isSelected);

    		messageChannel$1.update(old => Object.assign(Object.assign({}, old), {
    			[name]: {
    				tag: name,
    				payload: {
    					type: 'DropDownAction',
    					action: isSelected ? 'select' : 'deselect',
    					label,
    					value,
    					multiSelect
    				}
    			}
    		}));
    	}

    	const writable_props = ['name', 'value', 'label', 'testId', 'selected', 'disabled', 'hide'];

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-dropdown-item> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(8, name = $$props.name);
    		if ('value' in $$props) $$invalidate(9, value = $$props.value);
    		if ('label' in $$props) $$invalidate(0, label = $$props.label);
    		if ('testId' in $$props) $$invalidate(1, testId = $$props.testId);
    		if ('selected' in $$props) $$invalidate(10, selected = $$props.selected);
    		if ('disabled' in $$props) $$invalidate(11, disabled = $$props.disabled);
    		if ('hide' in $$props) $$invalidate(7, hide = $$props.hide);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		tick,
    		messageChannel: messageChannel$1,
    		fromBoolean,
    		toBoolean,
    		name,
    		value,
    		label,
    		testId,
    		selected,
    		disabled,
    		hide,
    		multiSelect,
    		filteredLabel,
    		getFilteredLabel,
    		onSelect,
    		isSelected,
    		isHidden,
    		isDisabled
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(8, name = $$props.name);
    		if ('value' in $$props) $$invalidate(9, value = $$props.value);
    		if ('label' in $$props) $$invalidate(0, label = $$props.label);
    		if ('testId' in $$props) $$invalidate(1, testId = $$props.testId);
    		if ('selected' in $$props) $$invalidate(10, selected = $$props.selected);
    		if ('disabled' in $$props) $$invalidate(11, disabled = $$props.disabled);
    		if ('hide' in $$props) $$invalidate(7, hide = $$props.hide);
    		if ('multiSelect' in $$props) multiSelect = $$props.multiSelect;
    		if ('filteredLabel' in $$props) $$invalidate(2, filteredLabel = $$props.filteredLabel);
    		if ('isSelected' in $$props) $$invalidate(3, isSelected = $$props.isSelected);
    		if ('isHidden' in $$props) $$invalidate(4, isHidden = $$props.isHidden);
    		if ('isDisabled' in $$props) $$invalidate(5, isDisabled = $$props.isDisabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*selected*/ 1024) {
    			$$invalidate(3, isSelected = toBoolean(selected));
    		}

    		if ($$self.$$.dirty & /*disabled*/ 2048) {
    			$$invalidate(5, isDisabled = toBoolean(disabled));
    		}

    		if ($$self.$$.dirty & /*hide*/ 128) {
    			$$invalidate(4, isHidden = toBoolean(hide));
    		}
    	};

    	return [
    		label,
    		testId,
    		filteredLabel,
    		isSelected,
    		isHidden,
    		isDisabled,
    		onSelect,
    		hide,
    		name,
    		value,
    		selected,
    		disabled
    	];
    }

    class DropdownItem_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>li{font-family:var(--font-family)}.goa-dropdown-option{margin:0;padding:0.5rem;cursor:pointer;color:var(--color-gray-900)}.goa-dropdown-option:hover{background:var(--color-gray-100);color:var(--color-blue-600)}.goa-dropdown-option--disabled{opacity:0.5;cursor:default}.goa-dropdown-option--disabled:hover{cursor:default;color:var(--color-gray-700)}.goa-dropdown-option--selected{background:var(--color-blue-500);color:var(--color-white)}.goa-dropdown-option--selected:hover{background:var(--color-blue-600);color:var(--color-white)}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$i,
    			create_fragment$i,
    			safe_not_equal,
    			{
    				name: 8,
    				value: 9,
    				label: 0,
    				testId: 1,
    				selected: 10,
    				disabled: 11,
    				hide: 7
    			},
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["name", "value", "label", "testId", "selected", "disabled", "hide"];
    	}

    	get name() {
    		return this.$$.ctx[8];
    	}

    	set name(name) {
    		this.$$set({ name });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[9];
    	}

    	set value(value) {
    		this.$$set({ value });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[0];
    	}

    	set label(label) {
    		this.$$set({ label });
    		flush();
    	}

    	get testId() {
    		return this.$$.ctx[1];
    	}

    	set testId(testId) {
    		this.$$set({ testId });
    		flush();
    	}

    	get selected() {
    		return this.$$.ctx[10];
    	}

    	set selected(selected) {
    		this.$$set({ selected });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[11];
    	}

    	set disabled(disabled) {
    		this.$$set({ disabled });
    		flush();
    	}

    	get hide() {
    		return this.$$.ctx[7];
    	}

    	set hide(hide) {
    		this.$$set({ hide });
    		flush();
    	}
    }

    customElements.define("goa-dropdown-item", DropdownItem_wc);

    /* src/FlexRow.wc.svelte generated by Svelte v3.46.2 */

    const file$h = "src/FlexRow.wc.svelte";

    function create_fragment$h(ctx) {
    	let div;
    	let slot;

    	const block = {
    		c: function create() {
    			div = element("div");
    			slot = element("slot");
    			this.c = noop;
    			add_location(slot, file$h, 9, 2, 266);
    			attr_dev(div, "class", "goa-flex-row");
    			set_style(div, "gap", /*_gap*/ ctx[0]);
    			add_location(div, file$h, 8, 0, 216);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, slot);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*_gap*/ 1) {
    				set_style(div, "gap", /*_gap*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let _gap;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-flex-row', slots, []);
    	let { gap = "" } = $$props;
    	const writable_props = ['gap'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-flex-row> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('gap' in $$props) $$invalidate(1, gap = $$props.gap);
    	};

    	$$self.$capture_state = () => ({ gap, _gap });

    	$$self.$inject_state = $$props => {
    		if ('gap' in $$props) $$invalidate(1, gap = $$props.gap);
    		if ('_gap' in $$props) $$invalidate(0, _gap = $$props._gap);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*gap*/ 2) {
    			$$invalidate(0, _gap = gap === 'small'
    			? '1rem'
    			: gap === 'medium'
    				? '2rem'
    				: gap === 'large' ? '3rem' : '0');
    		}
    	};

    	return [_gap, gap];
    }

    class FlexRow_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.goa-flex-row{margin-bottom:1rem;display:flex;flex-direction:column;flex-wrap:wrap;align-items:stretch}@media(min-width: 480px){.goa-flex-row{flex-direction:row}}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$h,
    			create_fragment$h,
    			safe_not_equal,
    			{ gap: 1 },
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["gap"];
    	}

    	get gap() {
    		return this.$$.ctx[1];
    	}

    	set gap(gap) {
    		this.$$set({ gap });
    		flush();
    	}
    }

    customElements.define("goa-flex-row", FlexRow_wc);

    /* src/FormItem.wc.svelte generated by Svelte v3.46.2 */
    const file$g = "src/FormItem.wc.svelte";

    // (15:2) {#if label}
    function create_if_block_2$4(ctx) {
    	let label_1;
    	let t0;
    	let t1;
    	let if_block = /*isOptional*/ ctx[4] && create_if_block_3$2(ctx);

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			t0 = text(/*label*/ ctx[3]);
    			t1 = space();
    			if (if_block) if_block.c();
    			attr_dev(label_1, "for", /*name*/ ctx[1]);
    			add_location(label_1, file$g, 15, 4, 341);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t0);
    			append_dev(label_1, t1);
    			if (if_block) if_block.m(label_1, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 8) set_data_dev(t0, /*label*/ ctx[3]);

    			if (/*isOptional*/ ctx[4]) {
    				if (if_block) ; else {
    					if_block = create_if_block_3$2(ctx);
    					if_block.c();
    					if_block.m(label_1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*name*/ 2) {
    				attr_dev(label_1, "for", /*name*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$4.name,
    		type: "if",
    		source: "(15:2) {#if label}",
    		ctx
    	});

    	return block;
    }

    // (18:6) {#if isOptional}
    function create_if_block_3$2(ctx) {
    	let em;

    	const block = {
    		c: function create() {
    			em = element("em");
    			em.textContent = "(optional)";
    			add_location(em, file$g, 18, 8, 405);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, em, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(em);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$2.name,
    		type: "if",
    		source: "(18:6) {#if isOptional}",
    		ctx
    	});

    	return block;
    }

    // (26:2) {#if error}
    function create_if_block_1$5(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*error*/ ctx[2]);
    			attr_dev(div, "class", "error-msg");
    			add_location(div, file$g, 26, 4, 530);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*error*/ 4) set_data_dev(t, /*error*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(26:2) {#if error}",
    		ctx
    	});

    	return block;
    }

    // (29:2) {#if helptext }
    function create_if_block$8(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*helptext*/ ctx[0]);
    			attr_dev(div, "class", "help-msg");
    			add_location(div, file$g, 29, 4, 597);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*helptext*/ 1) set_data_dev(t, /*helptext*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(29:2) {#if helptext }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let slot;
    	let t1;
    	let t2;
    	let if_block0 = /*label*/ ctx[3] && create_if_block_2$4(ctx);
    	let if_block1 = /*error*/ ctx[2] && create_if_block_1$5(ctx);
    	let if_block2 = /*helptext*/ ctx[0] && create_if_block$8(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div0 = element("div");
    			slot = element("slot");
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			this.c = noop;
    			add_location(slot, file$g, 23, 4, 494);
    			attr_dev(div0, "class", "form-item-input");
    			add_location(div0, file$g, 22, 2, 460);
    			attr_dev(div1, "class", "goa-form-item");
    			add_location(div1, file$g, 13, 0, 295);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, slot);
    			append_dev(div1, t1);
    			if (if_block1) if_block1.m(div1, null);
    			append_dev(div1, t2);
    			if (if_block2) if_block2.m(div1, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*label*/ ctx[3]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2$4(ctx);
    					if_block0.c();
    					if_block0.m(div1, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*error*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$5(ctx);
    					if_block1.c();
    					if_block1.m(div1, t2);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*helptext*/ ctx[0]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block$8(ctx);
    					if_block2.c();
    					if_block2.m(div1, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let isOptional;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-form-item', slots, []);
    	let { helptext = "" } = $$props;
    	let { name = "" } = $$props;
    	let { error = "" } = $$props;
    	let { label = "" } = $$props;
    	let { optional } = $$props;
    	const writable_props = ['helptext', 'name', 'error', 'label', 'optional'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-form-item> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('helptext' in $$props) $$invalidate(0, helptext = $$props.helptext);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('error' in $$props) $$invalidate(2, error = $$props.error);
    		if ('label' in $$props) $$invalidate(3, label = $$props.label);
    		if ('optional' in $$props) $$invalidate(5, optional = $$props.optional);
    	};

    	$$self.$capture_state = () => ({
    		toBoolean,
    		helptext,
    		name,
    		error,
    		label,
    		optional,
    		isOptional
    	});

    	$$self.$inject_state = $$props => {
    		if ('helptext' in $$props) $$invalidate(0, helptext = $$props.helptext);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('error' in $$props) $$invalidate(2, error = $$props.error);
    		if ('label' in $$props) $$invalidate(3, label = $$props.label);
    		if ('optional' in $$props) $$invalidate(5, optional = $$props.optional);
    		if ('isOptional' in $$props) $$invalidate(4, isOptional = $$props.isOptional);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*optional*/ 32) {
    			$$invalidate(4, isOptional = toBoolean(optional));
    		}
    	};

    	return [helptext, name, error, label, isOptional, optional];
    }

    class FormItem_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>:host{flex:1 1 auto}*{box-sizing:border-box}label{display:block;font-weight:bold;color:#333;font-size:var(--fs-base);padding:0.5rem 0;max-height:2.5rem}label em{color:var(--color-gray-700);font-weight:var(--fw-regular);font-size:var(--fs-sm);font-style:normal}.form-item-input{margin-bottom:0.25rem}.help-msg{font-size:var(--fs-sm);color:var(--color-gray-900)}.error-msg{font-size:var(--fs-sm);color:var(--color-red);margin-bottom:0.25rem}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$g,
    			create_fragment$g,
    			safe_not_equal,
    			{
    				helptext: 0,
    				name: 1,
    				error: 2,
    				label: 3,
    				optional: 5
    			},
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*optional*/ ctx[5] === undefined && !('optional' in props)) {
    			console.warn("<goa-form-item> was created without expected prop 'optional'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["helptext", "name", "error", "label", "optional"];
    	}

    	get helptext() {
    		return this.$$.ctx[0];
    	}

    	set helptext(helptext) {
    		this.$$set({ helptext });
    		flush();
    	}

    	get name() {
    		return this.$$.ctx[1];
    	}

    	set name(name) {
    		this.$$set({ name });
    		flush();
    	}

    	get error() {
    		return this.$$.ctx[2];
    	}

    	set error(error) {
    		this.$$set({ error });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[3];
    	}

    	set label(label) {
    		this.$$set({ label });
    		flush();
    	}

    	get optional() {
    		return this.$$.ctx[5];
    	}

    	set optional(optional) {
    		this.$$set({ optional });
    		flush();
    	}
    }

    customElements.define("goa-form-item", FormItem_wc);

    /* src/HeroBanner.wc.svelte generated by Svelte v3.46.2 */

    const file$f = "src/HeroBanner.wc.svelte";

    function create_fragment$f(ctx) {
    	let div1;
    	let goa_page_block;
    	let h1;
    	let t0;
    	let t1;
    	let div0;
    	let slot0;
    	let t2;
    	let slot1;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			goa_page_block = element("goa-page-block");
    			h1 = element("h1");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			div0 = element("div");
    			slot0 = element("slot");
    			t2 = space();
    			slot1 = element("slot");
    			this.c = noop;
    			attr_dev(h1, "role", "heading");
    			add_location(h1, file$f, 18, 4, 435);
    			attr_dev(slot0, "name", "content");
    			add_location(slot0, file$f, 20, 6, 527);
    			attr_dev(div0, "class", "goa-hero-banner-content");
    			attr_dev(div0, "role", "note");
    			add_location(div0, file$f, 19, 4, 471);
    			attr_dev(slot1, "name", "actions");
    			add_location(slot1, file$f, 22, 4, 566);
    			add_location(goa_page_block, file$f, 17, 2, 414);
    			attr_dev(div1, "class", "goa-hero");
    			set_style(div1, "background-image", "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.40) 40%, rgba(0, 0, 0, 0.6) 100%), url(" + /*backgroundurl*/ ctx[1] + ")");
    			set_style(div1, "background-size", "cover");
    			set_style(div1, "background-position", "center");
    			set_style(div1, "background-repeat", "no-repeat");
    			add_location(div1, file$f, 8, 0, 145);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, goa_page_block);
    			append_dev(goa_page_block, h1);
    			append_dev(h1, t0);
    			append_dev(goa_page_block, t1);
    			append_dev(goa_page_block, div0);
    			append_dev(div0, slot0);
    			append_dev(goa_page_block, t2);
    			append_dev(goa_page_block, slot1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

    			if (dirty & /*backgroundurl*/ 2) {
    				set_style(div1, "background-image", "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.40) 40%, rgba(0, 0, 0, 0.6) 100%), url(" + /*backgroundurl*/ ctx[1] + ")");
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-hero-banner', slots, []);
    	let { title } = $$props;
    	let { backgroundurl } = $$props;
    	const writable_props = ['title', 'backgroundurl'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-hero-banner> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('backgroundurl' in $$props) $$invalidate(1, backgroundurl = $$props.backgroundurl);
    	};

    	$$self.$capture_state = () => ({ title, backgroundurl });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('backgroundurl' in $$props) $$invalidate(1, backgroundurl = $$props.backgroundurl);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, backgroundurl];
    }

    class HeroBanner_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.goa-hero{box-sizing:border-box;display:flex;justify-content:flex-end;flex-direction:column;min-height:600px;border-bottom:8px solid var(--color-blue-600);color:var(--color-white);background-position:center center;width:100%;padding:3.5rem 0}h1{margin:0 0 1.75rem;padding:0;color:var(--color-white);font-size:var(--fs-3xl);line-height:var(--lh-2xl);font-weight:var(--fw-bold)}.goa-hero-banner-content{font-size:1.5rem;line-height:2rem;margin-bottom:1.75rem;color:#fff}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$f,
    			create_fragment$f,
    			safe_not_equal,
    			{ title: 0, backgroundurl: 1 },
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<goa-hero-banner> was created without expected prop 'title'");
    		}

    		if (/*backgroundurl*/ ctx[1] === undefined && !('backgroundurl' in props)) {
    			console.warn("<goa-hero-banner> was created without expected prop 'backgroundurl'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["title", "backgroundurl"];
    	}

    	get title() {
    		return this.$$.ctx[0];
    	}

    	set title(title) {
    		this.$$set({ title });
    		flush();
    	}

    	get backgroundurl() {
    		return this.$$.ctx[1];
    	}

    	set backgroundurl(backgroundurl) {
    		this.$$set({ backgroundurl });
    		flush();
    	}
    }

    customElements.define("goa-hero-banner", HeroBanner_wc);

    /* src/Icon.wc.svelte generated by Svelte v3.46.2 */
    const file$e = "src/Icon.wc.svelte";

    // (24:2) {#if type }
    function create_if_block$7(ctx) {
    	let ion_icon;
    	let ion_icon_style_value;
    	let ion_icon_name_value;

    	const block = {
    		c: function create() {
    			ion_icon = element("ion-icon");
    			set_custom_element_data(ion_icon, "style", ion_icon_style_value = `width: ${/*_size*/ ctx[2]}; height: ${/*_size*/ ctx[2]}`);

    			set_custom_element_data(ion_icon, "name", ion_icon_name_value = /*theme*/ ctx[1] === "filled"
    			? /*type*/ ctx[0]
    			: `${/*type*/ ctx[0]}-${/*theme*/ ctx[1]}`);

    			add_location(ion_icon, file$e, 24, 4, 507);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ion_icon, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*_size*/ 4 && ion_icon_style_value !== (ion_icon_style_value = `width: ${/*_size*/ ctx[2]}; height: ${/*_size*/ ctx[2]}`)) {
    				set_custom_element_data(ion_icon, "style", ion_icon_style_value);
    			}

    			if (dirty & /*theme, type*/ 3 && ion_icon_name_value !== (ion_icon_name_value = /*theme*/ ctx[1] === "filled"
    			? /*type*/ ctx[0]
    			: `${/*type*/ ctx[0]}-${/*theme*/ ctx[1]}`)) {
    				set_custom_element_data(ion_icon, "name", ion_icon_name_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ion_icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(24:2) {#if type }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let div;
    	let div_data_testid_value;
    	let div_style_value;
    	let if_block = /*type*/ ctx[0] && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			this.c = noop;
    			attr_dev(div, "class", "goa-icon");
    			attr_dev(div, "data-testid", div_data_testid_value = `icon-${/*type*/ ctx[0]}`);
    			attr_dev(div, "style", div_style_value = `--size: ${/*_size*/ ctx[2]}`);
    			toggle_class(div, "inverted", /*isInverted*/ ctx[3]);
    			add_location(div, file$e, 17, 0, 371);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*type*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$7(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*type*/ 1 && div_data_testid_value !== (div_data_testid_value = `icon-${/*type*/ ctx[0]}`)) {
    				attr_dev(div, "data-testid", div_data_testid_value);
    			}

    			if (dirty & /*_size*/ 4 && div_style_value !== (div_style_value = `--size: ${/*_size*/ ctx[2]}`)) {
    				attr_dev(div, "style", div_style_value);
    			}

    			if (dirty & /*isInverted*/ 8) {
    				toggle_class(div, "inverted", /*isInverted*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let isInverted;
    	let _size;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-icon', slots, []);
    	let { type } = $$props;
    	let { size = 'medium' } = $$props;
    	let { theme = 'outline' } = $$props;
    	let { inverted } = $$props;
    	const writable_props = ['type', 'size', 'theme', 'inverted'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-icon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('size' in $$props) $$invalidate(4, size = $$props.size);
    		if ('theme' in $$props) $$invalidate(1, theme = $$props.theme);
    		if ('inverted' in $$props) $$invalidate(5, inverted = $$props.inverted);
    	};

    	$$self.$capture_state = () => ({
    		toBoolean,
    		type,
    		size,
    		theme,
    		inverted,
    		_size,
    		isInverted
    	});

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('size' in $$props) $$invalidate(4, size = $$props.size);
    		if ('theme' in $$props) $$invalidate(1, theme = $$props.theme);
    		if ('inverted' in $$props) $$invalidate(5, inverted = $$props.inverted);
    		if ('_size' in $$props) $$invalidate(2, _size = $$props._size);
    		if ('isInverted' in $$props) $$invalidate(3, isInverted = $$props.isInverted);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*inverted*/ 32) {
    			$$invalidate(3, isInverted = toBoolean(inverted));
    		}

    		if ($$self.$$.dirty & /*size*/ 16) {
    			$$invalidate(2, _size = ({
    				small: '1.1rem',
    				medium: '1.5rem',
    				large: '2rem'
    			})[size]);
    		}
    	};

    	return [type, theme, _size, isInverted, size, inverted];
    }

    class Icon_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>:host,.goa-icon{display:inline-flex;align-items:center}.goa-icon,.goa-icon *{box-sizing:border-box}.goa-icon{width:var(--size);height:var(--size)}.inverted{color:#fff;fill:#fff}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$e,
    			create_fragment$e,
    			safe_not_equal,
    			{ type: 0, size: 4, theme: 1, inverted: 5 },
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*type*/ ctx[0] === undefined && !('type' in props)) {
    			console.warn("<goa-icon> was created without expected prop 'type'");
    		}

    		if (/*inverted*/ ctx[5] === undefined && !('inverted' in props)) {
    			console.warn("<goa-icon> was created without expected prop 'inverted'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["type", "size", "theme", "inverted"];
    	}

    	get type() {
    		return this.$$.ctx[0];
    	}

    	set type(type) {
    		this.$$set({ type });
    		flush();
    	}

    	get size() {
    		return this.$$.ctx[4];
    	}

    	set size(size) {
    		this.$$set({ size });
    		flush();
    	}

    	get theme() {
    		return this.$$.ctx[1];
    	}

    	set theme(theme) {
    		this.$$set({ theme });
    		flush();
    	}

    	get inverted() {
    		return this.$$.ctx[5];
    	}

    	set inverted(inverted) {
    		this.$$set({ inverted });
    		flush();
    	}
    }

    customElements.define("goa-icon", Icon_wc);

    /* src/IconButton.wc.svelte generated by Svelte v3.46.2 */
    const file$d = "src/IconButton.wc.svelte";

    function create_fragment$d(ctx) {
    	let button;
    	let goa_icon;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			goa_icon = element("goa-icon");
    			this.c = noop;
    			set_custom_element_data(goa_icon, "type", /*type*/ ctx[0]);
    			set_custom_element_data(goa_icon, "size", /*size*/ ctx[1]);
    			set_custom_element_data(goa_icon, "theme", /*theme*/ ctx[2]);
    			set_custom_element_data(goa_icon, "inverted", /*isInverted*/ ctx[5]);
    			add_location(goa_icon, file$d, 28, 2, 851);
    			set_style(button, "--size", /*_size*/ ctx[6]);
    			attr_dev(button, "title", /*title*/ ctx[3]);
    			button.disabled = /*isDisabled*/ ctx[7];
    			attr_dev(button, "class", /*css*/ ctx[8]);
    			attr_dev(button, "data-testid", /*testId*/ ctx[4]);
    			add_location(button, file$d, 27, 0, 730);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, goa_icon);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", handleClick, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*type*/ 1) {
    				set_custom_element_data(goa_icon, "type", /*type*/ ctx[0]);
    			}

    			if (dirty & /*size*/ 2) {
    				set_custom_element_data(goa_icon, "size", /*size*/ ctx[1]);
    			}

    			if (dirty & /*theme*/ 4) {
    				set_custom_element_data(goa_icon, "theme", /*theme*/ ctx[2]);
    			}

    			if (dirty & /*isInverted*/ 32) {
    				set_custom_element_data(goa_icon, "inverted", /*isInverted*/ ctx[5]);
    			}

    			if (dirty & /*_size*/ 64) {
    				set_style(button, "--size", /*_size*/ ctx[6]);
    			}

    			if (dirty & /*title*/ 8) {
    				attr_dev(button, "title", /*title*/ ctx[3]);
    			}

    			if (dirty & /*isDisabled*/ 128) {
    				prop_dev(button, "disabled", /*isDisabled*/ ctx[7]);
    			}

    			if (dirty & /*css*/ 256) {
    				attr_dev(button, "class", /*css*/ ctx[8]);
    			}

    			if (dirty & /*testId*/ 16) {
    				attr_dev(button, "data-testid", /*testId*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function handleClick(e) {
    	e.target.dispatchEvent(new CustomEvent("_click", { composed: true, detail: { event: e } }));
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let css;
    	let isDisabled;
    	let isInverted;
    	let _size;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-icon-button', slots, []);
    	let { type } = $$props;
    	let { size = "medium" } = $$props;
    	let { theme = "outline" } = $$props;
    	let { variant = "color" } = $$props;
    	let { title = "" } = $$props;
    	let { testId = "" } = $$props;
    	let { disabled } = $$props;
    	let { inverted } = $$props;
    	const writable_props = ['type', 'size', 'theme', 'variant', 'title', 'testId', 'disabled', 'inverted'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-icon-button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('theme' in $$props) $$invalidate(2, theme = $$props.theme);
    		if ('variant' in $$props) $$invalidate(9, variant = $$props.variant);
    		if ('title' in $$props) $$invalidate(3, title = $$props.title);
    		if ('testId' in $$props) $$invalidate(4, testId = $$props.testId);
    		if ('disabled' in $$props) $$invalidate(10, disabled = $$props.disabled);
    		if ('inverted' in $$props) $$invalidate(11, inverted = $$props.inverted);
    	};

    	$$self.$capture_state = () => ({
    		toBoolean,
    		type,
    		size,
    		theme,
    		variant,
    		title,
    		testId,
    		disabled,
    		inverted,
    		handleClick,
    		_size,
    		isInverted,
    		isDisabled,
    		css
    	});

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('theme' in $$props) $$invalidate(2, theme = $$props.theme);
    		if ('variant' in $$props) $$invalidate(9, variant = $$props.variant);
    		if ('title' in $$props) $$invalidate(3, title = $$props.title);
    		if ('testId' in $$props) $$invalidate(4, testId = $$props.testId);
    		if ('disabled' in $$props) $$invalidate(10, disabled = $$props.disabled);
    		if ('inverted' in $$props) $$invalidate(11, inverted = $$props.inverted);
    		if ('_size' in $$props) $$invalidate(6, _size = $$props._size);
    		if ('isInverted' in $$props) $$invalidate(5, isInverted = $$props.isInverted);
    		if ('isDisabled' in $$props) $$invalidate(7, isDisabled = $$props.isDisabled);
    		if ('css' in $$props) $$invalidate(8, css = $$props.css);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*inverted*/ 2048) {
    			$$invalidate(5, isInverted = toBoolean(inverted));
    		}

    		if ($$self.$$.dirty & /*variant, isInverted*/ 544) {
    			// private
    			$$invalidate(8, css = `goa-icon-button goa-icon-button--${variant} ${isInverted ? 'goa-icon-button--inverted' : ''}`);
    		}

    		if ($$self.$$.dirty & /*disabled*/ 1024) {
    			$$invalidate(7, isDisabled = toBoolean(disabled));
    		}

    		if ($$self.$$.dirty & /*size*/ 2) {
    			$$invalidate(6, _size = ({
    				small: '1rem',
    				medium: '1.5rem',
    				large: '2rem'
    			})[size]);
    		}
    	};

    	return [
    		type,
    		size,
    		theme,
    		title,
    		testId,
    		isInverted,
    		_size,
    		isDisabled,
    		css,
    		variant,
    		disabled,
    		inverted
    	];
    }

    class IconButton_wc extends SvelteElement {
    	constructor(options) {
    		super();

    		this.shadowRoot.innerHTML = `<style>:host{display:flex;align-items:center}.goa-icon-button,.goa-icon-button *{box-sizing:border-box}.goa-icon-button{display:inline-flex;align-items:center;background:transparent;cursor:pointer;padding:0;border:none}.goa-icon-button--color{border-radius:0.5rem;padding:calc(var(--size) / 4)
  }.goa-icon-button--color{border-radius:0.5rem;color:var(--color-blue-500);fill:var(--color-blue-500);cursor:pointer;transition:background-color 100ms ease-in, transform 100ms ease-in}.goa-icon-button--color:active,.goa-icon-button--nocolor:active{transform:scale(0.9)}.goa-icon-button--color:hover{background-color:var(--color-blue-100)}.goa-icon-button--color.goa-icon-button--inverted:hover{background-color:var(--color-blue-600)}.goa-icon-button:disabled{color:var(--color-gray-200);fill:var(--color-gray-200);transform:none;cursor:default}.goa-icon-button:disabled:hover{background-color:transparent}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$d,
    			create_fragment$d,
    			safe_not_equal,
    			{
    				type: 0,
    				size: 1,
    				theme: 2,
    				variant: 9,
    				title: 3,
    				testId: 4,
    				disabled: 10,
    				inverted: 11
    			},
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*type*/ ctx[0] === undefined && !('type' in props)) {
    			console.warn("<goa-icon-button> was created without expected prop 'type'");
    		}

    		if (/*disabled*/ ctx[10] === undefined && !('disabled' in props)) {
    			console.warn("<goa-icon-button> was created without expected prop 'disabled'");
    		}

    		if (/*inverted*/ ctx[11] === undefined && !('inverted' in props)) {
    			console.warn("<goa-icon-button> was created without expected prop 'inverted'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return [
    			"type",
    			"size",
    			"theme",
    			"variant",
    			"title",
    			"testId",
    			"disabled",
    			"inverted"
    		];
    	}

    	get type() {
    		return this.$$.ctx[0];
    	}

    	set type(type) {
    		this.$$set({ type });
    		flush();
    	}

    	get size() {
    		return this.$$.ctx[1];
    	}

    	set size(size) {
    		this.$$set({ size });
    		flush();
    	}

    	get theme() {
    		return this.$$.ctx[2];
    	}

    	set theme(theme) {
    		this.$$set({ theme });
    		flush();
    	}

    	get variant() {
    		return this.$$.ctx[9];
    	}

    	set variant(variant) {
    		this.$$set({ variant });
    		flush();
    	}

    	get title() {
    		return this.$$.ctx[3];
    	}

    	set title(title) {
    		this.$$set({ title });
    		flush();
    	}

    	get testId() {
    		return this.$$.ctx[4];
    	}

    	set testId(testId) {
    		this.$$set({ testId });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[10];
    	}

    	set disabled(disabled) {
    		this.$$set({ disabled });
    		flush();
    	}

    	get inverted() {
    		return this.$$.ctx[11];
    	}

    	set inverted(inverted) {
    		this.$$set({ inverted });
    		flush();
    	}
    }

    customElements.define("goa-icon-button", IconButton_wc);

    /* src/Input.wc.svelte generated by Svelte v3.46.2 */
    const file$c = "src/Input.wc.svelte";

    // (49:2) {#if leadingicon}
    function create_if_block_2$3(ctx) {
    	let div;
    	let goa_icon;

    	const block = {
    		c: function create() {
    			div = element("div");
    			goa_icon = element("goa-icon");
    			set_custom_element_data(goa_icon, "type", /*leadingicon*/ ctx[5]);
    			add_location(goa_icon, file$c, 50, 6, 1415);
    			attr_dev(div, "class", "goa-input-leading-icon");
    			add_location(div, file$c, 49, 4, 1372);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, goa_icon);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*leadingicon*/ 32) {
    				set_custom_element_data(goa_icon, "type", /*leadingicon*/ ctx[5]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(49:2) {#if leadingicon}",
    		ctx
    	});

    	return block;
    }

    // (67:2) {#if trailingicon && !handlesTrailingIconClicks}
    function create_if_block_1$4(ctx) {
    	let div;
    	let goa_icon;

    	const block = {
    		c: function create() {
    			div = element("div");
    			goa_icon = element("goa-icon");
    			set_custom_element_data(goa_icon, "size", "medium");
    			set_custom_element_data(goa_icon, "type", /*trailingicon*/ ctx[6]);
    			add_location(goa_icon, file$c, 68, 6, 1762);
    			attr_dev(div, "class", "goa-input-trailing-icon");
    			add_location(div, file$c, 67, 4, 1718);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, goa_icon);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*trailingicon*/ 64) {
    				set_custom_element_data(goa_icon, "type", /*trailingicon*/ ctx[6]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(67:2) {#if trailingicon && !handlesTrailingIconClicks}",
    		ctx
    	});

    	return block;
    }

    // (73:2) {#if trailingicon && handlesTrailingIconClicks}
    function create_if_block$6(ctx) {
    	let div;
    	let goa_icon_button;
    	let goa_icon_button_testid_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			goa_icon_button = element("goa-icon-button");
    			set_custom_element_data(goa_icon_button, "disabled", /*isDisabled*/ ctx[9]);
    			set_custom_element_data(goa_icon_button, "variant", "nocolor");
    			set_custom_element_data(goa_icon_button, "size", "medium");
    			set_custom_element_data(goa_icon_button, "type", /*trailingicon*/ ctx[6]);
    			set_custom_element_data(goa_icon_button, "testid", goa_icon_button_testid_value = `${/*name*/ ctx[1]}-input-trailing-button`);
    			add_location(goa_icon_button, file$c, 74, 6, 1927);
    			attr_dev(div, "class", "goa-input-trailing-icon");
    			add_location(div, file$c, 73, 4, 1883);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, goa_icon_button);

    			if (!mounted) {
    				dispose = listen_dev(goa_icon_button, "click", doClick, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*isDisabled*/ 512) {
    				set_custom_element_data(goa_icon_button, "disabled", /*isDisabled*/ ctx[9]);
    			}

    			if (dirty & /*trailingicon*/ 64) {
    				set_custom_element_data(goa_icon_button, "type", /*trailingicon*/ ctx[6]);
    			}

    			if (dirty & /*name*/ 2 && goa_icon_button_testid_value !== (goa_icon_button_testid_value = `${/*name*/ ctx[1]}-input-trailing-button`)) {
    				set_custom_element_data(goa_icon_button, "testid", goa_icon_button_testid_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(73:2) {#if trailingicon && handlesTrailingIconClicks}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div;
    	let t0;
    	let input;
    	let input_class_value;
    	let t1;
    	let t2;
    	let div_class_value;
    	let mounted;
    	let dispose;
    	let if_block0 = /*leadingicon*/ ctx[5] && create_if_block_2$3(ctx);
    	let if_block1 = /*trailingicon*/ ctx[6] && !/*handlesTrailingIconClicks*/ ctx[12] && create_if_block_1$4(ctx);
    	let if_block2 = /*trailingicon*/ ctx[6] && /*handlesTrailingIconClicks*/ ctx[12] && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			input = element("input");
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			this.c = noop;
    			attr_dev(input, "id", /*id*/ ctx[3]);
    			attr_dev(input, "class", input_class_value = `input--${/*variant*/ ctx[7]}`);
    			input.readOnly = /*isReadonly*/ ctx[11];
    			input.disabled = /*isDisabled*/ ctx[9];
    			attr_dev(input, "type", /*type*/ ctx[0]);
    			input.value = /*value*/ ctx[2];
    			attr_dev(input, "placeholder", /*placeholder*/ ctx[4]);
    			add_location(input, file$c, 54, 2, 1469);
    			attr_dev(div, "class", div_class_value = `goa-input ${/*isDisabled*/ ctx[9] ? "goa-input--disabled" : ""}`);
    			toggle_class(div, "error", /*isError*/ ctx[10]);
    			add_location(div, file$c, 47, 0, 1257);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t0);
    			append_dev(div, input);
    			/*input_binding*/ ctx[20](input);
    			append_dev(div, t1);
    			if (if_block1) if_block1.m(div, null);
    			append_dev(div, t2);
    			if (if_block2) if_block2.m(div, null);

    			if (!mounted) {
    				dispose = listen_dev(input, "keyup", /*onKeyUp*/ ctx[13], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*leadingicon*/ ctx[5]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2$3(ctx);
    					if_block0.c();
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*id*/ 8) {
    				attr_dev(input, "id", /*id*/ ctx[3]);
    			}

    			if (dirty & /*variant*/ 128 && input_class_value !== (input_class_value = `input--${/*variant*/ ctx[7]}`)) {
    				attr_dev(input, "class", input_class_value);
    			}

    			if (dirty & /*isReadonly*/ 2048) {
    				prop_dev(input, "readOnly", /*isReadonly*/ ctx[11]);
    			}

    			if (dirty & /*isDisabled*/ 512) {
    				prop_dev(input, "disabled", /*isDisabled*/ ctx[9]);
    			}

    			if (dirty & /*type*/ 1) {
    				attr_dev(input, "type", /*type*/ ctx[0]);
    			}

    			if (dirty & /*value*/ 4 && input.value !== /*value*/ ctx[2]) {
    				prop_dev(input, "value", /*value*/ ctx[2]);
    			}

    			if (dirty & /*placeholder*/ 16) {
    				attr_dev(input, "placeholder", /*placeholder*/ ctx[4]);
    			}

    			if (/*trailingicon*/ ctx[6] && !/*handlesTrailingIconClicks*/ ctx[12]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$4(ctx);
    					if_block1.c();
    					if_block1.m(div, t2);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*trailingicon*/ ctx[6] && /*handlesTrailingIconClicks*/ ctx[12]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block$6(ctx);
    					if_block2.c();
    					if_block2.m(div, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (dirty & /*isDisabled*/ 512 && div_class_value !== (div_class_value = `goa-input ${/*isDisabled*/ ctx[9] ? "goa-input--disabled" : ""}`)) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*isDisabled, isError*/ 1536) {
    				toggle_class(div, "error", /*isError*/ ctx[10]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			/*input_binding*/ ctx[20](null);
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function doClick() {
    	this.dispatchEvent(new CustomEvent("_trailingIconClick", { composed: true }));
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let handlesTrailingIconClicks;
    	let isFocused;
    	let isReadonly;
    	let isError;
    	let isDisabled;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-input', slots, []);
    	let { type = "text" } = $$props;
    	let { name = "" } = $$props;
    	let { value = "" } = $$props;
    	let { id = "" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { leadingicon = null } = $$props;
    	let { trailingicon = null } = $$props;
    	let { variant = "goa" } = $$props;
    	let { disabled } = $$props;
    	let { handletrailingiconclick } = $$props;
    	let { focused } = $$props;
    	let { readonly } = $$props;
    	let { error } = $$props;
    	let inputEl;

    	onMount(async () => {
    		await tick();
    	});

    	function onKeyUp(e) {
    		e.target.dispatchEvent(new CustomEvent("_change",
    		{
    				composed: true,
    				bubbles: false,
    				cancelable: true,
    				detail: {
    					event: e,
    					data: { name, value: e.target.value }
    				}
    			}));

    		e.stopPropagation();
    	}

    	const writable_props = [
    		'type',
    		'name',
    		'value',
    		'id',
    		'placeholder',
    		'leadingicon',
    		'trailingicon',
    		'variant',
    		'disabled',
    		'handletrailingiconclick',
    		'focused',
    		'readonly',
    		'error'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-input> was created with unknown prop '${key}'`);
    	});

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inputEl = $$value;
    			$$invalidate(8, inputEl);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    		if ('id' in $$props) $$invalidate(3, id = $$props.id);
    		if ('placeholder' in $$props) $$invalidate(4, placeholder = $$props.placeholder);
    		if ('leadingicon' in $$props) $$invalidate(5, leadingicon = $$props.leadingicon);
    		if ('trailingicon' in $$props) $$invalidate(6, trailingicon = $$props.trailingicon);
    		if ('variant' in $$props) $$invalidate(7, variant = $$props.variant);
    		if ('disabled' in $$props) $$invalidate(14, disabled = $$props.disabled);
    		if ('handletrailingiconclick' in $$props) $$invalidate(15, handletrailingiconclick = $$props.handletrailingiconclick);
    		if ('focused' in $$props) $$invalidate(16, focused = $$props.focused);
    		if ('readonly' in $$props) $$invalidate(17, readonly = $$props.readonly);
    		if ('error' in $$props) $$invalidate(18, error = $$props.error);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		tick,
    		toBoolean,
    		type,
    		name,
    		value,
    		id,
    		placeholder,
    		leadingicon,
    		trailingicon,
    		variant,
    		disabled,
    		handletrailingiconclick,
    		focused,
    		readonly,
    		error,
    		inputEl,
    		onKeyUp,
    		doClick,
    		isFocused,
    		isDisabled,
    		isError,
    		isReadonly,
    		handlesTrailingIconClicks
    	});

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    		if ('id' in $$props) $$invalidate(3, id = $$props.id);
    		if ('placeholder' in $$props) $$invalidate(4, placeholder = $$props.placeholder);
    		if ('leadingicon' in $$props) $$invalidate(5, leadingicon = $$props.leadingicon);
    		if ('trailingicon' in $$props) $$invalidate(6, trailingicon = $$props.trailingicon);
    		if ('variant' in $$props) $$invalidate(7, variant = $$props.variant);
    		if ('disabled' in $$props) $$invalidate(14, disabled = $$props.disabled);
    		if ('handletrailingiconclick' in $$props) $$invalidate(15, handletrailingiconclick = $$props.handletrailingiconclick);
    		if ('focused' in $$props) $$invalidate(16, focused = $$props.focused);
    		if ('readonly' in $$props) $$invalidate(17, readonly = $$props.readonly);
    		if ('error' in $$props) $$invalidate(18, error = $$props.error);
    		if ('inputEl' in $$props) $$invalidate(8, inputEl = $$props.inputEl);
    		if ('isFocused' in $$props) $$invalidate(19, isFocused = $$props.isFocused);
    		if ('isDisabled' in $$props) $$invalidate(9, isDisabled = $$props.isDisabled);
    		if ('isError' in $$props) $$invalidate(10, isError = $$props.isError);
    		if ('isReadonly' in $$props) $$invalidate(11, isReadonly = $$props.isReadonly);
    		if ('handlesTrailingIconClicks' in $$props) $$invalidate(12, handlesTrailingIconClicks = $$props.handlesTrailingIconClicks);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*handletrailingiconclick*/ 32768) {
    			$$invalidate(12, handlesTrailingIconClicks = toBoolean(handletrailingiconclick));
    		}

    		if ($$self.$$.dirty & /*focused*/ 65536) {
    			$$invalidate(19, isFocused = toBoolean(focused));
    		}

    		if ($$self.$$.dirty & /*readonly*/ 131072) {
    			$$invalidate(11, isReadonly = toBoolean(readonly));
    		}

    		if ($$self.$$.dirty & /*error*/ 262144) {
    			$$invalidate(10, isError = toBoolean(error));
    		}

    		if ($$self.$$.dirty & /*disabled*/ 16384) {
    			$$invalidate(9, isDisabled = toBoolean(disabled));
    		}

    		if ($$self.$$.dirty & /*isFocused, inputEl*/ 524544) {
    			if (isFocused) {
    				inputEl === null || inputEl === void 0
    				? void 0
    				: inputEl.focus();
    			}
    		}
    	};

    	return [
    		type,
    		name,
    		value,
    		id,
    		placeholder,
    		leadingicon,
    		trailingicon,
    		variant,
    		inputEl,
    		isDisabled,
    		isError,
    		isReadonly,
    		handlesTrailingIconClicks,
    		onKeyUp,
    		disabled,
    		handletrailingiconclick,
    		focused,
    		readonly,
    		error,
    		isFocused,
    		input_binding
    	];
    }

    class Input_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.goa-input,.goa-input *{box-sizing:border-box}.goa-input{box-sizing:border-box;outline:none;transition:box-shadow 0.1s ease-in;border:1px solid var(--color-gray-700);border-radius:3px;background:white;color:var(--color-gray-900, #ccc);padding:var(--input-padding, 0.5rem) 0.5rem;display:flex;align-items:center}.goa-input input[readonly]{cursor:pointer}.goa-input:hover{border-color:var(--color-blue-600)}.goa-input:active,.goa-input:focus,.goa-input:focus-within{box-shadow:0 0 0 3px var(--color-orange)}.goa-input:disabled{border-color:var(--color-gray-500)}.goa-input:disabled:hover{border-color:var(--color-gray-500)}.goa-input:disabled:focus{box-shadow:none}.goa-input-leading-icon{line-height:18px;padding:0.5rem}.goa-input-trailing-icon{display:flex;align-items:center}.goa-input-trailing-icon>.goa-icon-button{margin-right:-0.5rem}input{display:block;width:100%;font-size:var(--input-font-size)}.goa-input-leading-icon~input{padding-left:0}input,input:focus,input:hover,input:active{outline:none;border:none}.goa-input--disabled{opacity:0.5;cursor:default;border-color:var(--color-black)}.goa-input--disabled:hover,.goa-input--disabled:active,.goa-input--disabled:focus{border-color:var(--color-black);cursor:default;box-shadow:none}.goa-input--disabled input:hover{cursor:default !important}input.input--goa{display:block;border:none;flex:1 1 auto}.goa-input .input--bare{border:none}.goa-state--error .goa-input{border:2px solid var(--color-red)}.error:hover,.error:focus,.error{border:2px solid var(--color-red-500)}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$c,
    			create_fragment$c,
    			safe_not_equal,
    			{
    				type: 0,
    				name: 1,
    				value: 2,
    				id: 3,
    				placeholder: 4,
    				leadingicon: 5,
    				trailingicon: 6,
    				variant: 7,
    				disabled: 14,
    				handletrailingiconclick: 15,
    				focused: 16,
    				readonly: 17,
    				error: 18
    			},
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*disabled*/ ctx[14] === undefined && !('disabled' in props)) {
    			console.warn("<goa-input> was created without expected prop 'disabled'");
    		}

    		if (/*handletrailingiconclick*/ ctx[15] === undefined && !('handletrailingiconclick' in props)) {
    			console.warn("<goa-input> was created without expected prop 'handletrailingiconclick'");
    		}

    		if (/*focused*/ ctx[16] === undefined && !('focused' in props)) {
    			console.warn("<goa-input> was created without expected prop 'focused'");
    		}

    		if (/*readonly*/ ctx[17] === undefined && !('readonly' in props)) {
    			console.warn("<goa-input> was created without expected prop 'readonly'");
    		}

    		if (/*error*/ ctx[18] === undefined && !('error' in props)) {
    			console.warn("<goa-input> was created without expected prop 'error'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return [
    			"type",
    			"name",
    			"value",
    			"id",
    			"placeholder",
    			"leadingicon",
    			"trailingicon",
    			"variant",
    			"disabled",
    			"handletrailingiconclick",
    			"focused",
    			"readonly",
    			"error"
    		];
    	}

    	get type() {
    		return this.$$.ctx[0];
    	}

    	set type(type) {
    		this.$$set({ type });
    		flush();
    	}

    	get name() {
    		return this.$$.ctx[1];
    	}

    	set name(name) {
    		this.$$set({ name });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[2];
    	}

    	set value(value) {
    		this.$$set({ value });
    		flush();
    	}

    	get id() {
    		return this.$$.ctx[3];
    	}

    	set id(id) {
    		this.$$set({ id });
    		flush();
    	}

    	get placeholder() {
    		return this.$$.ctx[4];
    	}

    	set placeholder(placeholder) {
    		this.$$set({ placeholder });
    		flush();
    	}

    	get leadingicon() {
    		return this.$$.ctx[5];
    	}

    	set leadingicon(leadingicon) {
    		this.$$set({ leadingicon });
    		flush();
    	}

    	get trailingicon() {
    		return this.$$.ctx[6];
    	}

    	set trailingicon(trailingicon) {
    		this.$$set({ trailingicon });
    		flush();
    	}

    	get variant() {
    		return this.$$.ctx[7];
    	}

    	set variant(variant) {
    		this.$$set({ variant });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[14];
    	}

    	set disabled(disabled) {
    		this.$$set({ disabled });
    		flush();
    	}

    	get handletrailingiconclick() {
    		return this.$$.ctx[15];
    	}

    	set handletrailingiconclick(handletrailingiconclick) {
    		this.$$set({ handletrailingiconclick });
    		flush();
    	}

    	get focused() {
    		return this.$$.ctx[16];
    	}

    	set focused(focused) {
    		this.$$set({ focused });
    		flush();
    	}

    	get readonly() {
    		return this.$$.ctx[17];
    	}

    	set readonly(readonly) {
    		this.$$set({ readonly });
    		flush();
    	}

    	get error() {
    		return this.$$.ctx[18];
    	}

    	set error(error) {
    		this.$$set({ error });
    		flush();
    	}
    }

    customElements.define("goa-input", Input_wc);

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }
    function quartOut(t) {
        return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    function noScroll (node, opts) {
        function hideScrollbars() {
            const scrollbarWidth = calculateScrollbarWidth();
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = scrollbarWidth + 'px';
        }
        function resetScrollbars() {
            // need to perform on the next render cycle to allow the css transitions to take place
            setTimeout(() => {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '0';
            }, 500); // 500ms allows for any close animations to complete
        }
        function calculateScrollbarWidth() {
            // no scrollbars present
            if (document.body.clientHeight <= document.documentElement.clientHeight) {
                return 0;
            }
            const outer = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.overflow = 'scroll';
            document.body.appendChild(outer);
            // Creating inner element and placing it in the container
            const inner = document.createElement('div');
            outer.appendChild(inner);
            // Calculating difference between container's full width and the child width
            const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
            // Removing temporary elements from the DOM
            outer.parentNode.removeChild(outer);
            return scrollbarWidth;
        }
        if (opts.enable) {
            hideScrollbars();
        }
        return {
            update() {
                if (opts.enable) {
                    hideScrollbars();
                }
                else {
                    resetScrollbars();
                }
            },
            destroy() {
                resetScrollbars();
            }
        };
    }

    /* src/Modal.wc.svelte generated by Svelte v3.46.2 */
    const file$b = "src/Modal.wc.svelte";

    // (33:0) {#if isOpen}
    function create_if_block$5(ctx) {
    	let div4;
    	let div0;
    	let t0;
    	let div3;
    	let t1;
    	let t2;
    	let div1;
    	let t3;
    	let slot0;
    	let t4;
    	let div2;
    	let slot1;
    	let div3_intro;
    	let div3_outro;
    	let noscroll_action;
    	let div4_intro;
    	let div4_outro;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*title*/ ctx[0] && create_if_block_3$1(ctx);
    	let if_block1 = /*isClosable*/ ctx[4] && create_if_block_2$2(ctx);

    	function select_block_type(ctx, dirty) {
    		if (/*isScrollable*/ ctx[3]) return create_if_block_1$3;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block2 = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div3 = element("div");
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			div1 = element("div");
    			if_block2.c();
    			t3 = space();
    			slot0 = element("slot");
    			t4 = space();
    			div2 = element("div");
    			slot1 = element("slot");
    			attr_dev(div0, "class", "modal-overlay");
    			add_location(div0, file$b, 34, 4, 1232);
    			add_location(slot0, file$b, 54, 8, 1917);
    			attr_dev(div1, "class", "modal-content");
    			add_location(div1, file$b, 44, 6, 1619);
    			attr_dev(slot1, "name", "actions");
    			add_location(slot1, file$b, 57, 8, 1981);
    			attr_dev(div2, "class", "modal-actions");
    			add_location(div2, file$b, 56, 6, 1945);
    			attr_dev(div3, "class", "modal-pane");
    			add_location(div3, file$b, 35, 4, 1287);
    			attr_dev(div4, "class", "modal");
    			set_style(div4, "--scroll-offset", /*scrollOffset*/ ctx[2] + "px");
    			add_location(div4, file$b, 33, 2, 1069);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			if (if_block0) if_block0.m(div3, null);
    			append_dev(div3, t1);
    			if (if_block1) if_block1.m(div3, null);
    			append_dev(div3, t2);
    			append_dev(div3, div1);
    			if_block2.m(div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, slot0);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, slot1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", close, false, false, false),
    					action_destroyer(noscroll_action = noScroll.call(null, div4, { enable: /*isOpen*/ ctx[1] }))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*title*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_3$1(ctx);
    					if_block0.c();
    					if_block0.m(div3, t1);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*isClosable*/ ctx[4]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_2$2(ctx);
    					if_block1.c();
    					if_block1.m(div3, t2);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block2.d(1);
    				if_block2 = current_block_type(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(div1, t3);
    				}
    			}

    			if (!current || dirty & /*scrollOffset*/ 4) {
    				set_style(div4, "--scroll-offset", /*scrollOffset*/ ctx[2] + "px");
    			}

    			if (noscroll_action && is_function(noscroll_action.update) && dirty & /*isOpen*/ 2) noscroll_action.update.call(null, { enable: /*isOpen*/ ctx[1] });
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (div3_outro) div3_outro.end(1);
    				div3_intro = create_in_transition(div3, fly, { duration: 200, y: 200 });
    				div3_intro.start();
    			});

    			add_render_callback(() => {
    				if (div4_outro) div4_outro.end(1);
    				div4_intro = create_in_transition(div4, fade, { duration: 200 });
    				div4_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (div3_intro) div3_intro.invalidate();
    			div3_outro = create_out_transition(div3, fly, { delay: 200, duration: 200, y: -100 });
    			if (div4_intro) div4_intro.invalidate();
    			div4_outro = create_out_transition(div4, fade, { delay: 200, duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if_block2.d();
    			if (detaching && div3_outro) div3_outro.end();
    			if (detaching && div4_outro) div4_outro.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(33:0) {#if isOpen}",
    		ctx
    	});

    	return block;
    }

    // (37:6) {#if title}
    function create_if_block_3$1(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*title*/ ctx[0]);
    			attr_dev(div, "class", "modal-title");
    			add_location(div, file$b, 37, 8, 1418);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(37:6) {#if title}",
    		ctx
    	});

    	return block;
    }

    // (40:6) {#if isClosable}
    function create_if_block_2$2(ctx) {
    	let div;
    	let goa_icon_button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			goa_icon_button = element("goa-icon-button");
    			set_custom_element_data(goa_icon_button, "type", "close");
    			add_location(goa_icon_button, file$b, 41, 10, 1536);
    			attr_dev(div, "class", "modal-close");
    			add_location(div, file$b, 40, 8, 1500);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, goa_icon_button);

    			if (!mounted) {
    				dispose = listen_dev(goa_icon_button, "click", close, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(40:6) {#if isClosable}",
    		ctx
    	});

    	return block;
    }

    // (50:8) {:else}
    function create_else_block$2(ctx) {
    	let div;
    	let slot;

    	const block = {
    		c: function create() {
    			div = element("div");
    			slot = element("slot");
    			add_location(slot, file$b, 51, 12, 1869);
    			set_style(div, "margin", "1.75rem");
    			add_location(div, file$b, 50, 10, 1826);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, slot);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(50:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (46:8) {#if isScrollable}
    function create_if_block_1$3(ctx) {
    	let goa_scrollable;
    	let slot;

    	const block = {
    		c: function create() {
    			goa_scrollable = element("goa-scrollable");
    			slot = element("slot");
    			add_location(slot, file$b, 47, 12, 1763);
    			set_custom_element_data(goa_scrollable, "direction", "vertical");
    			set_custom_element_data(goa_scrollable, "height", "50");
    			set_custom_element_data(goa_scrollable, "hpadding", "1.75");
    			add_location(goa_scrollable, file$b, 46, 10, 1684);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, goa_scrollable, anchor);
    			append_dev(goa_scrollable, slot);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(goa_scrollable);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(46:8) {#if isScrollable}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*isOpen*/ ctx[1] && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			this.c = noop;
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*isOpen*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*isOpen*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function close(e) {
    	e.target.dispatchEvent(new CustomEvent("_close", { composed: true }));
    	e.stopPropagation();
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let isClosable;
    	let isScrollable;
    	let isOpen;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-modal', slots, []);
    	let { title } = $$props;
    	let { closable } = $$props;
    	let { scrollable } = $$props;
    	let { open } = $$props;
    	let scrollOffset = 0;
    	const writable_props = ['title', 'closable', 'scrollable', 'open'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-modal> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('closable' in $$props) $$invalidate(5, closable = $$props.closable);
    		if ('scrollable' in $$props) $$invalidate(6, scrollable = $$props.scrollable);
    		if ('open' in $$props) $$invalidate(7, open = $$props.open);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		fly,
    		noscroll: noScroll,
    		toBoolean,
    		title,
    		closable,
    		scrollable,
    		open,
    		scrollOffset,
    		close,
    		isOpen,
    		isScrollable,
    		isClosable
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('closable' in $$props) $$invalidate(5, closable = $$props.closable);
    		if ('scrollable' in $$props) $$invalidate(6, scrollable = $$props.scrollable);
    		if ('open' in $$props) $$invalidate(7, open = $$props.open);
    		if ('scrollOffset' in $$props) $$invalidate(2, scrollOffset = $$props.scrollOffset);
    		if ('isOpen' in $$props) $$invalidate(1, isOpen = $$props.isOpen);
    		if ('isScrollable' in $$props) $$invalidate(3, isScrollable = $$props.isScrollable);
    		if ('isClosable' in $$props) $$invalidate(4, isClosable = $$props.isClosable);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*closable*/ 32) {
    			$$invalidate(4, isClosable = toBoolean(closable));
    		}

    		if ($$self.$$.dirty & /*scrollable*/ 64) {
    			$$invalidate(3, isScrollable = toBoolean(scrollable));
    		}

    		if ($$self.$$.dirty & /*open*/ 128) {
    			$$invalidate(1, isOpen = toBoolean(open));
    		}

    		if ($$self.$$.dirty & /*isOpen*/ 2) {
    			{
    				if (isOpen) {
    					$$invalidate(2, scrollOffset = window.pageYOffset);
    				}
    			}
    		}
    	};

    	return [
    		title,
    		isOpen,
    		scrollOffset,
    		isScrollable,
    		isClosable,
    		closable,
    		scrollable,
    		open
    	];
    }

    class Modal_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.modal{font-family:var(--font-family);position:absolute;top:var(--scroll-offset, 0);left:0;display:flex;align-items:center;justify-content:center;height:100vh;width:100%;z-index:100}.modal-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.2);z-index:1000}.modal-pane{position:relative;background-color:#fff;z-index:1001;max-width:60ch;margin:1rem;box-shadow:var(--shadow-2);border-radius:4px;width:90%;max-height:90%}@media(min-width: 640px){.modal-pane{margin:1rem;max-height:80%;width:600px}}@media(min-width: 1024px){.modal-pane{width:65ch;max-height:80%}}.modal-actions{text-align:right;padding:0 1.75rem;margin:1.75rem 0;flex:1 1  auto}.modal-close{position:absolute;top:1rem;right:1rem}.modal-title{font-size:var(--fs-xl);padding-bottom:1rem;padding:0 1.75rem;margin:1.75rem 0;margin-right:40px;flex:0 0 auto}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$b,
    			create_fragment$b,
    			safe_not_equal,
    			{
    				title: 0,
    				closable: 5,
    				scrollable: 6,
    				open: 7
    			},
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<goa-modal> was created without expected prop 'title'");
    		}

    		if (/*closable*/ ctx[5] === undefined && !('closable' in props)) {
    			console.warn("<goa-modal> was created without expected prop 'closable'");
    		}

    		if (/*scrollable*/ ctx[6] === undefined && !('scrollable' in props)) {
    			console.warn("<goa-modal> was created without expected prop 'scrollable'");
    		}

    		if (/*open*/ ctx[7] === undefined && !('open' in props)) {
    			console.warn("<goa-modal> was created without expected prop 'open'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["title", "closable", "scrollable", "open"];
    	}

    	get title() {
    		return this.$$.ctx[0];
    	}

    	set title(title) {
    		this.$$set({ title });
    		flush();
    	}

    	get closable() {
    		return this.$$.ctx[5];
    	}

    	set closable(closable) {
    		this.$$set({ closable });
    		flush();
    	}

    	get scrollable() {
    		return this.$$.ctx[6];
    	}

    	set scrollable(scrollable) {
    		this.$$set({ scrollable });
    		flush();
    	}

    	get open() {
    		return this.$$.ctx[7];
    	}

    	set open(open) {
    		this.$$set({ open });
    		flush();
    	}
    }

    customElements.define("goa-modal", Modal_wc);

    /* src/Notification.wc.svelte generated by Svelte v3.46.2 */
    const file$a = "src/Notification.wc.svelte";

    // (21:0) {#if show}
    function create_if_block$4(ctx) {
    	let div3;
    	let div0;
    	let goa_icon;
    	let t0;
    	let div1;
    	let slot;
    	let t1;
    	let div2;
    	let goa_icon_button;
    	let div3_class_value;
    	let div3_transition;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			goa_icon = element("goa-icon");
    			t0 = space();
    			div1 = element("div");
    			slot = element("slot");
    			t1 = space();
    			div2 = element("div");
    			goa_icon_button = element("goa-icon-button");
    			set_custom_element_data(goa_icon, "type", /*iconType*/ ctx[2]);
    			set_custom_element_data(goa_icon, "inverted", "");
    			add_location(goa_icon, file$a, 23, 6, 532);
    			attr_dev(div0, "class", "icon");
    			add_location(div0, file$a, 22, 4, 507);
    			add_location(slot, file$a, 26, 6, 613);
    			attr_dev(div1, "class", "content");
    			add_location(div1, file$a, 25, 4, 585);
    			set_custom_element_data(goa_icon_button, "type", "close");
    			set_custom_element_data(goa_icon_button, "inverted", "");
    			add_location(goa_icon_button, file$a, 29, 6, 663);
    			attr_dev(div2, "class", "close");
    			add_location(div2, file$a, 28, 4, 637);
    			attr_dev(div3, "class", div3_class_value = "notification " + /*type*/ ctx[0]);
    			add_location(div3, file$a, 21, 2, 453);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, goa_icon);
    			append_dev(div3, t0);
    			append_dev(div3, div1);
    			append_dev(div1, slot);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, goa_icon_button);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(goa_icon_button, "click", /*close*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*iconType*/ 4) {
    				set_custom_element_data(goa_icon, "type", /*iconType*/ ctx[2]);
    			}

    			if (!current || dirty & /*type*/ 1 && div3_class_value !== (div3_class_value = "notification " + /*type*/ ctx[0])) {
    				attr_dev(div3, "class", div3_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div3_transition) div3_transition = create_bidirectional_transition(div3, fade, {}, true);
    				div3_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div3_transition) div3_transition = create_bidirectional_transition(div3, fade, {}, false);
    			div3_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (detaching && div3_transition) div3_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(21:0) {#if show}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*show*/ ctx[1] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			this.c = noop;
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*show*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*show*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let iconType;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-notification', slots, []);
    	let { type } = $$props;
    	let show = true;

    	function close() {
    		$$invalidate(1, show = false);
    	}

    	const writable_props = ['type'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-notification> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    	};

    	$$self.$capture_state = () => ({ fade, type, show, close, iconType });

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('show' in $$props) $$invalidate(1, show = $$props.show);
    		if ('iconType' in $$props) $$invalidate(2, iconType = $$props.iconType);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*type*/ 1) {
    			$$invalidate(2, iconType = type === "emergency"
    			? "warning"
    			: type === "caution"
    				? "alert-circle"
    				: type === "information"
    					? "information-circle"
    					: "calendar");
    		}
    	};

    	return [type, show, iconType, close];
    }

    class Notification_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.notification{padding:1.5rem;display:flex;align-items:center;gap:1rem;border-radius:3px}.emergency{background-color:var(--color-red);color:var(--color-white)}.caution{background-color:var(--color-orange)}.information{background-color:var(--color-blue);color:var(--color-white)}.event{background-color:var(--color-green);color:var(--color-white)}.icon{flex:0 0 auto;align-self:flex-start}.content{flex:1 1 auto}.close{flex:0 0 auto;align-self:flex-start}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$a,
    			create_fragment$a,
    			safe_not_equal,
    			{ type: 0 },
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*type*/ ctx[0] === undefined && !('type' in props)) {
    			console.warn("<goa-notification> was created without expected prop 'type'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["type"];
    	}

    	get type() {
    		return this.$$.ctx[0];
    	}

    	set type(type) {
    		this.$$set({ type });
    		flush();
    	}
    }

    customElements.define("goa-notification", Notification_wc);

    /* src/layouts/PageLayout.wc.svelte generated by Svelte v3.46.2 */

    const file$9 = "src/layouts/PageLayout.wc.svelte";

    function create_fragment$9(ctx) {
    	let div;
    	let slot;

    	const block = {
    		c: function create() {
    			div = element("div");
    			slot = element("slot");
    			this.c = noop;
    			add_location(slot, file$9, 7, 2, 124);
    			attr_dev(div, "class", "layout");
    			add_location(div, file$9, 6, 0, 101);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, slot);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-page-layout', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-page-layout> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class PageLayout_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>@media(min-width: 768px){.layout{}}.layout{max-width:768px;margin:0 auto;padding:2rem}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$9,
    			create_fragment$9,
    			safe_not_equal,
    			{},
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}
    		}
    	}
    }

    customElements.define("goa-page-layout", PageLayout_wc);

    /* src/PageLoader.wc.svelte generated by Svelte v3.46.2 */
    const file$8 = "src/PageLoader.wc.svelte";

    // (19:0) {#if ready}
    function create_if_block$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$2, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*fullscreen*/ ctx[5]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(19:0) {#if ready}",
    		ctx
    	});

    	return block;
    }

    // (27:2) {:else}
    function create_else_block$1(ctx) {
    	let div;
    	let goa_spinner;
    	let goa_spinner_progress_value;
    	let t;
    	let if_block = /*message*/ ctx[1] && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			goa_spinner = element("goa-spinner");
    			t = space();
    			if (if_block) if_block.c();
    			set_custom_element_data(goa_spinner, "type", /*type*/ ctx[0]);
    			set_custom_element_data(goa_spinner, "size", "xlarge");
    			set_custom_element_data(goa_spinner, "progress", goa_spinner_progress_value = /*progress*/ ctx[2] || 0);
    			add_location(goa_spinner, file$8, 28, 6, 843);
    			toggle_class(div, "inline", /*inline*/ ctx[4]);
    			add_location(div, file$8, 27, 4, 818);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, goa_spinner);
    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*type*/ 1) {
    				set_custom_element_data(goa_spinner, "type", /*type*/ ctx[0]);
    			}

    			if (dirty & /*progress*/ 4 && goa_spinner_progress_value !== (goa_spinner_progress_value = /*progress*/ ctx[2] || 0)) {
    				set_custom_element_data(goa_spinner, "progress", goa_spinner_progress_value);
    			}

    			if (/*message*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*inline*/ 16) {
    				toggle_class(div, "inline", /*inline*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(27:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (20:2) {#if fullscreen}
    function create_if_block_1$2(ctx) {
    	let div;
    	let goa_spinner;
    	let goa_spinner_progress_value;
    	let t;
    	let div_transition;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*message*/ ctx[1] && create_if_block_2$1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			goa_spinner = element("goa-spinner");
    			t = space();
    			if (if_block) if_block.c();
    			set_custom_element_data(goa_spinner, "type", /*type*/ ctx[0]);
    			set_custom_element_data(goa_spinner, "size", "xlarge");
    			set_custom_element_data(goa_spinner, "progress", goa_spinner_progress_value = /*progress*/ ctx[2] || 0);
    			add_location(goa_spinner, file$8, 21, 6, 649);
    			toggle_class(div, "fullscreen", /*fullscreen*/ ctx[5]);
    			add_location(div, file$8, 20, 4, 556);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, goa_spinner);
    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(noScroll.call(null, div, { enable: true }));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*type*/ 1) {
    				set_custom_element_data(goa_spinner, "type", /*type*/ ctx[0]);
    			}

    			if (!current || dirty & /*progress*/ 4 && goa_spinner_progress_value !== (goa_spinner_progress_value = /*progress*/ ctx[2] || 0)) {
    				set_custom_element_data(goa_spinner, "progress", goa_spinner_progress_value);
    			}

    			if (/*message*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2$1(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*fullscreen*/ 32) {
    				toggle_class(div, "fullscreen", /*fullscreen*/ ctx[5]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: 300 }, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: 300 }, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			if (detaching && div_transition) div_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(20:2) {#if fullscreen}",
    		ctx
    	});

    	return block;
    }

    // (30:6) {#if message}
    function create_if_block_3(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*message*/ ctx[1]);
    			attr_dev(div, "class", "message");
    			add_location(div, file$8, 30, 8, 938);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*message*/ 2) set_data_dev(t, /*message*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(30:6) {#if message}",
    		ctx
    	});

    	return block;
    }

    // (23:6) {#if message}
    function create_if_block_2$1(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*message*/ ctx[1]);
    			attr_dev(div, "class", "message");
    			add_location(div, file$8, 23, 8, 744);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*message*/ 2) set_data_dev(t, /*message*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(23:6) {#if message}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*ready*/ ctx[3] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			this.c = noop;
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*ready*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*ready*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let isVisible;
    	let fullscreen;
    	let inline;
    	let ready;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-page-loader', slots, []);
    	let { type = 'infinite' } = $$props;
    	let { message } = $$props;
    	let { progress = 0 } = $$props;
    	let { visible } = $$props;
    	let { variant = "inline" } = $$props;
    	const writable_props = ['type', 'message', 'progress', 'visible', 'variant'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-page-loader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('message' in $$props) $$invalidate(1, message = $$props.message);
    		if ('progress' in $$props) $$invalidate(2, progress = $$props.progress);
    		if ('visible' in $$props) $$invalidate(6, visible = $$props.visible);
    		if ('variant' in $$props) $$invalidate(7, variant = $$props.variant);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		noScroll,
    		toBoolean,
    		type,
    		message,
    		progress,
    		visible,
    		variant,
    		isVisible,
    		ready,
    		inline,
    		fullscreen
    	});

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('message' in $$props) $$invalidate(1, message = $$props.message);
    		if ('progress' in $$props) $$invalidate(2, progress = $$props.progress);
    		if ('visible' in $$props) $$invalidate(6, visible = $$props.visible);
    		if ('variant' in $$props) $$invalidate(7, variant = $$props.variant);
    		if ('isVisible' in $$props) $$invalidate(8, isVisible = $$props.isVisible);
    		if ('ready' in $$props) $$invalidate(3, ready = $$props.ready);
    		if ('inline' in $$props) $$invalidate(4, inline = $$props.inline);
    		if ('fullscreen' in $$props) $$invalidate(5, fullscreen = $$props.fullscreen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*visible, variant*/ 192) {
    			$$invalidate(8, isVisible = toBoolean(visible) || variant === "inline");
    		}

    		if ($$self.$$.dirty & /*variant*/ 128) {
    			$$invalidate(5, fullscreen = variant === "fullscreen");
    		}

    		if ($$self.$$.dirty & /*variant*/ 128) {
    			$$invalidate(4, inline = variant === "inline");
    		}

    		if ($$self.$$.dirty & /*type, isVisible*/ 257) {
    			$$invalidate(3, ready = type && isVisible);
    		}
    	};

    	return [
    		type,
    		message,
    		progress,
    		ready,
    		inline,
    		fullscreen,
    		visible,
    		variant,
    		isVisible
    	];
    }

    class PageLoader_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.fullscreen{position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;background-color:rgba(255, 255, 255, 0.9)}.inline{margin:3.5rem;display:flex;flex-direction:column;align-items:center;justify-content:center}.message{margin-top:1rem;font-size:1.2rem}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$8,
    			create_fragment$8,
    			safe_not_equal,
    			{
    				type: 0,
    				message: 1,
    				progress: 2,
    				visible: 6,
    				variant: 7
    			},
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*message*/ ctx[1] === undefined && !('message' in props)) {
    			console.warn("<goa-page-loader> was created without expected prop 'message'");
    		}

    		if (/*visible*/ ctx[6] === undefined && !('visible' in props)) {
    			console.warn("<goa-page-loader> was created without expected prop 'visible'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["type", "message", "progress", "visible", "variant"];
    	}

    	get type() {
    		return this.$$.ctx[0];
    	}

    	set type(type) {
    		this.$$set({ type });
    		flush();
    	}

    	get message() {
    		return this.$$.ctx[1];
    	}

    	set message(message) {
    		this.$$set({ message });
    		flush();
    	}

    	get progress() {
    		return this.$$.ctx[2];
    	}

    	set progress(progress) {
    		this.$$set({ progress });
    		flush();
    	}

    	get visible() {
    		return this.$$.ctx[6];
    	}

    	set visible(visible) {
    		this.$$set({ visible });
    		flush();
    	}

    	get variant() {
    		return this.$$.ctx[7];
    	}

    	set variant(variant) {
    		this.$$set({ variant });
    		flush();
    	}
    }

    customElements.define("goa-page-loader", PageLoader_wc);

    // Stores
    const messageChannel = writable({});

    /* src/RadioGroup.wc.svelte generated by Svelte v3.46.2 */

    const { Object: Object_1$1 } = globals;
    const file$7 = "src/RadioGroup.wc.svelte";

    function create_fragment$7(ctx) {
    	let div1;
    	let div0;
    	let slot;
    	let div0_class_value;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			slot = element("slot");
    			this.c = noop;
    			add_location(slot, file$7, 58, 4, 1582);
    			attr_dev(div0, "class", div0_class_value = `goa-radio-group--${/*orientation*/ ctx[0]}`);
    			add_location(div0, file$7, 57, 2, 1515);
    			add_location(div1, file$7, 56, 0, 1507);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, slot);
    			/*div0_binding*/ ctx[8](div0);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*orientation*/ 1 && div0_class_value !== (div0_class_value = `goa-radio-group--${/*orientation*/ ctx[0]}`)) {
    				attr_dev(div0, "class", div0_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			/*div0_binding*/ ctx[8](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let isDisabled;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-radio-group', slots, []);
    	let { name } = $$props;
    	let { value } = $$props;
    	let { orientation = 'vertical' } = $$props;
    	let { disabled } = $$props;
    	let { error } = $$props;

    	// private
    	let isError;
    	let el;
    	let unsubscribe;

    	onMount(() => {
    		// set initial state
    		messageChannel.update(prev => {
    			return Object.assign(Object.assign({}, prev), {
    				[name]: {
    					tag: name,
    					payload: {
    						value,
    						disabled: isDisabled,
    						error: isError
    					}
    				}
    			});
    		});

    		unsubscribe = messageChannel.subscribe(state => {
    			const payload = state[name].payload;

    			if (payload.value !== value) {
    				$$invalidate(2, value = payload.value);

    				el.dispatchEvent(new CustomEvent('_change',
    				{
    						composed: true,
    						detail: { name, value: payload.value }
    					}));
    			}
    		});
    	});

    	onDestroy(unsubscribe);
    	const writable_props = ['name', 'value', 'orientation', 'disabled', 'error'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-radio-group> was created with unknown prop '${key}'`);
    	});

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			el = $$value;
    			$$invalidate(1, el);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(3, name = $$props.name);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    		if ('orientation' in $$props) $$invalidate(0, orientation = $$props.orientation);
    		if ('disabled' in $$props) $$invalidate(4, disabled = $$props.disabled);
    		if ('error' in $$props) $$invalidate(5, error = $$props.error);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		onMount,
    		messageChannel,
    		toBoolean,
    		name,
    		value,
    		orientation,
    		disabled,
    		error,
    		isError,
    		el,
    		unsubscribe,
    		isDisabled
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(3, name = $$props.name);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    		if ('orientation' in $$props) $$invalidate(0, orientation = $$props.orientation);
    		if ('disabled' in $$props) $$invalidate(4, disabled = $$props.disabled);
    		if ('error' in $$props) $$invalidate(5, error = $$props.error);
    		if ('isError' in $$props) $$invalidate(6, isError = $$props.isError);
    		if ('el' in $$props) $$invalidate(1, el = $$props.el);
    		if ('unsubscribe' in $$props) unsubscribe = $$props.unsubscribe;
    		if ('isDisabled' in $$props) $$invalidate(7, isDisabled = $$props.isDisabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*disabled*/ 16) {
    			$$invalidate(7, isDisabled = toBoolean(disabled));
    		}

    		if ($$self.$$.dirty & /*error, name, value, isDisabled, isError*/ 236) {
    			{
    				$$invalidate(6, isError = toBoolean(error));

    				messageChannel.update(prev => {
    					return Object.assign(Object.assign({}, prev), {
    						[name]: {
    							tag: name,
    							payload: {
    								value,
    								disabled: isDisabled,
    								error: isError
    							}
    						}
    					});
    				});
    			}
    		}
    	};

    	return [
    		orientation,
    		el,
    		value,
    		name,
    		disabled,
    		error,
    		isError,
    		isDisabled,
    		div0_binding
    	];
    }

    class RadioGroup_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.goa-radio-group--horizontal{display:flex;flex-direction:row}.goa-radio-group--vertical{display:inline-flex;flex-direction:column}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$7,
    			create_fragment$7,
    			safe_not_equal,
    			{
    				name: 3,
    				value: 2,
    				orientation: 0,
    				disabled: 4,
    				error: 5
    			},
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*name*/ ctx[3] === undefined && !('name' in props)) {
    			console.warn("<goa-radio-group> was created without expected prop 'name'");
    		}

    		if (/*value*/ ctx[2] === undefined && !('value' in props)) {
    			console.warn("<goa-radio-group> was created without expected prop 'value'");
    		}

    		if (/*disabled*/ ctx[4] === undefined && !('disabled' in props)) {
    			console.warn("<goa-radio-group> was created without expected prop 'disabled'");
    		}

    		if (/*error*/ ctx[5] === undefined && !('error' in props)) {
    			console.warn("<goa-radio-group> was created without expected prop 'error'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["name", "value", "orientation", "disabled", "error"];
    	}

    	get name() {
    		return this.$$.ctx[3];
    	}

    	set name(name) {
    		this.$$set({ name });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[2];
    	}

    	set value(value) {
    		this.$$set({ value });
    		flush();
    	}

    	get orientation() {
    		return this.$$.ctx[0];
    	}

    	set orientation(orientation) {
    		this.$$set({ orientation });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[4];
    	}

    	set disabled(disabled) {
    		this.$$set({ disabled });
    		flush();
    	}

    	get error() {
    		return this.$$.ctx[5];
    	}

    	set error(error) {
    		this.$$set({ error });
    		flush();
    	}
    }

    customElements.define("goa-radio-group", RadioGroup_wc);

    /* src/RadioItem.wc.svelte generated by Svelte v3.46.2 */

    const { Object: Object_1 } = globals;
    const file$6 = "src/RadioItem.wc.svelte";

    function create_fragment$6(ctx) {
    	let label_1;
    	let input;
    	let t0;
    	let div;
    	let t1;
    	let span;
    	let slot;
    	let t2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			input = element("input");
    			t0 = space();
    			div = element("div");
    			t1 = space();
    			span = element("span");
    			slot = element("slot");
    			t2 = text(/*label*/ ctx[1]);
    			this.c = noop;
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "name", /*name*/ ctx[2]);
    			input.value = /*value*/ ctx[0];
    			input.checked = /*checked*/ ctx[4];
    			input.disabled = /*disabled*/ ctx[3];
    			add_location(input, file$6, 49, 2, 1195);
    			attr_dev(div, "class", "goa-radio-icon");
    			add_location(div, file$6, 57, 2, 1303);
    			add_location(slot, file$6, 59, 4, 1371);
    			attr_dev(span, "class", "goa-radio-label");
    			add_location(span, file$6, 58, 2, 1336);
    			attr_dev(label_1, "class", "goa-radio");
    			toggle_class(label_1, "goa-radio--disabled", /*disabled*/ ctx[3]);
    			toggle_class(label_1, "goa-radio--error", /*error*/ ctx[5]);
    			add_location(label_1, file$6, 44, 0, 1090);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, input);
    			append_dev(label_1, t0);
    			append_dev(label_1, div);
    			append_dev(label_1, t1);
    			append_dev(label_1, span);
    			append_dev(span, slot);
    			append_dev(slot, t2);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*onChange*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 4) {
    				attr_dev(input, "name", /*name*/ ctx[2]);
    			}

    			if (dirty & /*value*/ 1) {
    				prop_dev(input, "value", /*value*/ ctx[0]);
    			}

    			if (dirty & /*checked*/ 16) {
    				prop_dev(input, "checked", /*checked*/ ctx[4]);
    			}

    			if (dirty & /*disabled*/ 8) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[3]);
    			}

    			if (dirty & /*label*/ 2) set_data_dev(t2, /*label*/ ctx[1]);

    			if (dirty & /*disabled*/ 8) {
    				toggle_class(label_1, "goa-radio--disabled", /*disabled*/ ctx[3]);
    			}

    			if (dirty & /*error*/ 32) {
    				toggle_class(label_1, "goa-radio--error", /*error*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-radio-item', slots, []);
    	let { value } = $$props;
    	let { label } = $$props;
    	let { name } = $$props;

    	// private
    	let disabled = false;

    	let checked = false;
    	let error = false;
    	let unsubscribe;

    	// Hooks
    	onMount(() => {
    		unsubscribe = messageChannel.subscribe(channel => {
    			const msg = channel[name];

    			if ((msg === null || msg === void 0 ? void 0 : msg.tag) !== name) {
    				return;
    			}

    			$$invalidate(4, checked = msg.payload.value === value);
    			$$invalidate(3, disabled = msg.payload.disabled);
    			$$invalidate(5, error = msg.payload.error);
    		});
    	});

    	onDestroy(unsubscribe);

    	// Events
    	function onChange(e) {
    		$$invalidate(4, checked = !checked);

    		if (checked) {
    			messageChannel.update(prev => {
    				return Object.assign(Object.assign({}, prev), {
    					[name]: { tag: name, payload: { disabled, value } }
    				});
    			});
    		}
    	}

    	const writable_props = ['value', 'label', 'name'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-radio-item> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('label' in $$props) $$invalidate(1, label = $$props.label);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		onMount,
    		messageChannel,
    		value,
    		label,
    		name,
    		disabled,
    		checked,
    		error,
    		unsubscribe,
    		onChange
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('label' in $$props) $$invalidate(1, label = $$props.label);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ('checked' in $$props) $$invalidate(4, checked = $$props.checked);
    		if ('error' in $$props) $$invalidate(5, error = $$props.error);
    		if ('unsubscribe' in $$props) unsubscribe = $$props.unsubscribe;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, label, name, disabled, checked, error, onChange];
    }

    class RadioItem_wc extends SvelteElement {
    	constructor(options) {
    		super();

    		this.shadowRoot.innerHTML = `<style>label.goa-radio{--goa-border-color:var(--color-gray-700);--goa-border-color--checked:var(--color-blue-500);--goa-radio-color--error:var(--color-red);--goa-radio-outline-color:var(--color-orange);--goa-radio-outline-width:3px;--goa-radio-diameter:1.5rem;--goa-radio-border-width:1px;--goa-radio-border-width--checked:7px;box-sizing:border-box;display:inline-flex;align-items:center;min-height:3rem}.goa-radio:hover{cursor:pointer}.goa-radio *,.goa-radio *:before,.goa-radio *:after{box-sizing:border-box}.goa-radio input[type='radio']{display:none}.goa-radio-label{padding:0.5rem;font-weight:var(--fw-regular)}.goa-radio-icon{display:inline-block;height:var(--goa-radio-diameter);width:var(--goa-radio-diameter);border-radius:50%;background-color:#fff;transition:box-shadow 100ms ease-in-out}.goa-radio:focus>input:not(:disabled)~.goa-radio-icon{box-shadow:0 0 0 var(--goa-radio-outline-width)
      var(--goa-radio-outline-color)}.goa-radio--disabled:hover{cursor:default}input[type='radio']:checked~.goa-radio-icon{border:var(--goa-radio-border-width--checked) solid
      var(--goa-border-color--checked)}input[type='radio']:not(:checked)~.goa-radio-icon{border:var(--goa-radio-border-width) solid var(--goa-border-color)}input[type='radio']:disabled~.goa-radio-icon{border:var(--goa-radio-border-width) solid var(--goa-border-color);opacity:0.3}input[type='radio']:disabled:checked~.goa-radio-icon{border:var(--goa-radio-border-width--checked) solid
      var(--goa-border-color--checked);opacity:0.3}.goa-radio--error input[type='radio']:checked~.goa-radio-icon{border:7px solid var(--goa-radio-color--error)}.goa-radio--error input[type='radio']:not(:checked)~.goa-radio-icon{border:2px solid var(--goa-radio-color--error)}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$6,
    			create_fragment$6,
    			safe_not_equal,
    			{ value: 0, label: 1, name: 2 },
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*value*/ ctx[0] === undefined && !('value' in props)) {
    			console.warn("<goa-radio-item> was created without expected prop 'value'");
    		}

    		if (/*label*/ ctx[1] === undefined && !('label' in props)) {
    			console.warn("<goa-radio-item> was created without expected prop 'label'");
    		}

    		if (/*name*/ ctx[2] === undefined && !('name' in props)) {
    			console.warn("<goa-radio-item> was created without expected prop 'name'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["value", "label", "name"];
    	}

    	get value() {
    		return this.$$.ctx[0];
    	}

    	set value(value) {
    		this.$$set({ value });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[1];
    	}

    	set label(label) {
    		this.$$set({ label });
    		flush();
    	}

    	get name() {
    		return this.$$.ctx[2];
    	}

    	set name(name) {
    		this.$$set({ name });
    		flush();
    	}
    }

    customElements.define("goa-radio-item", RadioItem_wc);

    /* src/Scrollable.wc.svelte generated by Svelte v3.46.2 */

    const file$5 = "src/Scrollable.wc.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let slot;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			slot = element("slot");
    			this.c = noop;
    			add_location(slot, file$5, 15, 2, 433);
    			attr_dev(div, "class", "goa-scrollable");

    			attr_dev(div, "style", div_style_value = `
  --max-height: ${/*height*/ ctx[3]};
  overflow-y: ${/*direction*/ ctx[0] === "vertical" ? 'auto' : 'hidden'};
  overflow-x: ${/*direction*/ ctx[0] === "horizontal"
			? 'auto'
			: 'hidden'};
  margin: ${/*vpadding*/ ctx[2]}rem 0;
  padding: 0 ${/*hpadding*/ ctx[1]}rem;
`);

    			add_location(div, file$5, 8, 0, 178);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, slot);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*height, direction, vpadding, hpadding*/ 15 && div_style_value !== (div_style_value = `
  --max-height: ${/*height*/ ctx[3]};
  overflow-y: ${/*direction*/ ctx[0] === "vertical" ? 'auto' : 'hidden'};
  overflow-x: ${/*direction*/ ctx[0] === "horizontal"
			? 'auto'
			: 'hidden'};
  margin: ${/*vpadding*/ ctx[2]}rem 0;
  padding: 0 ${/*hpadding*/ ctx[1]}rem;
`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-scrollable', slots, []);
    	let { direction = "vertical" } = $$props;
    	let { hpadding = 0 } = $$props;
    	let { vpadding = 0 } = $$props;
    	let { height = 0 } = $$props;
    	const writable_props = ['direction', 'hpadding', 'vpadding', 'height'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-scrollable> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('direction' in $$props) $$invalidate(0, direction = $$props.direction);
    		if ('hpadding' in $$props) $$invalidate(1, hpadding = $$props.hpadding);
    		if ('vpadding' in $$props) $$invalidate(2, vpadding = $$props.vpadding);
    		if ('height' in $$props) $$invalidate(3, height = $$props.height);
    	};

    	$$self.$capture_state = () => ({ direction, hpadding, vpadding, height });

    	$$self.$inject_state = $$props => {
    		if ('direction' in $$props) $$invalidate(0, direction = $$props.direction);
    		if ('hpadding' in $$props) $$invalidate(1, hpadding = $$props.hpadding);
    		if ('vpadding' in $$props) $$invalidate(2, vpadding = $$props.vpadding);
    		if ('height' in $$props) $$invalidate(3, height = $$props.height);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [direction, hpadding, vpadding, height];
    }

    class Scrollable_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.goa-scrollable{scroll-behavior:smooth;max-height:calc(100vh * var(--max-height, 100) / 100)}.goa-scrollable::-webkit-scrollbar{width:6px}.goa-scrollable::-webkit-scrollbar-track{background:#f1f1f1}.goa-scrollable::-webkit-scrollbar-thumb{background:#888}.goa-scrollable::-webkit-scrollbar-thumb:hover{background:#555}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$5,
    			create_fragment$5,
    			safe_not_equal,
    			{
    				direction: 0,
    				hpadding: 1,
    				vpadding: 2,
    				height: 3
    			},
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["direction", "hpadding", "vpadding", "height"];
    	}

    	get direction() {
    		return this.$$.ctx[0];
    	}

    	set direction(direction) {
    		this.$$set({ direction });
    		flush();
    	}

    	get hpadding() {
    		return this.$$.ctx[1];
    	}

    	set hpadding(hpadding) {
    		this.$$set({ hpadding });
    		flush();
    	}

    	get vpadding() {
    		return this.$$.ctx[2];
    	}

    	set vpadding(vpadding) {
    		this.$$set({ vpadding });
    		flush();
    	}

    	get height() {
    		return this.$$.ctx[3];
    	}

    	set height(height) {
    		this.$$set({ height });
    		flush();
    	}
    }

    customElements.define("goa-scrollable", Scrollable_wc);

    /* src/ServiceLevelHeader.wc.svelte generated by Svelte v3.46.2 */

    const file$4 = "src/ServiceLevelHeader.wc.svelte";

    // (10:2) {#if level === 'live'}
    function create_if_block_2(ctx) {
    	let div;
    	let t0;
    	let a;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("An official site of the ");
    			a = element("a");
    			a.textContent = "Alberta Government";
    			attr_dev(a, "href", "https://www.alberta.ca/index.aspx");
    			attr_dev(a, "class", "web-link");
    			add_location(a, file$4, 11, 30, 293);
    			attr_dev(div, "class", "site-text service-level--live");
    			add_location(div, file$4, 10, 4, 219);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, a);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(10:2) {#if level === 'live'}",
    		ctx
    	});

    	return block;
    }

    // (16:2) {#if level !== 'live'}
    function create_if_block_1$1(ctx) {
    	let div0;
    	let t0;
    	let div0_class_value;
    	let t1;
    	let div1;
    	let t2;
    	let a;
    	let t4;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(/*level*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			t2 = text("This is a new ");
    			a = element("a");
    			a.textContent = "Alberta Government";
    			t4 = text(" service");
    			attr_dev(div0, "class", div0_class_value = "service-level service-level--" + /*level*/ ctx[0]?.toLowerCase());
    			add_location(div0, file$4, 16, 4, 426);
    			attr_dev(a, "href", "https://www.alberta.ca/index.aspx");
    			attr_dev(a, "class", "web-link");
    			add_location(a, file$4, 20, 20, 565);
    			attr_dev(div1, "class", "site-text");
    			add_location(div1, file$4, 19, 4, 521);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			append_dev(div1, a);
    			append_dev(div1, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*level*/ 1) set_data_dev(t0, /*level*/ ctx[0]);

    			if (dirty & /*level*/ 1 && div0_class_value !== (div0_class_value = "service-level service-level--" + /*level*/ ctx[0]?.toLowerCase())) {
    				attr_dev(div0, "class", div0_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(16:2) {#if level !== 'live'}",
    		ctx
    	});

    	return block;
    }

    // (25:2) {#if version}
    function create_if_block$2(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*version*/ ctx[1]);
    			attr_dev(div, "class", "version");
    			add_location(div, file$4, 25, 4, 725);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*version*/ 2) set_data_dev(t, /*version*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(25:2) {#if version}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let header;
    	let t0;
    	let t1;
    	let div;
    	let t2;
    	let if_block0 = /*level*/ ctx[0] === 'live' && create_if_block_2(ctx);
    	let if_block1 = /*level*/ ctx[0] !== 'live' && create_if_block_1$1(ctx);
    	let if_block2 = /*version*/ ctx[1] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			header = element("header");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			div = element("div");
    			t2 = space();
    			if (if_block2) if_block2.c();
    			this.c = noop;
    			attr_dev(div, "class", "spacer");
    			add_location(div, file$4, 23, 2, 678);
    			attr_dev(header, "class", "goa-official-site-header");
    			add_location(header, file$4, 8, 0, 148);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			if (if_block0) if_block0.m(header, null);
    			append_dev(header, t0);
    			if (if_block1) if_block1.m(header, null);
    			append_dev(header, t1);
    			append_dev(header, div);
    			append_dev(header, t2);
    			if (if_block2) if_block2.m(header, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*level*/ ctx[0] === 'live') {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					if_block0.m(header, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*level*/ ctx[0] !== 'live') {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$1(ctx);
    					if_block1.c();
    					if_block1.m(header, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*version*/ ctx[1]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block$2(ctx);
    					if_block2.c();
    					if_block2.m(header, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-service-level-header', slots, []);
    	let { level } = $$props;
    	let { version } = $$props;
    	const writable_props = ['level', 'version'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-service-level-header> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('level' in $$props) $$invalidate(0, level = $$props.level);
    		if ('version' in $$props) $$invalidate(1, version = $$props.version);
    	};

    	$$self.$capture_state = () => ({ level, version });

    	$$self.$inject_state = $$props => {
    		if ('level' in $$props) $$invalidate(0, level = $$props.level);
    		if ('version' in $$props) $$invalidate(1, version = $$props.version);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [level, version];
    }

    class ServiceLevelHeader_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.goa-official-site-header{display:flex;font-size:var(--fs-xs);background-color:var(--color-gray-100);align-items:center;justify-content:space-between}.spacer{flex:1 1 auto}.version{padding-right:1rem;opacity:0.5}.service-level{font-weight:bold;padding:0 0.5rem}.service-level--alpha{background-color:var(--color-orange);color:var(--color-black)}.service-level--beta{background-color:var(--color-blue-600);color:var(--color-white)}.site-text{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--color-black);padding-left:0.5rem}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$4,
    			create_fragment$4,
    			safe_not_equal,
    			{ level: 0, version: 1 },
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*level*/ ctx[0] === undefined && !('level' in props)) {
    			console.warn("<goa-service-level-header> was created without expected prop 'level'");
    		}

    		if (/*version*/ ctx[1] === undefined && !('version' in props)) {
    			console.warn("<goa-service-level-header> was created without expected prop 'version'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["level", "version"];
    	}

    	get level() {
    		return this.$$.ctx[0];
    	}

    	set level(level) {
    		this.$$set({ level });
    		flush();
    	}

    	get version() {
    		return this.$$.ctx[1];
    	}

    	set version(version) {
    		this.$$set({ version });
    		flush();
    	}
    }

    customElements.define("goa-service-level-header", ServiceLevelHeader_wc);

    /* src/Skeleton.wc.svelte generated by Svelte v3.46.2 */

    const file$3 = "src/Skeleton.wc.svelte";

    // (30:0) {:else}
    function create_else_block(ctx) {
    	let div;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "skeleton " + /*type*/ ctx[2] + " " + `${/*type*/ ctx[2]}-${/*size*/ ctx[1]}`);
    			add_location(div, file$3, 30, 2, 806);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*type, size*/ 6 && div_class_value !== (div_class_value = "skeleton " + /*type*/ ctx[2] + " " + `${/*type*/ ctx[2]}-${/*size*/ ctx[1]}`)) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(30:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (20:29) 
    function create_if_block_1(ctx) {
    	let div2;
    	let div0;
    	let skeleton_wc0;
    	let t0;
    	let div1;
    	let skeleton_wc1;
    	let t1;
    	let skeleton_wc2;
    	let div2_class_value;
    	let current;

    	skeleton_wc0 = new Skeleton_wc({
    			props: { type: "avatar", size: /*size*/ ctx[1] },
    			$$inline: true
    		});

    	skeleton_wc1 = new Skeleton_wc({
    			props: { type: "title", size: /*size*/ ctx[1] },
    			$$inline: true
    		});

    	skeleton_wc2 = new Skeleton_wc({
    			props: {
    				type: "text-small",
    				size: /*size*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(skeleton_wc0.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			create_component(skeleton_wc1.$$.fragment);
    			t1 = space();
    			create_component(skeleton_wc2.$$.fragment);
    			attr_dev(div0, "class", "profile-avatar");
    			add_location(div0, file$3, 21, 4, 573);
    			attr_dev(div1, "class", "profile-name");
    			add_location(div1, file$3, 24, 4, 660);
    			attr_dev(div2, "class", div2_class_value = "profile profile-" + /*size*/ ctx[1]);
    			add_location(div2, file$3, 20, 2, 532);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(skeleton_wc0, div0, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			mount_component(skeleton_wc1, div1, null);
    			append_dev(div1, t1);
    			mount_component(skeleton_wc2, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const skeleton_wc0_changes = {};
    			if (dirty & /*size*/ 2) skeleton_wc0_changes.size = /*size*/ ctx[1];
    			skeleton_wc0.$set(skeleton_wc0_changes);
    			const skeleton_wc1_changes = {};
    			if (dirty & /*size*/ 2) skeleton_wc1_changes.size = /*size*/ ctx[1];
    			skeleton_wc1.$set(skeleton_wc1_changes);
    			const skeleton_wc2_changes = {};
    			if (dirty & /*size*/ 2) skeleton_wc2_changes.size = /*size*/ ctx[1];
    			skeleton_wc2.$set(skeleton_wc2_changes);

    			if (!current || dirty & /*size*/ 2 && div2_class_value !== (div2_class_value = "profile profile-" + /*size*/ ctx[1])) {
    				attr_dev(div2, "class", div2_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skeleton_wc0.$$.fragment, local);
    			transition_in(skeleton_wc1.$$.fragment, local);
    			transition_in(skeleton_wc2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skeleton_wc0.$$.fragment, local);
    			transition_out(skeleton_wc1.$$.fragment, local);
    			transition_out(skeleton_wc2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(skeleton_wc0);
    			destroy_component(skeleton_wc1);
    			destroy_component(skeleton_wc2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(20:29) ",
    		ctx
    	});

    	return block;
    }

    // (10:0) {#if type === "card"}
    function create_if_block$1(ctx) {
    	let div1;
    	let skeleton_wc0;
    	let t0;
    	let div0;
    	let skeleton_wc1;
    	let t1;
    	let skeleton_wc2;
    	let t2;
    	let skeleton_wc3;
    	let t3;
    	let skeleton_wc4;
    	let div1_class_value;
    	let current;

    	skeleton_wc0 = new Skeleton_wc({
    			props: { type: "image", size: /*size*/ ctx[1] },
    			$$inline: true
    		});

    	skeleton_wc1 = new Skeleton_wc({
    			props: { type: "header", size: /*size*/ ctx[1] },
    			$$inline: true
    		});

    	skeleton_wc2 = new Skeleton_wc({
    			props: { type: "text", size: /*size*/ ctx[1] },
    			$$inline: true
    		});

    	skeleton_wc3 = new Skeleton_wc({
    			props: { type: "text", size: /*size*/ ctx[1] },
    			$$inline: true
    		});

    	skeleton_wc4 = new Skeleton_wc({
    			props: { type: "text", size: /*size*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(skeleton_wc0.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			create_component(skeleton_wc1.$$.fragment);
    			t1 = space();
    			create_component(skeleton_wc2.$$.fragment);
    			t2 = space();
    			create_component(skeleton_wc3.$$.fragment);
    			t3 = space();
    			create_component(skeleton_wc4.$$.fragment);
    			attr_dev(div0, "class", "card-content");
    			add_location(div0, file$3, 12, 4, 287);
    			attr_dev(div1, "class", div1_class_value = "card card-" + /*size*/ ctx[1]);
    			set_style(div1, "--width", /*width*/ ctx[0] + "px");
    			add_location(div1, file$3, 10, 2, 184);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(skeleton_wc0, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			mount_component(skeleton_wc1, div0, null);
    			append_dev(div0, t1);
    			mount_component(skeleton_wc2, div0, null);
    			append_dev(div0, t2);
    			mount_component(skeleton_wc3, div0, null);
    			append_dev(div0, t3);
    			mount_component(skeleton_wc4, div0, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const skeleton_wc0_changes = {};
    			if (dirty & /*size*/ 2) skeleton_wc0_changes.size = /*size*/ ctx[1];
    			skeleton_wc0.$set(skeleton_wc0_changes);
    			const skeleton_wc1_changes = {};
    			if (dirty & /*size*/ 2) skeleton_wc1_changes.size = /*size*/ ctx[1];
    			skeleton_wc1.$set(skeleton_wc1_changes);
    			const skeleton_wc2_changes = {};
    			if (dirty & /*size*/ 2) skeleton_wc2_changes.size = /*size*/ ctx[1];
    			skeleton_wc2.$set(skeleton_wc2_changes);
    			const skeleton_wc3_changes = {};
    			if (dirty & /*size*/ 2) skeleton_wc3_changes.size = /*size*/ ctx[1];
    			skeleton_wc3.$set(skeleton_wc3_changes);
    			const skeleton_wc4_changes = {};
    			if (dirty & /*size*/ 2) skeleton_wc4_changes.size = /*size*/ ctx[1];
    			skeleton_wc4.$set(skeleton_wc4_changes);

    			if (!current || dirty & /*size*/ 2 && div1_class_value !== (div1_class_value = "card card-" + /*size*/ ctx[1])) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty & /*width*/ 1) {
    				set_style(div1, "--width", /*width*/ ctx[0] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skeleton_wc0.$$.fragment, local);
    			transition_in(skeleton_wc1.$$.fragment, local);
    			transition_in(skeleton_wc2.$$.fragment, local);
    			transition_in(skeleton_wc3.$$.fragment, local);
    			transition_in(skeleton_wc4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skeleton_wc0.$$.fragment, local);
    			transition_out(skeleton_wc1.$$.fragment, local);
    			transition_out(skeleton_wc2.$$.fragment, local);
    			transition_out(skeleton_wc3.$$.fragment, local);
    			transition_out(skeleton_wc4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(skeleton_wc0);
    			destroy_component(skeleton_wc1);
    			destroy_component(skeleton_wc2);
    			destroy_component(skeleton_wc3);
    			destroy_component(skeleton_wc4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(10:0) {#if type === \\\"card\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*type*/ ctx[2] === "card") return 0;
    		if (/*type*/ ctx[2] === "profile") return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    			this.c = noop;
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-skeleton', slots, []);
    	let { width = 320 } = $$props;
    	let { size = 1 } = $$props;
    	let { type } = $$props;
    	const writable_props = ['width', 'size', 'type'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-skeleton> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('type' in $$props) $$invalidate(2, type = $$props.type);
    	};

    	$$self.$capture_state = () => ({ width, size, type });

    	$$self.$inject_state = $$props => {
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('type' in $$props) $$invalidate(2, type = $$props.type);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [width, size, type];
    }

    class Skeleton_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>@keyframes pulse{0%{opacity:0.5}50%{opacity:1}100%{opacity:0.5}}.skeleton{background-color:var(--color-gray-100);animation:pulse 2s infinite ease-in-out;overflow:hidden;margin:10px 0}.image,.image-1{background-color:var(--color-gray-100);flex:1 1 100px;height:100px;margin:0}.image-2{height:140px}.image-3{height:200px}.image-4{height:300px}.text,.text-1,.text-2,.text-4,.text-4{width:100%;height:.75rem;border-radius:0.25rem}.title,.title-1,.title-2{width:100%;height:.75rem;border-radius:0.25rem}.title-3{height:.8rem}.title-4{height:1rem}.text-small,.text-small-1{width:30%;height:6px;border-radius:2px}.text-small-2{width:40%;height:8px;border-radius:2px}.text-small-3{width:50%;height:10px;border-radius:3px}.text-small-4{width:70%;height:12px;border-radius:4px}.paragraph{width:100%;height:70px;border-radius:4px}.header,.header-1{width:50%;height:18px;margin-bottom:12px;border-radius:0.25rem}.header-2{width:60%;height:20px;margin-bottom:14px;border-radius:0.25rem}.header-3{width:70%;height:22px;margin-bottom:16px;border-radius:0.25rem}.header-4{width:80%;height:24px;margin-bottom:18px;border-radius:0.3rem}.avatar,.avatar-1{width:40px;height:40px;border-radius:50%}.avatar-2{width:60px;height:60px;border-radius:50%}.avatar-3{width:80px;height:80px;border-radius:50%}.avatar-4{width:120px;height:120px;border-radius:50%}.thumbnail,.thumbnail-1{width:40px;height:40px;border-radius:4px}.thumbnail-2{width:60px;height:60px;border-radius:4px}.thumbnail-3{width:80px;height:80px;border-radius:4px}.thumbnail-4{width:120px;height:120px;border-radius:4px}.card,.card-1,.card-2,.card-3,.card-4{border:1px solid var(--color-gray-100);border-radius:4px}.card{width:100%}@media(min-width: 320px){.card{width:var(--width)}}.card-content{flex:1 1 auto;padding:1rem}.profile{display:flex;flex-direction:row;align-items:center}.profile-1{max-width:280px;gap:1rem}.profile-2{max-width:360px;gap:1rem}.profile-3{max-width:480px;gap:1rem}.profile-4{max-width:560px;gap:1rem}.profile .profile-avatar{flex-shrink:0}.profile .profile-name{flex:1 1 auto}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$3,
    			create_fragment$3,
    			safe_not_equal,
    			{ width: 0, size: 1, type: 2 },
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*type*/ ctx[2] === undefined && !('type' in props)) {
    			console.warn("<goa-skeleton> was created without expected prop 'type'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["width", "size", "type"];
    	}

    	get width() {
    		return this.$$.ctx[0];
    	}

    	set width(width) {
    		this.$$set({ width });
    		flush();
    	}

    	get size() {
    		return this.$$.ctx[1];
    	}

    	set size(size) {
    		this.$$set({ size });
    		flush();
    	}

    	get type() {
    		return this.$$.ctx[2];
    	}

    	set type(type) {
    		this.$$set({ type });
    		flush();
    	}
    }

    customElements.define("goa-skeleton", Skeleton_wc);

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function get_interpolator(a, b) {
        if (a === b || a !== a)
            return () => a;
        const type = typeof a;
        if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
            throw new Error('Cannot interpolate values of different type');
        }
        if (Array.isArray(a)) {
            const arr = b.map((bi, i) => {
                return get_interpolator(a[i], bi);
            });
            return t => arr.map(fn => fn(t));
        }
        if (type === 'object') {
            if (!a || !b)
                throw new Error('Object cannot be null');
            if (is_date(a) && is_date(b)) {
                a = a.getTime();
                b = b.getTime();
                const delta = b - a;
                return t => new Date(a + t * delta);
            }
            const keys = Object.keys(b);
            const interpolators = {};
            keys.forEach(key => {
                interpolators[key] = get_interpolator(a[key], b[key]);
            });
            return t => {
                const result = {};
                keys.forEach(key => {
                    result[key] = interpolators[key](t);
                });
                return result;
            };
        }
        if (type === 'number') {
            const delta = b - a;
            return t => a + t * delta;
        }
        throw new Error(`Cannot interpolate ${type} values`);
    }
    function tweened(value, defaults = {}) {
        const store = writable(value);
        let task;
        let target_value = value;
        function set(new_value, opts) {
            if (value == null) {
                store.set(value = new_value);
                return Promise.resolve();
            }
            target_value = new_value;
            let previous_task = task;
            let started = false;
            let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
            if (duration === 0) {
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                store.set(value = target_value);
                return Promise.resolve();
            }
            const start = now() + delay;
            let fn;
            task = loop(now => {
                if (now < start)
                    return true;
                if (!started) {
                    fn = interpolate(value, new_value);
                    if (typeof duration === 'function')
                        duration = duration(value, new_value);
                    started = true;
                }
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                const elapsed = now - start;
                if (elapsed > duration) {
                    store.set(value = new_value);
                    return false;
                }
                // @ts-ignore
                store.set(value = fn(easing(elapsed / duration)));
                return true;
            });
            return task.promise;
        }
        return {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe
        };
    }

    /* src/Spinner.wc.svelte generated by Svelte v3.46.2 */
    const file$2 = "src/Spinner.wc.svelte";

    // (59:0) {#if ready}
    function create_if_block(ctx) {
    	let svg;
    	let circle;
    	let circle_stroke_value;
    	let circle_r_value;
    	let path;
    	let path_d_value;
    	let path_stroke_value;
    	let svg_class_value;
    	let svg_viewBox_value;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			circle = svg_element("circle");
    			path = svg_element("path");
    			attr_dev(circle, "cx", /*radius*/ ctx[2]);
    			attr_dev(circle, "cy", /*radius*/ ctx[2]);

    			attr_dev(circle, "stroke", circle_stroke_value = /*invert*/ ctx[0]
    			? "var(--color-blue-600)"
    			: "var(--color-tealblue-100)");

    			attr_dev(circle, "stroke-width", /*strokewidth*/ ctx[3]);
    			attr_dev(circle, "r", circle_r_value = /*radius*/ ctx[2] - /*strokewidth*/ ctx[3] / 2);
    			add_location(circle, file$2, 67, 4, 1732);
    			attr_dev(path, "d", path_d_value = /*getArc*/ ctx[8](/*$_progress*/ ctx[6]));
    			attr_dev(path, "stroke-width", /*strokewidth*/ ctx[3]);

    			attr_dev(path, "stroke", path_stroke_value = /*invert*/ ctx[0]
    			? "var(--color-tealblue-100)"
    			: "var(--color-blue)");

    			attr_dev(path, "stroke-linecap", "round");
    			add_location(path, file$2, 74, 4, 1933);
    			attr_dev(svg, "class", svg_class_value = `spinner-${/*type*/ ctx[1]}`);
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "viewBox", svg_viewBox_value = "0 0 " + /*diameter*/ ctx[4] + " " + /*diameter*/ ctx[4]);
    			attr_dev(svg, "width", /*diameter*/ ctx[4]);
    			attr_dev(svg, "height", /*diameter*/ ctx[4]);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$2, 59, 2, 1551);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, circle);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*radius*/ 4) {
    				attr_dev(circle, "cx", /*radius*/ ctx[2]);
    			}

    			if (dirty & /*radius*/ 4) {
    				attr_dev(circle, "cy", /*radius*/ ctx[2]);
    			}

    			if (dirty & /*invert*/ 1 && circle_stroke_value !== (circle_stroke_value = /*invert*/ ctx[0]
    			? "var(--color-blue-600)"
    			: "var(--color-tealblue-100)")) {
    				attr_dev(circle, "stroke", circle_stroke_value);
    			}

    			if (dirty & /*strokewidth*/ 8) {
    				attr_dev(circle, "stroke-width", /*strokewidth*/ ctx[3]);
    			}

    			if (dirty & /*radius, strokewidth*/ 12 && circle_r_value !== (circle_r_value = /*radius*/ ctx[2] - /*strokewidth*/ ctx[3] / 2)) {
    				attr_dev(circle, "r", circle_r_value);
    			}

    			if (dirty & /*$_progress*/ 64 && path_d_value !== (path_d_value = /*getArc*/ ctx[8](/*$_progress*/ ctx[6]))) {
    				attr_dev(path, "d", path_d_value);
    			}

    			if (dirty & /*strokewidth*/ 8) {
    				attr_dev(path, "stroke-width", /*strokewidth*/ ctx[3]);
    			}

    			if (dirty & /*invert*/ 1 && path_stroke_value !== (path_stroke_value = /*invert*/ ctx[0]
    			? "var(--color-tealblue-100)"
    			: "var(--color-blue)")) {
    				attr_dev(path, "stroke", path_stroke_value);
    			}

    			if (dirty & /*type*/ 2 && svg_class_value !== (svg_class_value = `spinner-${/*type*/ ctx[1]}`)) {
    				attr_dev(svg, "class", svg_class_value);
    			}

    			if (dirty & /*diameter*/ 16 && svg_viewBox_value !== (svg_viewBox_value = "0 0 " + /*diameter*/ ctx[4] + " " + /*diameter*/ ctx[4])) {
    				attr_dev(svg, "viewBox", svg_viewBox_value);
    			}

    			if (dirty & /*diameter*/ 16) {
    				attr_dev(svg, "width", /*diameter*/ ctx[4]);
    			}

    			if (dirty & /*diameter*/ 16) {
    				attr_dev(svg, "height", /*diameter*/ ctx[4]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(59:0) {#if ready}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let if_block_anchor;
    	let if_block = /*ready*/ ctx[5] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			this.c = noop;
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*ready*/ ctx[5]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let diameter;
    	let strokewidth;
    	let radius;
    	let pathRadius;
    	let ready;
    	let $_progress;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-spinner', slots, []);
    	let { size } = $$props;
    	let { invert = false } = $$props;
    	let { type = "infinite" } = $$props;
    	let { progress = "0" } = $$props;
    	const _progress = tweened(0, { duration: 500, easing: quartOut });
    	validate_store(_progress, '_progress');
    	component_subscribe($$self, _progress, value => $$invalidate(6, $_progress = value));

    	// Functions
    	function getCoords(radians) {
    		const x = radius + pathRadius * Math.cos(radians);
    		const y = radius + pathRadius * Math.sin(radians);
    		return x + ' ' + y;
    	}

    	function getArc(progress) {
    		switch (type) {
    			case "progress":
    				{
    					const start = getCoords(-Math.PI / 2);
    					const end = getCoords(-Math.PI / 2 + 2 * Math.PI * (progress / 100));
    					const largeArcFlag = progress % 100 < 50 ? 0 : 1;
    					return `M ${start} A ${pathRadius} ${pathRadius} 0 ${largeArcFlag} 1 ${end}`;
    				}
    			case "infinite":
    				{
    					const start = getCoords(Math.PI * 1.5);
    					const end = getCoords(0);
    					return `M ${start} A ${pathRadius} ${pathRadius} 0 1 0 ${end}`;
    				}
    		}
    	}

    	const writable_props = ['size', 'invert', 'type', 'progress'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-spinner> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('invert' in $$props) $$invalidate(0, invert = $$props.invert);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('progress' in $$props) $$invalidate(10, progress = $$props.progress);
    	};

    	$$self.$capture_state = () => ({
    		tweened,
    		quartOut,
    		size,
    		invert,
    		type,
    		progress,
    		_progress,
    		getCoords,
    		getArc,
    		pathRadius,
    		radius,
    		ready,
    		strokewidth,
    		diameter,
    		$_progress
    	});

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('invert' in $$props) $$invalidate(0, invert = $$props.invert);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('progress' in $$props) $$invalidate(10, progress = $$props.progress);
    		if ('pathRadius' in $$props) $$invalidate(11, pathRadius = $$props.pathRadius);
    		if ('radius' in $$props) $$invalidate(2, radius = $$props.radius);
    		if ('ready' in $$props) $$invalidate(5, ready = $$props.ready);
    		if ('strokewidth' in $$props) $$invalidate(3, strokewidth = $$props.strokewidth);
    		if ('diameter' in $$props) $$invalidate(4, diameter = $$props.diameter);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*progress*/ 1024) {
    			// Reactive
    			{
    				_progress.set(parseFloat(progress));
    			}
    		}

    		if ($$self.$$.dirty & /*size*/ 512) {
    			$$invalidate(4, diameter = ({
    				small: 16,
    				medium: 32,
    				large: 64,
    				xlarge: 100
    			})[size]);
    		}

    		if ($$self.$$.dirty & /*size*/ 512) {
    			$$invalidate(3, strokewidth = ({ small: 2, medium: 4, large: 7, xlarge: 9 })[size]);
    		}

    		if ($$self.$$.dirty & /*diameter*/ 16) {
    			$$invalidate(2, radius = diameter / 2);
    		}

    		if ($$self.$$.dirty & /*radius, strokewidth*/ 12) {
    			$$invalidate(11, pathRadius = radius - strokewidth / 2);
    		}

    		if ($$self.$$.dirty & /*type, pathRadius, progress*/ 3074) {
    			$$invalidate(5, ready = type === "infinite"
    			? pathRadius
    			: pathRadius && progress);
    		}
    	};

    	return [
    		invert,
    		type,
    		radius,
    		strokewidth,
    		diameter,
    		ready,
    		$_progress,
    		_progress,
    		getArc,
    		size,
    		progress,
    		pathRadius
    	];
    }

    class Spinner_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>@keyframes rotate{100%{transform:rotate(360deg)}}.spinner-infinite{animation:rotate 2s linear infinite}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$2,
    			create_fragment$2,
    			safe_not_equal,
    			{
    				size: 9,
    				invert: 0,
    				type: 1,
    				progress: 10
    			},
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*size*/ ctx[9] === undefined && !('size' in props)) {
    			console.warn("<goa-spinner> was created without expected prop 'size'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["size", "invert", "type", "progress"];
    	}

    	get size() {
    		return this.$$.ctx[9];
    	}

    	set size(size) {
    		this.$$set({ size });
    		flush();
    	}

    	get invert() {
    		return this.$$.ctx[0];
    	}

    	set invert(invert) {
    		this.$$set({ invert });
    		flush();
    	}

    	get type() {
    		return this.$$.ctx[1];
    	}

    	set type(type) {
    		this.$$set({ type });
    		flush();
    	}

    	get progress() {
    		return this.$$.ctx[10];
    	}

    	set progress(progress) {
    		this.$$set({ progress });
    		flush();
    	}
    }

    customElements.define("goa-spinner", Spinner_wc);

    /* src/TextArea.wc.svelte generated by Svelte v3.46.2 */
    const file$1 = "src/TextArea.wc.svelte";

    function create_fragment$1(ctx) {
    	let textarea;
    	let textarea_value_value;
    	let textarea_rows_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			this.c = noop;
    			attr_dev(textarea, "name", /*name*/ ctx[0]);
    			attr_dev(textarea, "class", "goa-textarea");
    			attr_dev(textarea, "placeholder", /*placeholder*/ ctx[2]);
    			textarea.value = textarea_value_value = /*value*/ ctx[1] || "";
    			attr_dev(textarea, "rows", textarea_rows_value = /*rows*/ ctx[3] || 3);
    			textarea.disabled = /*isDisabled*/ ctx[4];
    			add_location(textarea, file$1, 24, 0, 579);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);

    			if (!mounted) {
    				dispose = listen_dev(textarea, "keyup", /*onChange*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1) {
    				attr_dev(textarea, "name", /*name*/ ctx[0]);
    			}

    			if (dirty & /*placeholder*/ 4) {
    				attr_dev(textarea, "placeholder", /*placeholder*/ ctx[2]);
    			}

    			if (dirty & /*value*/ 2 && textarea_value_value !== (textarea_value_value = /*value*/ ctx[1] || "")) {
    				prop_dev(textarea, "value", textarea_value_value);
    			}

    			if (dirty & /*rows*/ 8 && textarea_rows_value !== (textarea_rows_value = /*rows*/ ctx[3] || 3)) {
    				attr_dev(textarea, "rows", textarea_rows_value);
    			}

    			if (dirty & /*isDisabled*/ 16) {
    				prop_dev(textarea, "disabled", /*isDisabled*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let isDisabled;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('goa-textarea', slots, []);
    	let { name } = $$props;
    	let { value } = $$props;
    	let { placeholder } = $$props;
    	let { rows } = $$props;
    	let { disabled } = $$props;

    	function onChange(e) {
    		const target = e.target;
    		const value = target.value;

    		e.target.dispatchEvent(new CustomEvent("_change",
    		{
    				composed: true,
    				bubbles: false,
    				cancelable: true,
    				detail: { event: e, data: { name, value } }
    			}));

    		e.stopPropagation();
    	}

    	const writable_props = ['name', 'value', 'placeholder', 'rows', 'disabled'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<goa-textarea> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('placeholder' in $$props) $$invalidate(2, placeholder = $$props.placeholder);
    		if ('rows' in $$props) $$invalidate(3, rows = $$props.rows);
    		if ('disabled' in $$props) $$invalidate(6, disabled = $$props.disabled);
    	};

    	$$self.$capture_state = () => ({
    		toBoolean,
    		name,
    		value,
    		placeholder,
    		rows,
    		disabled,
    		onChange,
    		isDisabled
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('placeholder' in $$props) $$invalidate(2, placeholder = $$props.placeholder);
    		if ('rows' in $$props) $$invalidate(3, rows = $$props.rows);
    		if ('disabled' in $$props) $$invalidate(6, disabled = $$props.disabled);
    		if ('isDisabled' in $$props) $$invalidate(4, isDisabled = $$props.isDisabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*disabled*/ 64) {
    			$$invalidate(4, isDisabled = toBoolean(disabled));
    		}
    	};

    	return [name, value, placeholder, rows, isDisabled, onChange, disabled];
    }

    class TextArea_wc extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.goa-textarea{display:block;width:100%;box-sizing:border-box;outline:none;transition:box-shadow 0.1s ease-in;border:1px solid var(--color-gray-700);border-radius:3px;background:var(--color-white);color:var(--color-gray-900, #ccc);padding:var(--input-padding, 0.5rem);font-size:var(--input-font-size);font-family:var(--font-family)}.goa-textarea:hover{border-color:var(--color-blue-600)}.goa-textarea:active,.goa-textarea:focus,.goa-textarea:focus-within{box-shadow:0 0 0 3px var(--color-orange)}.goa-textarea:disabled{border-color:var(--color-gray-200)}.goa-textarea:disabled:hover{border-color:var(--color-gray-200)}.goa-textarea:disabled:focus,.goa-textarea:disabled:active{box-shadow:none}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$1,
    			create_fragment$1,
    			safe_not_equal,
    			{
    				name: 0,
    				value: 1,
    				placeholder: 2,
    				rows: 3,
    				disabled: 6
    			},
    			null
    		);

    		const { ctx } = this.$$;
    		const props = this.attributes;

    		if (/*name*/ ctx[0] === undefined && !('name' in props)) {
    			console.warn("<goa-textarea> was created without expected prop 'name'");
    		}

    		if (/*value*/ ctx[1] === undefined && !('value' in props)) {
    			console.warn("<goa-textarea> was created without expected prop 'value'");
    		}

    		if (/*placeholder*/ ctx[2] === undefined && !('placeholder' in props)) {
    			console.warn("<goa-textarea> was created without expected prop 'placeholder'");
    		}

    		if (/*rows*/ ctx[3] === undefined && !('rows' in props)) {
    			console.warn("<goa-textarea> was created without expected prop 'rows'");
    		}

    		if (/*disabled*/ ctx[6] === undefined && !('disabled' in props)) {
    			console.warn("<goa-textarea> was created without expected prop 'disabled'");
    		}

    		if (options) {
    			if (options.target) {
    				insert_dev(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["name", "value", "placeholder", "rows", "disabled"];
    	}

    	get name() {
    		return this.$$.ctx[0];
    	}

    	set name(name) {
    		this.$$set({ name });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[1];
    	}

    	set value(value) {
    		this.$$set({ value });
    		flush();
    	}

    	get placeholder() {
    		return this.$$.ctx[2];
    	}

    	set placeholder(placeholder) {
    		this.$$set({ placeholder });
    		flush();
    	}

    	get rows() {
    		return this.$$.ctx[3];
    	}

    	set rows(rows) {
    		this.$$set({ rows });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[6];
    	}

    	set disabled(disabled) {
    		this.$$set({ disabled });
    		flush();
    	}
    }

    customElements.define("goa-textarea", TextArea_wc);

    /* demo/src/App.svelte generated by Svelte v3.46.2 */
    const file = "demo/src/App.svelte";

    function create_fragment(ctx) {
    	let t0;
    	let main;
    	let goa_service_level_header;
    	let t1;
    	let goa_app_header;
    	let a0;
    	let t3;
    	let goa_hero_banner;
    	let div0;
    	let t5;
    	let div1;
    	let goa_button0;
    	let t7;
    	let goa_page_block;
    	let h20;
    	let t9;
    	let ul;
    	let li0;
    	let a1;
    	let t11;
    	let li1;
    	let a2;
    	let t13;
    	let li2;
    	let a3;
    	let t15;
    	let li3;
    	let a4;
    	let t17;
    	let li4;
    	let a5;
    	let t19;
    	let li5;
    	let a6;
    	let t21;
    	let li6;
    	let a7;
    	let t23;
    	let li7;
    	let a8;
    	let t25;
    	let li8;
    	let a9;
    	let t27;
    	let li9;
    	let a10;
    	let t29;
    	let li10;
    	let a11;
    	let t31;
    	let li11;
    	let a12;
    	let t33;
    	let li12;
    	let a13;
    	let t35;
    	let li13;
    	let a14;
    	let t37;
    	let li14;
    	let a15;
    	let t39;
    	let li15;
    	let a16;
    	let t41;
    	let h21;
    	let t43;
    	let goa_card_group0;
    	let goa_card0;
    	let goa_card_content0;
    	let t45;
    	let goa_card_image0;
    	let goa_card_image0_src_value;
    	let t46;
    	let goa_card_actions0;
    	let goa_button1;
    	let t48;
    	let goa_card1;
    	let goa_card_image1;
    	let goa_card_image1_src_value;
    	let t49;
    	let goa_card_content1;
    	let t51;
    	let goa_card_actions1;
    	let goa_button2;
    	let t53;
    	let goa_card2;
    	let goa_card_content2;
    	let t55;
    	let goa_card_image2;
    	let goa_card_image2_src_value;
    	let t56;
    	let goa_card_actions2;
    	let goa_button3;
    	let t58;
    	let goa_card3;
    	let goa_card_content3;
    	let t59;
    	let br0;
    	let t60;
    	let br1;
    	let t61;
    	let t62;
    	let goa_card_actions3;
    	let goa_button4;
    	let t64;
    	let goa_card4;
    	let goa_card_content4;
    	let t66;
    	let goa_card_image3;
    	let goa_card_image3_src_value;
    	let t67;
    	let goa_card_actions4;
    	let goa_button5;
    	let t69;
    	let goa_button6;
    	let t71;
    	let goa_card5;
    	let goa_card_actions5;
    	let goa_button7;
    	let t73;
    	let goa_card_image4;
    	let goa_card_image4_src_value;
    	let t74;
    	let goa_card_content5;
    	let t76;
    	let h22;
    	let t78;
    	let h30;
    	let t80;
    	let goa_skeleton0;
    	let t81;
    	let goa_skeleton1;
    	let t82;
    	let goa_skeleton2;
    	let t83;
    	let goa_skeleton3;
    	let t84;
    	let h31;
    	let t86;
    	let goa_skeleton4;
    	let t87;
    	let goa_skeleton5;
    	let t88;
    	let goa_skeleton6;
    	let t89;
    	let goa_skeleton7;
    	let t90;
    	let h32;
    	let t92;
    	let goa_skeleton8;
    	let t93;
    	let goa_skeleton9;
    	let t94;
    	let goa_skeleton10;
    	let t95;
    	let goa_skeleton11;
    	let t96;
    	let h33;
    	let t98;
    	let goa_skeleton12;
    	let t99;
    	let h34;
    	let t101;
    	let goa_skeleton13;
    	let t102;
    	let goa_skeleton14;
    	let t103;
    	let goa_skeleton15;
    	let t104;
    	let goa_skeleton16;
    	let t105;
    	let h35;
    	let t107;
    	let goa_card_group1;
    	let goa_skeleton17;
    	let t108;
    	let goa_skeleton18;
    	let t109;
    	let goa_skeleton19;
    	let t110;
    	let goa_skeleton20;
    	let t111;
    	let h36;
    	let t113;
    	let goa_skeleton21;
    	let t114;
    	let goa_skeleton22;
    	let t115;
    	let goa_skeleton23;
    	let t116;
    	let goa_skeleton24;
    	let t117;
    	let h23;
    	let t119;
    	let h37;
    	let t121;
    	let goa_button8;
    	let t123;
    	let goa_page_loader0;
    	let t124;
    	let script0;
    	let t126;
    	let h38;
    	let t128;
    	let goa_page_loader1;
    	let t129;
    	let h39;
    	let t131;
    	let goa_spinner0;
    	let t132;
    	let goa_spinner1;
    	let t133;
    	let goa_spinner2;
    	let t134;
    	let goa_spinner3;
    	let t135;
    	let div2;
    	let goa_spinner4;
    	let t136;
    	let goa_spinner5;
    	let t137;
    	let goa_spinner6;
    	let t138;
    	let goa_spinner7;
    	let t139;
    	let script1;
    	let t141;
    	let h24;
    	let t143;
    	let goa_badge0;
    	let t144;
    	let goa_badge1;
    	let t145;
    	let goa_badge2;
    	let t146;
    	let goa_badge3;
    	let t147;
    	let goa_badge4;
    	let t148;
    	let goa_badge5;
    	let t149;
    	let goa_badge6;
    	let t150;
    	let goa_badge7;
    	let t151;
    	let br2;
    	let t152;
    	let br3;
    	let t153;
    	let goa_badge8;
    	let t154;
    	let goa_badge9;
    	let t155;
    	let goa_badge10;
    	let t156;
    	let goa_badge11;
    	let t157;
    	let goa_badge12;
    	let t158;
    	let goa_badge13;
    	let t159;
    	let goa_badge14;
    	let t160;
    	let goa_badge15;
    	let t161;
    	let br4;
    	let t162;
    	let br5;
    	let t163;
    	let goa_badge16;
    	let t164;
    	let goa_badge17;
    	let t165;
    	let goa_badge18;
    	let t166;
    	let goa_badge19;
    	let t167;
    	let goa_badge20;
    	let t168;
    	let goa_badge21;
    	let t169;
    	let goa_badge22;
    	let t170;
    	let goa_badge23;
    	let t171;
    	let h25;
    	let t173;
    	let goa_button9;
    	let t175;
    	let goa_modal0;
    	let p0;
    	let t177;
    	let p1;
    	let t179;
    	let p2;
    	let t181;
    	let p3;
    	let t183;
    	let p4;
    	let t185;
    	let p5;
    	let t187;
    	let p6;
    	let t189;
    	let p7;
    	let t191;
    	let p8;
    	let t193;
    	let goa_button10;
    	let t195;
    	let script2;
    	let t197;
    	let h26;
    	let t199;
    	let goa_notification;
    	let t201;
    	let h27;
    	let t203;
    	let goa_flex_row0;
    	let goa_form_item0;
    	let goa_input0;
    	let t204;
    	let goa_form_item1;
    	let goa_input1;
    	let t205;
    	let goa_form_item2;
    	let goa_input2;
    	let t206;
    	let goa_flex_row1;
    	let goa_form_item3;
    	let goa_input3;
    	let t207;
    	let goa_form_item4;
    	let goa_textarea;
    	let t208;
    	let script3;
    	let t210;
    	let h28;
    	let t212;
    	let goa_form_item5;
    	let goa_dropdown;
    	let goa_dropdown_item0;
    	let t213;
    	let goa_dropdown_item1;
    	let div3;
    	let img;
    	let img_src_value;
    	let t214;
    	let span;
    	let t216;
    	let goa_dropdown_item2;
    	let t217;
    	let goa_dropdown_item3;
    	let t218;
    	let script4;
    	let t220;
    	let h29;
    	let t222;
    	let goa_checkbox0;
    	let t223;
    	let goa_form_item6;
    	let goa_radio_group;
    	let goa_radio_item0;
    	let t224;
    	let goa_radio_item1;
    	let t225;
    	let goa_radio_item2;
    	let t226;
    	let script5;
    	let t228;
    	let h210;
    	let t230;
    	let goa_callout;
    	let t232;
    	let hr;
    	let t233;
    	let h211;
    	let t235;
    	let goa_modal1;
    	let h212;
    	let t237;
    	let p9;
    	let t239;
    	let goa_button11;
    	let t241;
    	let script6;
    	let t243;
    	let goa_container1;
    	let h213;
    	let t245;
    	let p10;
    	let t247;
    	let div4;
    	let t249;
    	let goa_button12;
    	let t251;
    	let goa_container0;
    	let div5;
    	let t253;
    	let goa_button13;
    	let t255;
    	let script7;
    	let t257;
    	let h214;
    	let t259;
    	let goa_form_item7;
    	let goa_checkbox1;
    	let t260;
    	let script8;
    	let t262;
    	let h215;
    	let t264;
    	let h310;
    	let t266;
    	let goa_button_group0;
    	let goa_button14;
    	let t268;
    	let goa_button15;
    	let t270;
    	let h311;
    	let t272;
    	let goa_button_group1;
    	let goa_button16;
    	let t274;
    	let goa_button17;
    	let t276;
    	let h216;
    	let t278;
    	let goa_icon_button0;
    	let t279;
    	let goa_icon_button1;
    	let t280;
    	let h217;
    	let t282;
    	let div6;
    	let goa_icon_button2;
    	let t283;
    	let h218;
    	let t285;
    	let goa_icon;

    	const block = {
    		c: function create() {
    			t0 = space();
    			main = element("main");
    			goa_service_level_header = element("goa-service-level-header");
    			t1 = space();
    			goa_app_header = element("goa-app-header");
    			a0 = element("a");
    			a0.textContent = "Sign in";
    			t3 = space();
    			goa_hero_banner = element("goa-hero-banner");
    			div0 = element("div");
    			div0.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur optio, eius expedita, quasi vero maxime, laudantium voluptates eaque illum officiis hic! Commodi, asperiores officiis necessitatibus itaque similique magnam nisi voluptate.";
    			t5 = space();
    			div1 = element("div");
    			goa_button0 = element("goa-button");
    			goa_button0.textContent = "Button";
    			t7 = space();
    			goa_page_block = element("goa-page-block");
    			h20 = element("h2");
    			h20.textContent = "Components";
    			t9 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			a1.textContent = "Cards";
    			t11 = space();
    			li1 = element("li");
    			a2 = element("a");
    			a2.textContent = "Skeletons";
    			t13 = space();
    			li2 = element("li");
    			a3 = element("a");
    			a3.textContent = "Loaders";
    			t15 = space();
    			li3 = element("li");
    			a4 = element("a");
    			a4.textContent = "Modal";
    			t17 = space();
    			li4 = element("li");
    			a5 = element("a");
    			a5.textContent = "Notification";
    			t19 = space();
    			li5 = element("li");
    			a6 = element("a");
    			a6.textContent = "Input";
    			t21 = space();
    			li6 = element("li");
    			a7 = element("a");
    			a7.textContent = "Dropdown / Combobox";
    			t23 = space();
    			li7 = element("li");
    			a8 = element("a");
    			a8.textContent = "Callout";
    			t25 = space();
    			li8 = element("li");
    			a9 = element("a");
    			a9.textContent = "Radio Buttons";
    			t27 = space();
    			li9 = element("li");
    			a10 = element("a");
    			a10.textContent = "Container";
    			t29 = space();
    			li10 = element("li");
    			a11 = element("a");
    			a11.textContent = "Container";
    			t31 = space();
    			li11 = element("li");
    			a12 = element("a");
    			a12.textContent = "Checkbox";
    			t33 = space();
    			li12 = element("li");
    			a13 = element("a");
    			a13.textContent = "Buttons";
    			t35 = space();
    			li13 = element("li");
    			a14 = element("a");
    			a14.textContent = "Icon Buttons";
    			t37 = space();
    			li14 = element("li");
    			a15 = element("a");
    			a15.textContent = "Icons";
    			t39 = space();
    			li15 = element("li");
    			a16 = element("a");
    			a16.textContent = "Badges";
    			t41 = space();
    			h21 = element("h2");
    			h21.textContent = "Cards";
    			t43 = space();
    			goa_card_group0 = element("goa-card-group");
    			goa_card0 = element("goa-card");
    			goa_card_content0 = element("goa-card-content");
    			goa_card_content0.textContent = "This is a card top title with image";
    			t45 = space();
    			goa_card_image0 = element("goa-card-image");
    			t46 = space();
    			goa_card_actions0 = element("goa-card-actions");
    			goa_button1 = element("goa-button");
    			goa_button1.textContent = "Button";
    			t48 = space();
    			goa_card1 = element("goa-card");
    			goa_card_image1 = element("goa-card-image");
    			t49 = space();
    			goa_card_content1 = element("goa-card-content");
    			goa_card_content1.textContent = "This is card content below the image";
    			t51 = space();
    			goa_card_actions1 = element("goa-card-actions");
    			goa_button2 = element("goa-button");
    			goa_button2.textContent = "Button";
    			t53 = space();
    			goa_card2 = element("goa-card");
    			goa_card_content2 = element("goa-card-content");
    			goa_card_content2.textContent = "This is card with a taller image";
    			t55 = space();
    			goa_card_image2 = element("goa-card-image");
    			t56 = space();
    			goa_card_actions2 = element("goa-card-actions");
    			goa_button3 = element("goa-button");
    			goa_button3.textContent = "Button";
    			t58 = space();
    			goa_card3 = element("goa-card");
    			goa_card_content3 = element("goa-card-content");
    			t59 = text("This is card content with no image.\n          ");
    			br0 = element("br");
    			t60 = space();
    			br1 = element("br");
    			t61 = text("\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque laboriosam numquam, quidem nihil accusantium dolore harum. Consequuntur facilis, perspiciatis reiciendis possimus iusto, magni ut quisquam ex necessitatibus eum in modi?");
    			t62 = space();
    			goa_card_actions3 = element("goa-card-actions");
    			goa_button4 = element("goa-button");
    			goa_button4.textContent = "Button";
    			t64 = space();
    			goa_card4 = element("goa-card");
    			goa_card_content4 = element("goa-card-content");
    			goa_card_content4.textContent = "This is card content with multiple buttons";
    			t66 = space();
    			goa_card_image3 = element("goa-card-image");
    			t67 = space();
    			goa_card_actions4 = element("goa-card-actions");
    			goa_button5 = element("goa-button");
    			goa_button5.textContent = "Button";
    			t69 = space();
    			goa_button6 = element("goa-button");
    			goa_button6.textContent = "Button";
    			t71 = space();
    			goa_card5 = element("goa-card");
    			goa_card_actions5 = element("goa-card-actions");
    			goa_button7 = element("goa-button");
    			goa_button7.textContent = "Button";
    			t73 = space();
    			goa_card_image4 = element("goa-card-image");
    			t74 = space();
    			goa_card_content5 = element("goa-card-content");
    			goa_card_content5.textContent = "This is card content with actions at the top";
    			t76 = space();
    			h22 = element("h2");
    			h22.textContent = "Skeletons";
    			t78 = space();
    			h30 = element("h3");
    			h30.textContent = "Text";
    			t80 = space();
    			goa_skeleton0 = element("goa-skeleton");
    			t81 = space();
    			goa_skeleton1 = element("goa-skeleton");
    			t82 = space();
    			goa_skeleton2 = element("goa-skeleton");
    			t83 = space();
    			goa_skeleton3 = element("goa-skeleton");
    			t84 = space();
    			h31 = element("h3");
    			h31.textContent = "Avatars";
    			t86 = space();
    			goa_skeleton4 = element("goa-skeleton");
    			t87 = space();
    			goa_skeleton5 = element("goa-skeleton");
    			t88 = space();
    			goa_skeleton6 = element("goa-skeleton");
    			t89 = space();
    			goa_skeleton7 = element("goa-skeleton");
    			t90 = space();
    			h32 = element("h3");
    			h32.textContent = "Headers";
    			t92 = space();
    			goa_skeleton8 = element("goa-skeleton");
    			t93 = space();
    			goa_skeleton9 = element("goa-skeleton");
    			t94 = space();
    			goa_skeleton10 = element("goa-skeleton");
    			t95 = space();
    			goa_skeleton11 = element("goa-skeleton");
    			t96 = space();
    			h33 = element("h3");
    			h33.textContent = "Paragraph";
    			t98 = space();
    			goa_skeleton12 = element("goa-skeleton");
    			t99 = space();
    			h34 = element("h3");
    			h34.textContent = "Thumbnail";
    			t101 = space();
    			goa_skeleton13 = element("goa-skeleton");
    			t102 = space();
    			goa_skeleton14 = element("goa-skeleton");
    			t103 = space();
    			goa_skeleton15 = element("goa-skeleton");
    			t104 = space();
    			goa_skeleton16 = element("goa-skeleton");
    			t105 = space();
    			h35 = element("h3");
    			h35.textContent = "Cards";
    			t107 = space();
    			goa_card_group1 = element("goa-card-group");
    			goa_skeleton17 = element("goa-skeleton");
    			t108 = space();
    			goa_skeleton18 = element("goa-skeleton");
    			t109 = space();
    			goa_skeleton19 = element("goa-skeleton");
    			t110 = space();
    			goa_skeleton20 = element("goa-skeleton");
    			t111 = space();
    			h36 = element("h3");
    			h36.textContent = "Profiles";
    			t113 = space();
    			goa_skeleton21 = element("goa-skeleton");
    			t114 = space();
    			goa_skeleton22 = element("goa-skeleton");
    			t115 = space();
    			goa_skeleton23 = element("goa-skeleton");
    			t116 = space();
    			goa_skeleton24 = element("goa-skeleton");
    			t117 = space();
    			h23 = element("h2");
    			h23.textContent = "Loaders";
    			t119 = space();
    			h37 = element("h3");
    			h37.textContent = "Full screen";
    			t121 = space();
    			goa_button8 = element("goa-button");
    			goa_button8.textContent = "Show page loader";
    			t123 = space();
    			goa_page_loader0 = element("goa-page-loader");
    			t124 = space();
    			script0 = element("script");
    			script0.textContent = "const el = document.querySelector('#show-loader');\n      el.addEventListener('_click', () => {\n        const loader = document.querySelector('#page-loader');\n        loader.setAttribute('visible', \"true\")\n      })";
    			t126 = space();
    			h38 = element("h3");
    			h38.textContent = "Inline";
    			t128 = space();
    			goa_page_loader1 = element("goa-page-loader");
    			t129 = space();
    			h39 = element("h3");
    			h39.textContent = "Variants";
    			t131 = space();
    			goa_spinner0 = element("goa-spinner");
    			t132 = space();
    			goa_spinner1 = element("goa-spinner");
    			t133 = space();
    			goa_spinner2 = element("goa-spinner");
    			t134 = space();
    			goa_spinner3 = element("goa-spinner");
    			t135 = space();
    			div2 = element("div");
    			goa_spinner4 = element("goa-spinner");
    			t136 = space();
    			goa_spinner5 = element("goa-spinner");
    			t137 = space();
    			goa_spinner6 = element("goa-spinner");
    			t138 = space();
    			goa_spinner7 = element("goa-spinner");
    			t139 = space();
    			script1 = element("script");
    			script1.textContent = "window.progress = 0;\n      const ps = document.querySelectorAll('.progress');\n      setInterval(() => {\n        window.progress += 10\n        ps.forEach(p => {\n          p.setAttribute('progress', window.progress)\n          switch(true) {\n            case window.progress < 20:\n              p.setAttribute('message', 'loading..')\n              break;\n            case window.progress < 40:\n              p.setAttribute('message', 'taking longer than I thought..')\n              break;\n            case window.progress < 60:\n              p.setAttribute('message', 'let\\'s grab a coffee..')\n              break;\n            case window.progress < 80:\n              p.setAttribute('message', 'I\\'m bored..')\n              break;\n            case window.progress < 100:\n              p.setAttribute('message', 'almost there..')\n              break;\n          }\n          if (window.progress >= 100) {\n            window.progress = 0;\n            p.removeAttribute('visible');\n          }\n        });\n\n      }, 1000);";
    			t141 = space();
    			h24 = element("h2");
    			h24.textContent = "Badges";
    			t143 = space();
    			goa_badge0 = element("goa-badge");
    			t144 = space();
    			goa_badge1 = element("goa-badge");
    			t145 = space();
    			goa_badge2 = element("goa-badge");
    			t146 = space();
    			goa_badge3 = element("goa-badge");
    			t147 = space();
    			goa_badge4 = element("goa-badge");
    			t148 = space();
    			goa_badge5 = element("goa-badge");
    			t149 = space();
    			goa_badge6 = element("goa-badge");
    			t150 = space();
    			goa_badge7 = element("goa-badge");
    			t151 = space();
    			br2 = element("br");
    			t152 = space();
    			br3 = element("br");
    			t153 = space();
    			goa_badge8 = element("goa-badge");
    			t154 = space();
    			goa_badge9 = element("goa-badge");
    			t155 = space();
    			goa_badge10 = element("goa-badge");
    			t156 = space();
    			goa_badge11 = element("goa-badge");
    			t157 = space();
    			goa_badge12 = element("goa-badge");
    			t158 = space();
    			goa_badge13 = element("goa-badge");
    			t159 = space();
    			goa_badge14 = element("goa-badge");
    			t160 = space();
    			goa_badge15 = element("goa-badge");
    			t161 = space();
    			br4 = element("br");
    			t162 = space();
    			br5 = element("br");
    			t163 = space();
    			goa_badge16 = element("goa-badge");
    			t164 = space();
    			goa_badge17 = element("goa-badge");
    			t165 = space();
    			goa_badge18 = element("goa-badge");
    			t166 = space();
    			goa_badge19 = element("goa-badge");
    			t167 = space();
    			goa_badge20 = element("goa-badge");
    			t168 = space();
    			goa_badge21 = element("goa-badge");
    			t169 = space();
    			goa_badge22 = element("goa-badge");
    			t170 = space();
    			goa_badge23 = element("goa-badge");
    			t171 = space();
    			h25 = element("h2");
    			h25.textContent = "Modal";
    			t173 = space();
    			goa_button9 = element("goa-button");
    			goa_button9.textContent = "Show Modal";
    			t175 = space();
    			goa_modal0 = element("goa-modal");
    			p0 = element("p");
    			p0.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.";
    			t177 = space();
    			p1 = element("p");
    			p1.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.";
    			t179 = space();
    			p2 = element("p");
    			p2.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.";
    			t181 = space();
    			p3 = element("p");
    			p3.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.";
    			t183 = space();
    			p4 = element("p");
    			p4.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.";
    			t185 = space();
    			p5 = element("p");
    			p5.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.";
    			t187 = space();
    			p6 = element("p");
    			p6.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.";
    			t189 = space();
    			p7 = element("p");
    			p7.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.";
    			t191 = space();
    			p8 = element("p");
    			p8.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.";
    			t193 = space();
    			goa_button10 = element("goa-button");
    			goa_button10.textContent = "I Agree";
    			t195 = space();
    			script2 = element("script");
    			script2.textContent = "var modal = document.getElementById(\"modal\")\n      var modalopen = document.querySelector('#openModal');\n      modalopen.addEventListener('_click', () => {\n        openModal();\n      });\n      function openModal() {\n        modal.setAttribute(\"open\", true)\n      }\n      function closeModal() {\n        modal.removeAttribute(\"open\")\n      }\n      document.getElementById(\"modal\").addEventListener(\"_close\", () => {\n        closeModal();\n      });";
    			t197 = space();
    			h26 = element("h2");
    			h26.textContent = "Notification";
    			t199 = space();
    			goa_notification = element("goa-notification");
    			goa_notification.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi saepe, maiores, praesentium minus quod reprehenderit consequuntur earum molestias aliquid amet, vitae eveniet harum incidunt sint. Numquam debitis molestias officia corporis.";
    			t201 = space();
    			h27 = element("h2");
    			h27.textContent = "Input";
    			t203 = space();
    			goa_flex_row0 = element("goa-flex-row");
    			goa_form_item0 = element("goa-form-item");
    			goa_input0 = element("goa-input");
    			t204 = space();
    			goa_form_item1 = element("goa-form-item");
    			goa_input1 = element("goa-input");
    			t205 = space();
    			goa_form_item2 = element("goa-form-item");
    			goa_input2 = element("goa-input");
    			t206 = space();
    			goa_flex_row1 = element("goa-flex-row");
    			goa_form_item3 = element("goa-form-item");
    			goa_input3 = element("goa-input");
    			t207 = space();
    			goa_form_item4 = element("goa-form-item");
    			goa_textarea = element("goa-textarea");
    			t208 = space();
    			script3 = element("script");
    			script3.textContent = "document.getElementById('comments').addEventListener('_change', (e) => {\n        console.log('comments changed', e.detail);\n      });";
    			t210 = space();
    			h28 = element("h2");
    			h28.textContent = "DropDown / Combobox";
    			t212 = space();
    			goa_form_item5 = element("goa-form-item");
    			goa_dropdown = element("goa-dropdown");
    			goa_dropdown_item0 = element("goa-dropdown-item");
    			t213 = space();
    			goa_dropdown_item1 = element("goa-dropdown-item");
    			div3 = element("div");
    			img = element("img");
    			t214 = space();
    			span = element("span");
    			span.textContent = "Nicholas Cage";
    			t216 = space();
    			goa_dropdown_item2 = element("goa-dropdown-item");
    			t217 = space();
    			goa_dropdown_item3 = element("goa-dropdown-item");
    			t218 = space();
    			script4 = element("script");
    			script4.textContent = "var dropdown = document.getElementById(\"dropdown\");\n      dropdown.addEventListener(\"_change\", (e) => {\n        console.log(e.detail.data);\n      });";
    			t220 = space();
    			h29 = element("h2");
    			h29.textContent = "Radio Buttons";
    			t222 = space();
    			goa_checkbox0 = element("goa-checkbox");
    			t223 = space();
    			goa_form_item6 = element("goa-form-item");
    			goa_radio_group = element("goa-radio-group");
    			goa_radio_item0 = element("goa-radio-item");
    			t224 = space();
    			goa_radio_item1 = element("goa-radio-item");
    			t225 = space();
    			goa_radio_item2 = element("goa-radio-item");
    			t226 = space();
    			script5 = element("script");
    			script5.textContent = "var radioCheckbox = document.getElementById('radio-error');\n      var radioGroup = document.getElementById('radioGroup1');\n      radioGroup.addEventListener('_change', (e) => {\n        console.log('in the on change', e.detail);\n      });\n      radioCheckbox.addEventListener('_change', (e) => {\n        const checked = e.detail.value === 'checked'\n        radioCheckbox.checked = checked;\n        if (checked) {\n          radioGroup.setAttribute(\"error\", \"\")\n        } else {\n          radioGroup.removeAttribute(\"error\")\n        }\n      });";
    			t228 = space();
    			h210 = element("h2");
    			h210.textContent = "Callout";
    			t230 = space();
    			goa_callout = element("goa-callout");
    			goa_callout.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ipsum eu euismod consectetur, nisl nisl iaculis nisl, eu tincidunt nisi nisl euismod nisi. Sed euismod, ipsum eu euismod consectetur, nisl nisl iaculis nisl, eu tincidunt nisi nisl euismod nisi.";
    			t232 = space();
    			hr = element("hr");
    			t233 = space();
    			h211 = element("h2");
    			h211.textContent = "Container";
    			t235 = space();
    			goa_modal1 = element("goa-modal");
    			h212 = element("h2");
    			h212.textContent = "Delete All";
    			t237 = space();
    			p9 = element("p");
    			p9.textContent = "Delete the entire database and backups?";
    			t239 = space();
    			goa_button11 = element("goa-button");
    			goa_button11.textContent = "Delete";
    			t241 = space();
    			script6 = element("script");
    			script6.textContent = "var doDeleteBtn = document.getElementById('do-delete');\n        doDeleteBtn.addEventListener('_click', () => {\n          document.getElementById(\"modal2\").removeAttribute(\"open\");\n        });";
    			t243 = space();
    			goa_container1 = element("goa-container");
    			h213 = element("h2");
    			h213.textContent = "Header 3 (h2)";
    			t245 = space();
    			p10 = element("p");
    			p10.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\n        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate\n        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\n        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id\n        est laborum.";
    			t247 = space();
    			div4 = element("div");
    			div4.textContent = "The new container";
    			t249 = space();
    			goa_button12 = element("goa-button");
    			goa_button12.textContent = "Delete";
    			t251 = space();
    			goa_container0 = element("goa-container");
    			div5 = element("div");
    			div5.textContent = "This is a sub container";
    			t253 = space();
    			goa_button13 = element("goa-button");
    			goa_button13.textContent = "Assign to me";
    			t255 = space();
    			script7 = element("script");
    			script7.textContent = "var deleteAllButton = document.getElementById('delete-all');\n      deleteAllButton.addEventListener('_click', () => {\n        document.getElementById(\"modal2\").setAttribute(\"open\", true);\n      });";
    			t257 = space();
    			h214 = element("h2");
    			h214.textContent = "Checkbox";
    			t259 = space();
    			goa_form_item7 = element("goa-form-item");
    			goa_checkbox1 = element("goa-checkbox");
    			t260 = space();
    			script8 = element("script");
    			script8.textContent = "var checkbox = document.getElementById('confirm');\n      checkbox.addEventListener('_change', (e) => {\n        console.log('changed', e.detail);\n        checkbox.checked = e.detail.checked;\n      });";
    			t262 = space();
    			h215 = element("h2");
    			h215.textContent = "Button Groups";
    			t264 = space();
    			h310 = element("h3");
    			h310.textContent = "Align to Start";
    			t266 = space();
    			goa_button_group0 = element("goa-button-group");
    			goa_button14 = element("goa-button");
    			goa_button14.textContent = "Cancel";
    			t268 = space();
    			goa_button15 = element("goa-button");
    			goa_button15.textContent = "Save";
    			t270 = space();
    			h311 = element("h3");
    			h311.textContent = "Align to End";
    			t272 = space();
    			goa_button_group1 = element("goa-button-group");
    			goa_button16 = element("goa-button");
    			goa_button16.textContent = "Cancel";
    			t274 = space();
    			goa_button17 = element("goa-button");
    			goa_button17.textContent = "Save";
    			t276 = space();
    			h216 = element("h2");
    			h216.textContent = "Icon Buttons";
    			t278 = space();
    			goa_icon_button0 = element("goa-icon-button");
    			t279 = space();
    			goa_icon_button1 = element("goa-icon-button");
    			t280 = space();
    			h217 = element("h2");
    			h217.textContent = "Icon Buttons (Inverted)";
    			t282 = space();
    			div6 = element("div");
    			goa_icon_button2 = element("goa-icon-button");
    			t283 = space();
    			h218 = element("h2");
    			h218.textContent = "Icons";
    			t285 = space();
    			goa_icon = element("goa-icon");
    			document.title = "GoA Component Playground";
    			set_custom_element_data(goa_service_level_header, "level", "alpha");
    			set_custom_element_data(goa_service_level_header, "version", "v1.2.3");
    			add_location(goa_service_level_header, file, 10, 2, 124);
    			attr_dev(a0, "href", "http://signin.gov.au/");
    			add_location(a0, file, 14, 4, 283);
    			set_custom_element_data(goa_app_header, "url", "http://google.com");
    			set_custom_element_data(goa_app_header, "title", "Digital File Service");
    			add_location(goa_app_header, file, 13, 2, 209);
    			attr_dev(div0, "slot", "content");
    			add_location(div0, file, 18, 4, 456);
    			add_location(goa_button0, file, 22, 6, 767);
    			attr_dev(div1, "slot", "actions");
    			add_location(div1, file, 21, 4, 740);
    			set_custom_element_data(goa_hero_banner, "title", "Upgrading our bitumen");
    			set_custom_element_data(goa_hero_banner, "backgroundurl", "https://picsum.photos/id/1076/600/400");
    			add_location(goa_hero_banner, file, 17, 2, 350);
    			add_location(h20, file, 28, 4, 856);
    			attr_dev(a1, "href", "#section-cards");
    			add_location(a1, file, 31, 10, 896);
    			add_location(li0, file, 31, 6, 892);
    			attr_dev(a2, "href", "#section-skeleton");
    			add_location(a2, file, 32, 10, 946);
    			add_location(li1, file, 32, 6, 942);
    			attr_dev(a3, "href", "#section-loader");
    			add_location(a3, file, 33, 10, 1003);
    			add_location(li2, file, 33, 6, 999);
    			attr_dev(a4, "href", "#section-modal");
    			add_location(a4, file, 34, 10, 1056);
    			add_location(li3, file, 34, 6, 1052);
    			attr_dev(a5, "href", "#section-notification");
    			add_location(a5, file, 35, 10, 1106);
    			add_location(li4, file, 35, 6, 1102);
    			attr_dev(a6, "href", "#section-input");
    			add_location(a6, file, 36, 10, 1170);
    			add_location(li5, file, 36, 6, 1166);
    			attr_dev(a7, "href", "#section-dropdown");
    			add_location(a7, file, 37, 10, 1220);
    			add_location(li6, file, 37, 6, 1216);
    			attr_dev(a8, "href", "#section-callout");
    			add_location(a8, file, 38, 10, 1287);
    			add_location(li7, file, 38, 6, 1283);
    			attr_dev(a9, "href", "#section-radio");
    			add_location(a9, file, 39, 10, 1341);
    			add_location(li8, file, 39, 6, 1337);
    			attr_dev(a10, "href", "#section-container");
    			add_location(a10, file, 40, 10, 1399);
    			add_location(li9, file, 40, 6, 1395);
    			attr_dev(a11, "href", "#section-container");
    			add_location(a11, file, 41, 10, 1457);
    			add_location(li10, file, 41, 6, 1453);
    			attr_dev(a12, "href", "#section-checkbox");
    			add_location(a12, file, 42, 10, 1515);
    			add_location(li11, file, 42, 6, 1511);
    			attr_dev(a13, "href", "#section-buttons");
    			add_location(a13, file, 43, 10, 1571);
    			add_location(li12, file, 43, 6, 1567);
    			attr_dev(a14, "href", "#section-icon-buttons");
    			add_location(a14, file, 44, 10, 1625);
    			add_location(li13, file, 44, 6, 1621);
    			attr_dev(a15, "href", "#section-icons");
    			add_location(a15, file, 45, 10, 1689);
    			add_location(li14, file, 45, 6, 1685);
    			attr_dev(a16, "href", "#section-badges");
    			add_location(a16, file, 46, 10, 1739);
    			add_location(li15, file, 46, 6, 1735);
    			add_location(ul, file, 30, 4, 881);
    			attr_dev(h21, "id", "section-card");
    			add_location(h21, file, 49, 4, 1796);
    			add_location(goa_card_content0, file, 53, 8, 1876);
    			set_custom_element_data(goa_card_image0, "height", "160px");
    			if (!src_url_equal(goa_card_image0.src, goa_card_image0_src_value = "https://picsum.photos/id/1076/600/400")) set_custom_element_data(goa_card_image0, "src", goa_card_image0_src_value);
    			set_custom_element_data(goa_card_image0, "alt", "Card image");
    			add_location(goa_card_image0, file, 56, 8, 1977);
    			set_custom_element_data(goa_button1, "size", "small");
    			add_location(goa_button1, file, 58, 10, 2109);
    			add_location(goa_card_actions0, file, 57, 8, 2080);
    			add_location(goa_card0, file, 52, 6, 1857);
    			set_custom_element_data(goa_card_image1, "height", "160px");
    			if (!src_url_equal(goa_card_image1.src, goa_card_image1_src_value = "https://picsum.photos/id/1076/600/400")) set_custom_element_data(goa_card_image1, "src", goa_card_image1_src_value);
    			set_custom_element_data(goa_card_image1, "alt", "Card image");
    			add_location(goa_card_image1, file, 63, 8, 2240);
    			add_location(goa_card_content1, file, 64, 8, 2343);
    			set_custom_element_data(goa_button2, "size", "small");
    			add_location(goa_button2, file, 68, 10, 2474);
    			add_location(goa_card_actions1, file, 67, 8, 2445);
    			set_custom_element_data(goa_card1, "elevation", 1);
    			add_location(goa_card1, file, 62, 6, 2207);
    			add_location(goa_card_content2, file, 73, 8, 2605);
    			set_custom_element_data(goa_card_image2, "height", "300px");
    			if (!src_url_equal(goa_card_image2.src, goa_card_image2_src_value = "https://picsum.photos/id/1076/600/400")) set_custom_element_data(goa_card_image2, "src", goa_card_image2_src_value);
    			set_custom_element_data(goa_card_image2, "alt", "Card image");
    			add_location(goa_card_image2, file, 76, 8, 2703);
    			set_custom_element_data(goa_button3, "size", "small");
    			add_location(goa_button3, file, 78, 10, 2835);
    			add_location(goa_card_actions2, file, 77, 8, 2806);
    			set_custom_element_data(goa_card2, "elevation", 2);
    			add_location(goa_card2, file, 72, 6, 2572);
    			add_location(br0, file, 85, 10, 3041);
    			add_location(br1, file, 86, 10, 3056);
    			add_location(goa_card_content3, file, 83, 8, 2966);
    			set_custom_element_data(goa_button4, "size", "small");
    			add_location(goa_button4, file, 90, 10, 3369);
    			add_location(goa_card_actions3, file, 89, 8, 3340);
    			set_custom_element_data(goa_card3, "elevation", 3);
    			add_location(goa_card3, file, 82, 6, 2933);
    			add_location(goa_card_content4, file, 95, 8, 3500);
    			set_custom_element_data(goa_card_image3, "height", "160px");
    			if (!src_url_equal(goa_card_image3.src, goa_card_image3_src_value = "https://picsum.photos/id/1076/600/400")) set_custom_element_data(goa_card_image3, "src", goa_card_image3_src_value);
    			set_custom_element_data(goa_card_image3, "alt", "Card image");
    			add_location(goa_card_image3, file, 98, 8, 3608);
    			set_custom_element_data(goa_button5, "size", "small");
    			set_custom_element_data(goa_button5, "variant", "tertiary");
    			add_location(goa_button5, file, 100, 10, 3740);
    			set_custom_element_data(goa_button6, "size", "small");
    			add_location(goa_button6, file, 101, 10, 3814);
    			add_location(goa_card_actions4, file, 99, 8, 3711);
    			set_custom_element_data(goa_card4, "elevation", 4);
    			add_location(goa_card4, file, 94, 6, 3467);
    			set_custom_element_data(goa_button7, "size", "small");
    			add_location(goa_button7, file, 107, 10, 3974);
    			add_location(goa_card_actions5, file, 106, 8, 3945);
    			set_custom_element_data(goa_card_image4, "height", "160px");
    			if (!src_url_equal(goa_card_image4.src, goa_card_image4_src_value = "https://picsum.photos/id/1076/600/400")) set_custom_element_data(goa_card_image4, "src", goa_card_image4_src_value);
    			set_custom_element_data(goa_card_image4, "alt", "Card image");
    			add_location(goa_card_image4, file, 109, 8, 4055);
    			add_location(goa_card_content5, file, 110, 8, 4158);
    			set_custom_element_data(goa_card5, "elevation", 5);
    			add_location(goa_card5, file, 105, 6, 3912);
    			add_location(goa_card_group0, file, 51, 4, 1834);
    			attr_dev(h22, "id", "section-skeleton");
    			add_location(h22, file, 118, 4, 4307);
    			add_location(h30, file, 119, 4, 4352);
    			set_custom_element_data(goa_skeleton0, "type", "text");
    			add_location(goa_skeleton0, file, 120, 4, 4370);
    			set_custom_element_data(goa_skeleton1, "type", "text");
    			set_custom_element_data(goa_skeleton1, "size", 2);
    			add_location(goa_skeleton1, file, 121, 4, 4403);
    			set_custom_element_data(goa_skeleton2, "type", "text");
    			set_custom_element_data(goa_skeleton2, "size", 3);
    			add_location(goa_skeleton2, file, 122, 4, 4445);
    			set_custom_element_data(goa_skeleton3, "type", "text");
    			set_custom_element_data(goa_skeleton3, "size", 4);
    			add_location(goa_skeleton3, file, 123, 4, 4487);
    			add_location(h31, file, 124, 4, 4529);
    			set_custom_element_data(goa_skeleton4, "type", "avatar");
    			add_location(goa_skeleton4, file, 125, 4, 4550);
    			set_custom_element_data(goa_skeleton5, "type", "avatar");
    			set_custom_element_data(goa_skeleton5, "size", 2);
    			add_location(goa_skeleton5, file, 126, 4, 4585);
    			set_custom_element_data(goa_skeleton6, "type", "avatar");
    			set_custom_element_data(goa_skeleton6, "size", 3);
    			add_location(goa_skeleton6, file, 127, 4, 4629);
    			set_custom_element_data(goa_skeleton7, "type", "avatar");
    			set_custom_element_data(goa_skeleton7, "size", 4);
    			add_location(goa_skeleton7, file, 128, 4, 4673);
    			add_location(h32, file, 129, 4, 4717);
    			set_custom_element_data(goa_skeleton8, "type", "header");
    			add_location(goa_skeleton8, file, 130, 4, 4738);
    			set_custom_element_data(goa_skeleton9, "type", "header");
    			set_custom_element_data(goa_skeleton9, "size", 2);
    			add_location(goa_skeleton9, file, 131, 4, 4773);
    			set_custom_element_data(goa_skeleton10, "type", "header");
    			set_custom_element_data(goa_skeleton10, "size", 3);
    			add_location(goa_skeleton10, file, 132, 4, 4817);
    			set_custom_element_data(goa_skeleton11, "type", "header");
    			set_custom_element_data(goa_skeleton11, "size", 4);
    			add_location(goa_skeleton11, file, 133, 4, 4861);
    			add_location(h33, file, 134, 4, 4905);
    			set_custom_element_data(goa_skeleton12, "type", "paragraph");
    			add_location(goa_skeleton12, file, 135, 4, 4928);
    			add_location(h34, file, 136, 4, 4966);
    			set_custom_element_data(goa_skeleton13, "type", "thumbnail");
    			add_location(goa_skeleton13, file, 137, 4, 4989);
    			set_custom_element_data(goa_skeleton14, "type", "thumbnail");
    			set_custom_element_data(goa_skeleton14, "size", 2);
    			add_location(goa_skeleton14, file, 138, 4, 5027);
    			set_custom_element_data(goa_skeleton15, "type", "thumbnail");
    			set_custom_element_data(goa_skeleton15, "size", 3);
    			add_location(goa_skeleton15, file, 139, 4, 5074);
    			set_custom_element_data(goa_skeleton16, "type", "thumbnail");
    			set_custom_element_data(goa_skeleton16, "size", 4);
    			add_location(goa_skeleton16, file, 140, 4, 5121);
    			add_location(h35, file, 141, 4, 5168);
    			set_custom_element_data(goa_skeleton17, "type", "card");
    			set_custom_element_data(goa_skeleton17, "size", 1);
    			add_location(goa_skeleton17, file, 143, 6, 5210);
    			set_custom_element_data(goa_skeleton18, "type", "card");
    			set_custom_element_data(goa_skeleton18, "size", 2);
    			add_location(goa_skeleton18, file, 144, 6, 5254);
    			set_custom_element_data(goa_skeleton19, "type", "card");
    			set_custom_element_data(goa_skeleton19, "size", 3);
    			add_location(goa_skeleton19, file, 145, 6, 5298);
    			set_custom_element_data(goa_skeleton20, "type", "card");
    			set_custom_element_data(goa_skeleton20, "size", 4);
    			add_location(goa_skeleton20, file, 146, 6, 5342);
    			add_location(goa_card_group1, file, 142, 4, 5187);
    			add_location(h36, file, 148, 4, 5406);
    			set_custom_element_data(goa_skeleton21, "type", "profile");
    			add_location(goa_skeleton21, file, 149, 4, 5428);
    			set_custom_element_data(goa_skeleton22, "type", "profile");
    			set_custom_element_data(goa_skeleton22, "size", 2);
    			add_location(goa_skeleton22, file, 150, 4, 5464);
    			set_custom_element_data(goa_skeleton23, "type", "profile");
    			set_custom_element_data(goa_skeleton23, "size", 3);
    			add_location(goa_skeleton23, file, 151, 4, 5509);
    			set_custom_element_data(goa_skeleton24, "type", "profile");
    			set_custom_element_data(goa_skeleton24, "size", 4);
    			add_location(goa_skeleton24, file, 152, 4, 5554);
    			attr_dev(h23, "id", "section-loader");
    			add_location(h23, file, 154, 4, 5600);
    			add_location(h37, file, 155, 4, 5641);
    			set_custom_element_data(goa_button8, "id", "show-loader");
    			add_location(goa_button8, file, 157, 4, 5667);
    			set_custom_element_data(goa_page_loader0, "id", "page-loader");
    			set_custom_element_data(goa_page_loader0, "class", "progress");
    			set_custom_element_data(goa_page_loader0, "type", "progress");
    			set_custom_element_data(goa_page_loader0, "variant", "fullscreen");
    			set_custom_element_data(goa_page_loader0, "message", "loading..");
    			add_location(goa_page_loader0, file, 158, 4, 5730);
    			add_location(script0, file, 159, 4, 5845);
    			add_location(h38, file, 167, 4, 6093);
    			set_custom_element_data(goa_page_loader1, "class", "progress");
    			set_custom_element_data(goa_page_loader1, "type", "progress");
    			set_custom_element_data(goa_page_loader1, "message", "Inline loading...");
    			set_custom_element_data(goa_page_loader1, "variant", "inline");
    			add_location(goa_page_loader1, file, 168, 4, 6113);
    			add_location(h39, file, 170, 4, 6216);
    			set_custom_element_data(goa_spinner0, "type", "infinite");
    			set_custom_element_data(goa_spinner0, "size", "small");
    			add_location(goa_spinner0, file, 171, 4, 6238);
    			set_custom_element_data(goa_spinner1, "type", "infinite");
    			set_custom_element_data(goa_spinner1, "size", "medium");
    			add_location(goa_spinner1, file, 172, 4, 6287);
    			set_custom_element_data(goa_spinner2, "type", "infinite");
    			set_custom_element_data(goa_spinner2, "size", "large");
    			add_location(goa_spinner2, file, 173, 4, 6337);
    			set_custom_element_data(goa_spinner3, "type", "infinite");
    			set_custom_element_data(goa_spinner3, "size", "xlarge");
    			add_location(goa_spinner3, file, 174, 4, 6386);
    			set_custom_element_data(goa_spinner4, "type", "infinite");
    			set_custom_element_data(goa_spinner4, "invert", "");
    			set_custom_element_data(goa_spinner4, "size", "small");
    			add_location(goa_spinner4, file, 177, 6, 6465);
    			set_custom_element_data(goa_spinner5, "type", "infinite");
    			set_custom_element_data(goa_spinner5, "invert", "");
    			set_custom_element_data(goa_spinner5, "size", "medium");
    			add_location(goa_spinner5, file, 178, 6, 6523);
    			set_custom_element_data(goa_spinner6, "type", "infinite");
    			set_custom_element_data(goa_spinner6, "invert", "");
    			set_custom_element_data(goa_spinner6, "size", "large");
    			add_location(goa_spinner6, file, 179, 6, 6582);
    			set_custom_element_data(goa_spinner7, "type", "infinite");
    			set_custom_element_data(goa_spinner7, "invert", "");
    			set_custom_element_data(goa_spinner7, "size", "xlarge");
    			add_location(goa_spinner7, file, 180, 6, 6640);
    			attr_dev(div2, "class", "dark-bg svelte-1y1o818");
    			add_location(div2, file, 176, 4, 6437);
    			add_location(script1, file, 183, 4, 6709);
    			attr_dev(h24, "id", "section-badges");
    			add_location(h24, file, 216, 4, 7758);
    			set_custom_element_data(goa_badge0, "content", "Success");
    			set_custom_element_data(goa_badge0, "type", "success");
    			add_location(goa_badge0, file, 217, 4, 7798);
    			set_custom_element_data(goa_badge1, "content", "Warning");
    			set_custom_element_data(goa_badge1, "type", "warning");
    			add_location(goa_badge1, file, 218, 4, 7849);
    			set_custom_element_data(goa_badge2, "content", "Information");
    			set_custom_element_data(goa_badge2, "type", "information");
    			add_location(goa_badge2, file, 219, 4, 7900);
    			set_custom_element_data(goa_badge3, "content", "Emergency");
    			set_custom_element_data(goa_badge3, "type", "emergency");
    			add_location(goa_badge3, file, 220, 4, 7959);
    			set_custom_element_data(goa_badge4, "content", "Inactive");
    			set_custom_element_data(goa_badge4, "type", "inactive");
    			add_location(goa_badge4, file, 221, 4, 8014);
    			set_custom_element_data(goa_badge5, "content", "Dark");
    			set_custom_element_data(goa_badge5, "type", "dark");
    			add_location(goa_badge5, file, 222, 4, 8067);
    			set_custom_element_data(goa_badge6, "content", "Midtone");
    			set_custom_element_data(goa_badge6, "type", "midtone");
    			add_location(goa_badge6, file, 223, 4, 8112);
    			set_custom_element_data(goa_badge7, "content", "Light");
    			set_custom_element_data(goa_badge7, "type", "light");
    			add_location(goa_badge7, file, 224, 4, 8163);
    			add_location(br2, file, 226, 4, 8211);
    			add_location(br3, file, 227, 4, 8220);
    			set_custom_element_data(goa_badge8, "icon", "");
    			set_custom_element_data(goa_badge8, "content", "Success");
    			set_custom_element_data(goa_badge8, "type", "success");
    			add_location(goa_badge8, file, 228, 4, 8229);
    			set_custom_element_data(goa_badge9, "icon", "");
    			set_custom_element_data(goa_badge9, "content", "Warning");
    			set_custom_element_data(goa_badge9, "type", "warning");
    			add_location(goa_badge9, file, 229, 4, 8285);
    			set_custom_element_data(goa_badge10, "icon", "");
    			set_custom_element_data(goa_badge10, "content", "Information");
    			set_custom_element_data(goa_badge10, "type", "information");
    			add_location(goa_badge10, file, 230, 4, 8341);
    			set_custom_element_data(goa_badge11, "icon", "");
    			set_custom_element_data(goa_badge11, "content", "Emergency");
    			set_custom_element_data(goa_badge11, "type", "emergency");
    			add_location(goa_badge11, file, 231, 4, 8405);
    			set_custom_element_data(goa_badge12, "icon", "");
    			set_custom_element_data(goa_badge12, "content", "Inactive");
    			set_custom_element_data(goa_badge12, "type", "inactive");
    			add_location(goa_badge12, file, 232, 4, 8465);
    			set_custom_element_data(goa_badge13, "icon", "");
    			set_custom_element_data(goa_badge13, "content", "Dark");
    			set_custom_element_data(goa_badge13, "type", "dark");
    			add_location(goa_badge13, file, 233, 4, 8523);
    			set_custom_element_data(goa_badge14, "icon", "");
    			set_custom_element_data(goa_badge14, "content", "Midtone");
    			set_custom_element_data(goa_badge14, "type", "midtone");
    			add_location(goa_badge14, file, 234, 4, 8573);
    			set_custom_element_data(goa_badge15, "icon", "");
    			set_custom_element_data(goa_badge15, "content", "Light");
    			set_custom_element_data(goa_badge15, "type", "light");
    			add_location(goa_badge15, file, 235, 4, 8629);
    			add_location(br4, file, 237, 4, 8682);
    			add_location(br5, file, 238, 4, 8691);
    			set_custom_element_data(goa_badge16, "icon", "");
    			set_custom_element_data(goa_badge16, "type", "success");
    			add_location(goa_badge16, file, 239, 4, 8700);
    			set_custom_element_data(goa_badge17, "icon", "");
    			set_custom_element_data(goa_badge17, "type", "warning");
    			add_location(goa_badge17, file, 240, 4, 8738);
    			set_custom_element_data(goa_badge18, "icon", "");
    			set_custom_element_data(goa_badge18, "type", "information");
    			add_location(goa_badge18, file, 241, 4, 8776);
    			set_custom_element_data(goa_badge19, "icon", "");
    			set_custom_element_data(goa_badge19, "type", "emergency");
    			add_location(goa_badge19, file, 242, 4, 8818);
    			set_custom_element_data(goa_badge20, "icon", "");
    			set_custom_element_data(goa_badge20, "type", "inactive");
    			add_location(goa_badge20, file, 243, 4, 8858);
    			set_custom_element_data(goa_badge21, "icon", "");
    			set_custom_element_data(goa_badge21, "type", "dark");
    			add_location(goa_badge21, file, 244, 4, 8897);
    			set_custom_element_data(goa_badge22, "icon", "");
    			set_custom_element_data(goa_badge22, "type", "midtone");
    			add_location(goa_badge22, file, 245, 4, 8932);
    			set_custom_element_data(goa_badge23, "icon", "");
    			set_custom_element_data(goa_badge23, "type", "light");
    			add_location(goa_badge23, file, 246, 4, 8970);
    			attr_dev(h25, "id", "section-modal");
    			add_location(h25, file, 248, 4, 9007);
    			set_custom_element_data(goa_button9, "id", "openModal");
    			add_location(goa_button9, file, 249, 4, 9045);
    			add_location(p0, file, 251, 8, 9177);
    			add_location(p1, file, 252, 8, 9424);
    			add_location(p2, file, 253, 8, 9671);
    			add_location(p3, file, 254, 8, 9918);
    			add_location(p4, file, 255, 8, 10165);
    			add_location(p5, file, 256, 8, 10412);
    			add_location(p6, file, 257, 8, 10659);
    			add_location(p7, file, 258, 8, 10906);
    			add_location(p8, file, 259, 8, 11153);
    			set_custom_element_data(goa_button10, "slot", "actions");
    			set_custom_element_data(goa_button10, "size", "medium");
    			add_location(goa_button10, file, 261, 8, 11401);
    			set_custom_element_data(goa_modal0, "id", "modal");
    			set_custom_element_data(goa_modal0, "title", "Modal Header.....");
    			set_custom_element_data(goa_modal0, "closable", "");
    			set_custom_element_data(goa_modal0, "scrollable", "");
    			add_location(goa_modal0, file, 250, 4, 9100);
    			add_location(script2, file, 264, 4, 11485);
    			attr_dev(h26, "id", "section-notification");
    			add_location(h26, file, 281, 4, 11966);
    			set_custom_element_data(goa_notification, "type", "information");
    			add_location(goa_notification, file, 282, 4, 12018);
    			attr_dev(h27, "id", "section-input");
    			add_location(h27, file, 288, 4, 12354);
    			set_custom_element_data(goa_input0, "id", "firstname");
    			set_custom_element_data(goa_input0, "name", "firstname");
    			set_custom_element_data(goa_input0, "disabled", "false");
    			add_location(goa_input0, file, 291, 8, 12499);
    			set_custom_element_data(goa_form_item0, "label", "First name");
    			set_custom_element_data(goa_form_item0, "helptext", "This is helper text");
    			add_location(goa_form_item0, file, 290, 6, 12425);
    			set_custom_element_data(goa_input1, "id", "middlename");
    			set_custom_element_data(goa_input1, "name", "middlename");
    			set_custom_element_data(goa_input1, "disabled", "");
    			add_location(goa_input1, file, 295, 8, 12680);
    			set_custom_element_data(goa_form_item1, "label", "Middle name");
    			set_custom_element_data(goa_form_item1, "optional", "");
    			set_custom_element_data(goa_form_item1, "helptext", "This should be disabled");
    			add_location(goa_form_item1, file, 294, 6, 12592);
    			set_custom_element_data(goa_input2, "id", "lastname");
    			set_custom_element_data(goa_input2, "name", "lastname");
    			add_location(goa_input2, file, 299, 8, 12849);
    			set_custom_element_data(goa_form_item2, "label", "Last name");
    			set_custom_element_data(goa_form_item2, "optional", "");
    			set_custom_element_data(goa_form_item2, "helptext", "This is helper text");
    			add_location(goa_form_item2, file, 298, 6, 12767);
    			set_custom_element_data(goa_flex_row0, "gap", "small");
    			add_location(goa_flex_row0, file, 289, 4, 12392);
    			set_custom_element_data(goa_input3, "id", "password");
    			set_custom_element_data(goa_input3, "name", "password");
    			set_custom_element_data(goa_input3, "type", "password");
    			set_custom_element_data(goa_input3, "trailingicon", "finger-print");
    			set_custom_element_data(goa_input3, "handletrailingiconclick", "");
    			add_location(goa_input3, file, 305, 8, 13056);
    			set_custom_element_data(goa_form_item3, "label", "Password");
    			set_custom_element_data(goa_form_item3, "helptext", "No easily guessable passwords");
    			add_location(goa_form_item3, file, 304, 6, 12974);
    			set_custom_element_data(goa_flex_row1, "gap", "small");
    			add_location(goa_flex_row1, file, 303, 4, 12941);
    			set_custom_element_data(goa_textarea, "id", "comments");
    			set_custom_element_data(goa_textarea, "name", "comments");
    			add_location(goa_textarea, file, 310, 6, 13265);
    			set_custom_element_data(goa_form_item4, "label", "Comments");
    			set_custom_element_data(goa_form_item4, "optional", "");
    			add_location(goa_form_item4, file, 309, 4, 13217);
    			add_location(script3, file, 313, 4, 13338);
    			attr_dev(h28, "id", "section-dropdown");
    			add_location(h28, file, 319, 4, 13506);
    			set_custom_element_data(goa_dropdown_item0, "name", "autocomplete");
    			set_custom_element_data(goa_dropdown_item0, "value", "1");
    			set_custom_element_data(goa_dropdown_item0, "label", "Tom Cruise");
    			add_location(goa_dropdown_item0, file, 322, 8, 13689);
    			attr_dev(img, "alt", "nicholas cage");
    			attr_dev(img, "height", "40");
    			attr_dev(img, "width", "40");
    			if (!src_url_equal(img.src, img_src_value = "https://www.placecage.com/40/40")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "svelte-1y1o818");
    			add_location(img, file, 325, 12, 13900);
    			add_location(span, file, 331, 12, 14069);
    			attr_dev(div3, "class", "custom-dropdown-content svelte-1y1o818");
    			add_location(div3, file, 324, 10, 13850);
    			set_custom_element_data(goa_dropdown_item1, "name", "autocomplete");
    			set_custom_element_data(goa_dropdown_item1, "value", "2");
    			set_custom_element_data(goa_dropdown_item1, "label", "Nicholas Cage");
    			add_location(goa_dropdown_item1, file, 323, 8, 13768);
    			set_custom_element_data(goa_dropdown_item2, "name", "autocomplete");
    			set_custom_element_data(goa_dropdown_item2, "value", "3");
    			set_custom_element_data(goa_dropdown_item2, "label", "Tom Hardy");
    			add_location(goa_dropdown_item2, file, 334, 8, 14150);
    			set_custom_element_data(goa_dropdown_item3, "name", "autocomplete");
    			set_custom_element_data(goa_dropdown_item3, "value", "4");
    			set_custom_element_data(goa_dropdown_item3, "label", "Val Kilmer");
    			add_location(goa_dropdown_item3, file, 335, 8, 14228);
    			set_custom_element_data(goa_dropdown, "id", "dropdown");
    			set_custom_element_data(goa_dropdown, "name", "autocomplete");
    			set_custom_element_data(goa_dropdown, "multiselect", "");
    			set_custom_element_data(goa_dropdown, "autocomplete", "");
    			add_location(goa_dropdown, file, 321, 6, 13607);
    			set_custom_element_data(goa_form_item5, "label", "Favourite Actor");
    			add_location(goa_form_item5, file, 320, 4, 13561);
    			add_location(script4, file, 338, 4, 14346);
    			attr_dev(h29, "id", "section-radio");
    			add_location(h29, file, 347, 4, 14557);
    			set_custom_element_data(goa_checkbox0, "id", "radio-error");
    			set_custom_element_data(goa_checkbox0, "name", "radio-error");
    			set_custom_element_data(goa_checkbox0, "text", "Set radio error state");
    			add_location(goa_checkbox0, file, 349, 4, 14604);
    			set_custom_element_data(goa_radio_item0, "name", "color");
    			set_custom_element_data(goa_radio_item0, "value", "red");
    			set_custom_element_data(goa_radio_item0, "label", "Red");
    			add_location(goa_radio_item0, file, 352, 8, 14805);
    			set_custom_element_data(goa_radio_item1, "name", "color");
    			set_custom_element_data(goa_radio_item1, "value", "blue");
    			set_custom_element_data(goa_radio_item1, "label", "Blue");
    			add_location(goa_radio_item1, file, 353, 8, 14869);
    			set_custom_element_data(goa_radio_item2, "name", "color");
    			set_custom_element_data(goa_radio_item2, "value", "green");
    			set_custom_element_data(goa_radio_item2, "label", "Green");
    			add_location(goa_radio_item2, file, 354, 8, 14935);
    			set_custom_element_data(goa_radio_group, "id", "radioGroup1");
    			set_custom_element_data(goa_radio_group, "name", "color");
    			set_custom_element_data(goa_radio_group, "value", "blue");
    			add_location(goa_radio_group, file, 351, 6, 14736);
    			set_custom_element_data(goa_form_item6, "label", "Favourite Color");
    			add_location(goa_form_item6, file, 350, 4, 14690);
    			add_location(script5, file, 358, 4, 15046);
    			attr_dev(h210, "id", "section-callout");
    			add_location(h210, file, 376, 4, 15623);
    			set_custom_element_data(goa_callout, "type", "success");
    			set_custom_element_data(goa_callout, "title", "Callout title");
    			add_location(goa_callout, file, 377, 4, 15665);
    			add_location(hr, file, 382, 4, 16012);
    			attr_dev(h211, "id", "section-container");
    			add_location(h211, file, 385, 4, 16047);
    			add_location(h212, file, 387, 6, 16123);
    			add_location(p9, file, 388, 6, 16149);
    			set_custom_element_data(goa_button11, "id", "do-delete");
    			set_custom_element_data(goa_button11, "variant", "danger");
    			set_custom_element_data(goa_button11, "slot", "actions");
    			add_location(goa_button11, file, 389, 6, 16202);
    			add_location(script6, file, 390, 6, 16287);
    			set_custom_element_data(goa_modal1, "id", "modal2");
    			add_location(goa_modal1, file, 386, 4, 16093);
    			add_location(h213, file, 399, 6, 16556);
    			set_style(p10, "line-height", "1.6rem");
    			add_location(p10, file, 400, 6, 16585);
    			attr_dev(div4, "slot", "title");
    			add_location(div4, file, 410, 6, 17138);
    			set_custom_element_data(goa_button12, "id", "delete-all");
    			set_custom_element_data(goa_button12, "type", "secondary");
    			set_custom_element_data(goa_button12, "variant", "danger");
    			set_custom_element_data(goa_button12, "size", "small");
    			set_custom_element_data(goa_button12, "slot", "actions");
    			add_location(goa_button12, file, 411, 6, 17186);
    			add_location(div5, file, 414, 8, 17365);
    			set_custom_element_data(goa_container0, "variant", "primary");
    			set_custom_element_data(goa_container0, "headingsize", "small");
    			add_location(goa_container0, file, 413, 6, 17303);
    			set_custom_element_data(goa_button13, "type", "primary");
    			add_location(goa_button13, file, 417, 6, 17431);
    			add_location(goa_container1, file, 398, 4, 16534);
    			add_location(script7, file, 420, 4, 17510);
    			attr_dev(h214, "id", "section-checkbox");
    			add_location(h214, file, 429, 4, 17765);
    			set_custom_element_data(goa_checkbox1, "id", "confirm");
    			set_custom_element_data(goa_checkbox1, "name", "confirm");
    			set_custom_element_data(goa_checkbox1, "text", "I accept the conditions");
    			add_location(goa_checkbox1, file, 432, 6, 17861);
    			set_custom_element_data(goa_form_item7, "label", "Terms and conditions");
    			add_location(goa_form_item7, file, 431, 4, 17810);
    			add_location(script8, file, 438, 4, 17992);
    			attr_dev(h215, "id", "section-buttons");
    			add_location(h215, file, 446, 4, 18226);
    			add_location(h310, file, 448, 4, 18275);
    			set_custom_element_data(goa_button14, "type", "tertiary");
    			add_location(goa_button14, file, 450, 6, 18346);
    			set_custom_element_data(goa_button15, "type", "primary");
    			set_custom_element_data(goa_button15, "disabled", "");
    			set_custom_element_data(goa_button15, "title", "This one is disabled");
    			add_location(goa_button15, file, 451, 6, 18400);
    			set_custom_element_data(goa_button_group0, "alignment", "start");
    			add_location(goa_button_group0, file, 449, 4, 18303);
    			add_location(h311, file, 454, 4, 18512);
    			set_custom_element_data(goa_button16, "type", "tertiary");
    			add_location(goa_button16, file, 456, 6, 18579);
    			set_custom_element_data(goa_button17, "type", "primary");
    			add_location(goa_button17, file, 457, 6, 18633);
    			set_custom_element_data(goa_button_group1, "alignment", "end");
    			add_location(goa_button_group1, file, 455, 4, 18538);
    			attr_dev(h216, "id", "section-icon-buttons");
    			add_location(h216, file, 461, 4, 18708);
    			set_custom_element_data(goa_icon_button0, "type", "close");
    			add_location(goa_icon_button0, file, 462, 4, 18760);
    			set_custom_element_data(goa_icon_button1, "type", "close");
    			set_custom_element_data(goa_icon_button1, "variant", "nocolor");
    			add_location(goa_icon_button1, file, 463, 4, 18797);
    			attr_dev(h217, "id", "section-icon-buttons");
    			add_location(h217, file, 465, 4, 18853);
    			set_custom_element_data(goa_icon_button2, "inverted", "");
    			set_custom_element_data(goa_icon_button2, "type", "close");
    			add_location(goa_icon_button2, file, 467, 6, 18944);
    			attr_dev(div6, "class", "dark-bg svelte-1y1o818");
    			add_location(div6, file, 466, 4, 18916);
    			attr_dev(h218, "id", "section-icons");
    			add_location(h218, file, 470, 4, 19002);
    			set_custom_element_data(goa_icon, "type", "close");
    			add_location(goa_icon, file, 471, 4, 19040);
    			add_location(goa_page_block, file, 26, 2, 834);
    			add_location(main, file, 8, 0, 114);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, goa_service_level_header);
    			append_dev(main, t1);
    			append_dev(main, goa_app_header);
    			append_dev(goa_app_header, a0);
    			append_dev(main, t3);
    			append_dev(main, goa_hero_banner);
    			append_dev(goa_hero_banner, div0);
    			append_dev(goa_hero_banner, t5);
    			append_dev(goa_hero_banner, div1);
    			append_dev(div1, goa_button0);
    			append_dev(main, t7);
    			append_dev(main, goa_page_block);
    			append_dev(goa_page_block, h20);
    			append_dev(goa_page_block, t9);
    			append_dev(goa_page_block, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a1);
    			append_dev(ul, t11);
    			append_dev(ul, li1);
    			append_dev(li1, a2);
    			append_dev(ul, t13);
    			append_dev(ul, li2);
    			append_dev(li2, a3);
    			append_dev(ul, t15);
    			append_dev(ul, li3);
    			append_dev(li3, a4);
    			append_dev(ul, t17);
    			append_dev(ul, li4);
    			append_dev(li4, a5);
    			append_dev(ul, t19);
    			append_dev(ul, li5);
    			append_dev(li5, a6);
    			append_dev(ul, t21);
    			append_dev(ul, li6);
    			append_dev(li6, a7);
    			append_dev(ul, t23);
    			append_dev(ul, li7);
    			append_dev(li7, a8);
    			append_dev(ul, t25);
    			append_dev(ul, li8);
    			append_dev(li8, a9);
    			append_dev(ul, t27);
    			append_dev(ul, li9);
    			append_dev(li9, a10);
    			append_dev(ul, t29);
    			append_dev(ul, li10);
    			append_dev(li10, a11);
    			append_dev(ul, t31);
    			append_dev(ul, li11);
    			append_dev(li11, a12);
    			append_dev(ul, t33);
    			append_dev(ul, li12);
    			append_dev(li12, a13);
    			append_dev(ul, t35);
    			append_dev(ul, li13);
    			append_dev(li13, a14);
    			append_dev(ul, t37);
    			append_dev(ul, li14);
    			append_dev(li14, a15);
    			append_dev(ul, t39);
    			append_dev(ul, li15);
    			append_dev(li15, a16);
    			append_dev(goa_page_block, t41);
    			append_dev(goa_page_block, h21);
    			append_dev(goa_page_block, t43);
    			append_dev(goa_page_block, goa_card_group0);
    			append_dev(goa_card_group0, goa_card0);
    			append_dev(goa_card0, goa_card_content0);
    			append_dev(goa_card0, t45);
    			append_dev(goa_card0, goa_card_image0);
    			append_dev(goa_card0, t46);
    			append_dev(goa_card0, goa_card_actions0);
    			append_dev(goa_card_actions0, goa_button1);
    			append_dev(goa_card_group0, t48);
    			append_dev(goa_card_group0, goa_card1);
    			append_dev(goa_card1, goa_card_image1);
    			append_dev(goa_card1, t49);
    			append_dev(goa_card1, goa_card_content1);
    			append_dev(goa_card1, t51);
    			append_dev(goa_card1, goa_card_actions1);
    			append_dev(goa_card_actions1, goa_button2);
    			append_dev(goa_card_group0, t53);
    			append_dev(goa_card_group0, goa_card2);
    			append_dev(goa_card2, goa_card_content2);
    			append_dev(goa_card2, t55);
    			append_dev(goa_card2, goa_card_image2);
    			append_dev(goa_card2, t56);
    			append_dev(goa_card2, goa_card_actions2);
    			append_dev(goa_card_actions2, goa_button3);
    			append_dev(goa_card_group0, t58);
    			append_dev(goa_card_group0, goa_card3);
    			append_dev(goa_card3, goa_card_content3);
    			append_dev(goa_card_content3, t59);
    			append_dev(goa_card_content3, br0);
    			append_dev(goa_card_content3, t60);
    			append_dev(goa_card_content3, br1);
    			append_dev(goa_card_content3, t61);
    			append_dev(goa_card3, t62);
    			append_dev(goa_card3, goa_card_actions3);
    			append_dev(goa_card_actions3, goa_button4);
    			append_dev(goa_card_group0, t64);
    			append_dev(goa_card_group0, goa_card4);
    			append_dev(goa_card4, goa_card_content4);
    			append_dev(goa_card4, t66);
    			append_dev(goa_card4, goa_card_image3);
    			append_dev(goa_card4, t67);
    			append_dev(goa_card4, goa_card_actions4);
    			append_dev(goa_card_actions4, goa_button5);
    			append_dev(goa_card_actions4, t69);
    			append_dev(goa_card_actions4, goa_button6);
    			append_dev(goa_card_group0, t71);
    			append_dev(goa_card_group0, goa_card5);
    			append_dev(goa_card5, goa_card_actions5);
    			append_dev(goa_card_actions5, goa_button7);
    			append_dev(goa_card5, t73);
    			append_dev(goa_card5, goa_card_image4);
    			append_dev(goa_card5, t74);
    			append_dev(goa_card5, goa_card_content5);
    			append_dev(goa_page_block, t76);
    			append_dev(goa_page_block, h22);
    			append_dev(goa_page_block, t78);
    			append_dev(goa_page_block, h30);
    			append_dev(goa_page_block, t80);
    			append_dev(goa_page_block, goa_skeleton0);
    			append_dev(goa_page_block, t81);
    			append_dev(goa_page_block, goa_skeleton1);
    			append_dev(goa_page_block, t82);
    			append_dev(goa_page_block, goa_skeleton2);
    			append_dev(goa_page_block, t83);
    			append_dev(goa_page_block, goa_skeleton3);
    			append_dev(goa_page_block, t84);
    			append_dev(goa_page_block, h31);
    			append_dev(goa_page_block, t86);
    			append_dev(goa_page_block, goa_skeleton4);
    			append_dev(goa_page_block, t87);
    			append_dev(goa_page_block, goa_skeleton5);
    			append_dev(goa_page_block, t88);
    			append_dev(goa_page_block, goa_skeleton6);
    			append_dev(goa_page_block, t89);
    			append_dev(goa_page_block, goa_skeleton7);
    			append_dev(goa_page_block, t90);
    			append_dev(goa_page_block, h32);
    			append_dev(goa_page_block, t92);
    			append_dev(goa_page_block, goa_skeleton8);
    			append_dev(goa_page_block, t93);
    			append_dev(goa_page_block, goa_skeleton9);
    			append_dev(goa_page_block, t94);
    			append_dev(goa_page_block, goa_skeleton10);
    			append_dev(goa_page_block, t95);
    			append_dev(goa_page_block, goa_skeleton11);
    			append_dev(goa_page_block, t96);
    			append_dev(goa_page_block, h33);
    			append_dev(goa_page_block, t98);
    			append_dev(goa_page_block, goa_skeleton12);
    			append_dev(goa_page_block, t99);
    			append_dev(goa_page_block, h34);
    			append_dev(goa_page_block, t101);
    			append_dev(goa_page_block, goa_skeleton13);
    			append_dev(goa_page_block, t102);
    			append_dev(goa_page_block, goa_skeleton14);
    			append_dev(goa_page_block, t103);
    			append_dev(goa_page_block, goa_skeleton15);
    			append_dev(goa_page_block, t104);
    			append_dev(goa_page_block, goa_skeleton16);
    			append_dev(goa_page_block, t105);
    			append_dev(goa_page_block, h35);
    			append_dev(goa_page_block, t107);
    			append_dev(goa_page_block, goa_card_group1);
    			append_dev(goa_card_group1, goa_skeleton17);
    			append_dev(goa_card_group1, t108);
    			append_dev(goa_card_group1, goa_skeleton18);
    			append_dev(goa_card_group1, t109);
    			append_dev(goa_card_group1, goa_skeleton19);
    			append_dev(goa_card_group1, t110);
    			append_dev(goa_card_group1, goa_skeleton20);
    			append_dev(goa_page_block, t111);
    			append_dev(goa_page_block, h36);
    			append_dev(goa_page_block, t113);
    			append_dev(goa_page_block, goa_skeleton21);
    			append_dev(goa_page_block, t114);
    			append_dev(goa_page_block, goa_skeleton22);
    			append_dev(goa_page_block, t115);
    			append_dev(goa_page_block, goa_skeleton23);
    			append_dev(goa_page_block, t116);
    			append_dev(goa_page_block, goa_skeleton24);
    			append_dev(goa_page_block, t117);
    			append_dev(goa_page_block, h23);
    			append_dev(goa_page_block, t119);
    			append_dev(goa_page_block, h37);
    			append_dev(goa_page_block, t121);
    			append_dev(goa_page_block, goa_button8);
    			append_dev(goa_page_block, t123);
    			append_dev(goa_page_block, goa_page_loader0);
    			append_dev(goa_page_block, t124);
    			append_dev(goa_page_block, script0);
    			append_dev(goa_page_block, t126);
    			append_dev(goa_page_block, h38);
    			append_dev(goa_page_block, t128);
    			append_dev(goa_page_block, goa_page_loader1);
    			append_dev(goa_page_block, t129);
    			append_dev(goa_page_block, h39);
    			append_dev(goa_page_block, t131);
    			append_dev(goa_page_block, goa_spinner0);
    			append_dev(goa_page_block, t132);
    			append_dev(goa_page_block, goa_spinner1);
    			append_dev(goa_page_block, t133);
    			append_dev(goa_page_block, goa_spinner2);
    			append_dev(goa_page_block, t134);
    			append_dev(goa_page_block, goa_spinner3);
    			append_dev(goa_page_block, t135);
    			append_dev(goa_page_block, div2);
    			append_dev(div2, goa_spinner4);
    			append_dev(div2, t136);
    			append_dev(div2, goa_spinner5);
    			append_dev(div2, t137);
    			append_dev(div2, goa_spinner6);
    			append_dev(div2, t138);
    			append_dev(div2, goa_spinner7);
    			append_dev(goa_page_block, t139);
    			append_dev(goa_page_block, script1);
    			append_dev(goa_page_block, t141);
    			append_dev(goa_page_block, h24);
    			append_dev(goa_page_block, t143);
    			append_dev(goa_page_block, goa_badge0);
    			append_dev(goa_page_block, t144);
    			append_dev(goa_page_block, goa_badge1);
    			append_dev(goa_page_block, t145);
    			append_dev(goa_page_block, goa_badge2);
    			append_dev(goa_page_block, t146);
    			append_dev(goa_page_block, goa_badge3);
    			append_dev(goa_page_block, t147);
    			append_dev(goa_page_block, goa_badge4);
    			append_dev(goa_page_block, t148);
    			append_dev(goa_page_block, goa_badge5);
    			append_dev(goa_page_block, t149);
    			append_dev(goa_page_block, goa_badge6);
    			append_dev(goa_page_block, t150);
    			append_dev(goa_page_block, goa_badge7);
    			append_dev(goa_page_block, t151);
    			append_dev(goa_page_block, br2);
    			append_dev(goa_page_block, t152);
    			append_dev(goa_page_block, br3);
    			append_dev(goa_page_block, t153);
    			append_dev(goa_page_block, goa_badge8);
    			append_dev(goa_page_block, t154);
    			append_dev(goa_page_block, goa_badge9);
    			append_dev(goa_page_block, t155);
    			append_dev(goa_page_block, goa_badge10);
    			append_dev(goa_page_block, t156);
    			append_dev(goa_page_block, goa_badge11);
    			append_dev(goa_page_block, t157);
    			append_dev(goa_page_block, goa_badge12);
    			append_dev(goa_page_block, t158);
    			append_dev(goa_page_block, goa_badge13);
    			append_dev(goa_page_block, t159);
    			append_dev(goa_page_block, goa_badge14);
    			append_dev(goa_page_block, t160);
    			append_dev(goa_page_block, goa_badge15);
    			append_dev(goa_page_block, t161);
    			append_dev(goa_page_block, br4);
    			append_dev(goa_page_block, t162);
    			append_dev(goa_page_block, br5);
    			append_dev(goa_page_block, t163);
    			append_dev(goa_page_block, goa_badge16);
    			append_dev(goa_page_block, t164);
    			append_dev(goa_page_block, goa_badge17);
    			append_dev(goa_page_block, t165);
    			append_dev(goa_page_block, goa_badge18);
    			append_dev(goa_page_block, t166);
    			append_dev(goa_page_block, goa_badge19);
    			append_dev(goa_page_block, t167);
    			append_dev(goa_page_block, goa_badge20);
    			append_dev(goa_page_block, t168);
    			append_dev(goa_page_block, goa_badge21);
    			append_dev(goa_page_block, t169);
    			append_dev(goa_page_block, goa_badge22);
    			append_dev(goa_page_block, t170);
    			append_dev(goa_page_block, goa_badge23);
    			append_dev(goa_page_block, t171);
    			append_dev(goa_page_block, h25);
    			append_dev(goa_page_block, t173);
    			append_dev(goa_page_block, goa_button9);
    			append_dev(goa_page_block, t175);
    			append_dev(goa_page_block, goa_modal0);
    			append_dev(goa_modal0, p0);
    			append_dev(goa_modal0, t177);
    			append_dev(goa_modal0, p1);
    			append_dev(goa_modal0, t179);
    			append_dev(goa_modal0, p2);
    			append_dev(goa_modal0, t181);
    			append_dev(goa_modal0, p3);
    			append_dev(goa_modal0, t183);
    			append_dev(goa_modal0, p4);
    			append_dev(goa_modal0, t185);
    			append_dev(goa_modal0, p5);
    			append_dev(goa_modal0, t187);
    			append_dev(goa_modal0, p6);
    			append_dev(goa_modal0, t189);
    			append_dev(goa_modal0, p7);
    			append_dev(goa_modal0, t191);
    			append_dev(goa_modal0, p8);
    			append_dev(goa_modal0, t193);
    			append_dev(goa_modal0, goa_button10);
    			append_dev(goa_page_block, t195);
    			append_dev(goa_page_block, script2);
    			append_dev(goa_page_block, t197);
    			append_dev(goa_page_block, h26);
    			append_dev(goa_page_block, t199);
    			append_dev(goa_page_block, goa_notification);
    			append_dev(goa_page_block, t201);
    			append_dev(goa_page_block, h27);
    			append_dev(goa_page_block, t203);
    			append_dev(goa_page_block, goa_flex_row0);
    			append_dev(goa_flex_row0, goa_form_item0);
    			append_dev(goa_form_item0, goa_input0);
    			append_dev(goa_flex_row0, t204);
    			append_dev(goa_flex_row0, goa_form_item1);
    			append_dev(goa_form_item1, goa_input1);
    			append_dev(goa_flex_row0, t205);
    			append_dev(goa_flex_row0, goa_form_item2);
    			append_dev(goa_form_item2, goa_input2);
    			append_dev(goa_page_block, t206);
    			append_dev(goa_page_block, goa_flex_row1);
    			append_dev(goa_flex_row1, goa_form_item3);
    			append_dev(goa_form_item3, goa_input3);
    			append_dev(goa_page_block, t207);
    			append_dev(goa_page_block, goa_form_item4);
    			append_dev(goa_form_item4, goa_textarea);
    			append_dev(goa_page_block, t208);
    			append_dev(goa_page_block, script3);
    			append_dev(goa_page_block, t210);
    			append_dev(goa_page_block, h28);
    			append_dev(goa_page_block, t212);
    			append_dev(goa_page_block, goa_form_item5);
    			append_dev(goa_form_item5, goa_dropdown);
    			append_dev(goa_dropdown, goa_dropdown_item0);
    			append_dev(goa_dropdown, t213);
    			append_dev(goa_dropdown, goa_dropdown_item1);
    			append_dev(goa_dropdown_item1, div3);
    			append_dev(div3, img);
    			append_dev(div3, t214);
    			append_dev(div3, span);
    			append_dev(goa_dropdown, t216);
    			append_dev(goa_dropdown, goa_dropdown_item2);
    			append_dev(goa_dropdown, t217);
    			append_dev(goa_dropdown, goa_dropdown_item3);
    			append_dev(goa_page_block, t218);
    			append_dev(goa_page_block, script4);
    			append_dev(goa_page_block, t220);
    			append_dev(goa_page_block, h29);
    			append_dev(goa_page_block, t222);
    			append_dev(goa_page_block, goa_checkbox0);
    			append_dev(goa_page_block, t223);
    			append_dev(goa_page_block, goa_form_item6);
    			append_dev(goa_form_item6, goa_radio_group);
    			append_dev(goa_radio_group, goa_radio_item0);
    			append_dev(goa_radio_group, t224);
    			append_dev(goa_radio_group, goa_radio_item1);
    			append_dev(goa_radio_group, t225);
    			append_dev(goa_radio_group, goa_radio_item2);
    			append_dev(goa_page_block, t226);
    			append_dev(goa_page_block, script5);
    			append_dev(goa_page_block, t228);
    			append_dev(goa_page_block, h210);
    			append_dev(goa_page_block, t230);
    			append_dev(goa_page_block, goa_callout);
    			append_dev(goa_page_block, t232);
    			append_dev(goa_page_block, hr);
    			append_dev(goa_page_block, t233);
    			append_dev(goa_page_block, h211);
    			append_dev(goa_page_block, t235);
    			append_dev(goa_page_block, goa_modal1);
    			append_dev(goa_modal1, h212);
    			append_dev(goa_modal1, t237);
    			append_dev(goa_modal1, p9);
    			append_dev(goa_modal1, t239);
    			append_dev(goa_modal1, goa_button11);
    			append_dev(goa_modal1, t241);
    			append_dev(goa_modal1, script6);
    			append_dev(goa_page_block, t243);
    			append_dev(goa_page_block, goa_container1);
    			append_dev(goa_container1, h213);
    			append_dev(goa_container1, t245);
    			append_dev(goa_container1, p10);
    			append_dev(goa_container1, t247);
    			append_dev(goa_container1, div4);
    			append_dev(goa_container1, t249);
    			append_dev(goa_container1, goa_button12);
    			append_dev(goa_container1, t251);
    			append_dev(goa_container1, goa_container0);
    			append_dev(goa_container0, div5);
    			append_dev(goa_container1, t253);
    			append_dev(goa_container1, goa_button13);
    			append_dev(goa_page_block, t255);
    			append_dev(goa_page_block, script7);
    			append_dev(goa_page_block, t257);
    			append_dev(goa_page_block, h214);
    			append_dev(goa_page_block, t259);
    			append_dev(goa_page_block, goa_form_item7);
    			append_dev(goa_form_item7, goa_checkbox1);
    			append_dev(goa_page_block, t260);
    			append_dev(goa_page_block, script8);
    			append_dev(goa_page_block, t262);
    			append_dev(goa_page_block, h215);
    			append_dev(goa_page_block, t264);
    			append_dev(goa_page_block, h310);
    			append_dev(goa_page_block, t266);
    			append_dev(goa_page_block, goa_button_group0);
    			append_dev(goa_button_group0, goa_button14);
    			append_dev(goa_button_group0, t268);
    			append_dev(goa_button_group0, goa_button15);
    			append_dev(goa_page_block, t270);
    			append_dev(goa_page_block, h311);
    			append_dev(goa_page_block, t272);
    			append_dev(goa_page_block, goa_button_group1);
    			append_dev(goa_button_group1, goa_button16);
    			append_dev(goa_button_group1, t274);
    			append_dev(goa_button_group1, goa_button17);
    			append_dev(goa_page_block, t276);
    			append_dev(goa_page_block, h216);
    			append_dev(goa_page_block, t278);
    			append_dev(goa_page_block, goa_icon_button0);
    			append_dev(goa_page_block, t279);
    			append_dev(goa_page_block, goa_icon_button1);
    			append_dev(goa_page_block, t280);
    			append_dev(goa_page_block, h217);
    			append_dev(goa_page_block, t282);
    			append_dev(goa_page_block, div6);
    			append_dev(div6, goa_icon_button2);
    			append_dev(goa_page_block, t283);
    			append_dev(goa_page_block, h218);
    			append_dev(goa_page_block, t285);
    			append_dev(goa_page_block, goa_icon);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
