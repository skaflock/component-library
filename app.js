(function () {
    'use strict';

    Vue.component('v-tag', {
        props: ['tag'],
        render: function (createElement) {
            return createElement(this.tag, this.$slots.default)
        }
    });

    Vue.component('app-component-item', {
        props: ['component'],
        template: `
            <div class="component-item" v-on:click="$root.selectComponent(component)">
                {{component.name}}
            </div>
        `
    });

    Vue.component('app-component-list', {
        template: `<div class="component-list">
            !! component-list
            <hr>
            <slot></slot>
        </div>`
    });

    Vue.component('app-component-view', {
        props: ['component'],
        data: function () {
            return {
                html: '',
                css: '',
                js: '',
                dependencies: ''
            };
        },
        methods: {
            getComponentResource: function (resource, prop) {
                var self = this;
                var componentPath = '/components/' + self.component.name + '/';
                if (typeof resource === 'object') {
                    resource.forEach(function (file) {
                        $.get(componentPath + file).done(function (data) {
                            self[prop] += data;
                        });
                    });
                } else if (typeof resource === 'string') {
                    $.get(componentPath + resource).done(function (data) {
                        self[prop] += data;
                    });
                }
            }
        },
        watch: {
            component: {
                immediate: true,
                handler() {
                    this.html = '';
                    this.css = '';
                    this.js = '';
                    this.getComponentResource(this.component.template, 'html');
                    this.getComponentResource(this.component.styles, 'css');
                    this.getComponentResource(this.component.scripts, 'js');
                }
            }
        },
        template: `
            <div class="component-view">
                !! component-view
                <hr>
                <div class="component-view__name">{{ component.name }}</div>
                <div class="component-view__template" v-html="html"></div>
                <div class="component-view__code">
                    <v-tag :tag="'style'" v-html="css"></v-tag>
                    <v-tag :tag="'script'" v-html="js"></v-tag>
                    <ul>
                        <li v-if="html">
                            <b>HTML:</b>
                            <pre><code>{{ html }}</code></pre>
                        </li>
                        <li v-if="css">
                            <b>CSS:</b>
                            <pre><code>{{ css }}</code></pre>
                        </li>
                        <li v-if="js">
                            <b>JS:</b>
                            <pre><code>{{ js }}</code></pre>
                        </li>
                    </ul>
                </div>
            </div>
        `
    });

    var app = new Vue({
        el: '#app',
        data: {
            title: 'Component library',
            components: {},
            currentComponent: {
                "name": "default",
                "template": "default",
                "styles": ['abc', 'def'],
                "scripts": ['xyz'],
                "dependencies": []
            }
        },
        methods: {
            selectComponent: function (component) {
                this.currentComponent = component;
            }
        },
        created: function () {
            var self = this;
            $.get('/components.json').done(function (data) {
                self.components = data;
            });
        }
    });
}());
