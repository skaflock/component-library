(function () {
    'use strict';

    Vue.component('app-component-item', {
        props: ['component'],
        template: `
            <div class="component-item" v-on:click="$root.selectComponent(component)">
                {{component.name}}
            </div>
        `
    });

    Vue.component('app-component-list', {
        template: `<div class="component-list" ref="component-list">
            !! component-list
            <hr>
            <slot></slot>
        </div>`
    });

    Vue.component('app-component-view', {
        props: ['selectedComponent'],
        template: `
            <div class="component-view" ref="component-view" v-bind:selectedComponent="currentComponent">
                !! component-view
                <slot></slot>
            </div>
        `
    });

    var app = new Vue({
        el: '#app',
        data: {
            title: 'Component library',
            components: {},
            currentComponent: {
                // component.json template
                "default": {
                    "name": "default",
                    "template": "",
                    "styles": [],
                    "scripts": [],
                    "dependencies": []
                }
            }
        },
        methods: {
            selectComponent: function (component) {
                console.log(component);
            }
        },
        created: function () {
            $.getJSON('/components.json', function (json) {
                this.components = json;
            }.bind(this));
        }
    });
}());
