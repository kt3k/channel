/**
 * channel.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
 * license: MIT ( http://kt3k.mit-license.org/ )
 * dependency: ylep.js v1.0
 */

this.channel = Object.branch(function (channelPrototype) {
    channelPrototype.constructor = function (name) {
        if (name == null) {
            console.warn('created topic with null name.');
        }

        this.name = name;
        this.listeners = [];
    };

    channelPrototype.subscribe = function (listener) {
        this.listeners.push(listener);

        listener.__listener__ = function (ev) {
            listener(ev.detail);
        };

        window.addEventListener(this.name, listener.__listener__, false);
    };

    channelPrototype.broadcast = function (data) {
        var ev = new CustomEvent(this.name, {detail: data});
        window.dispatchEvent(ev);
    };

    channelPrototype.unsubscribe = function (listener) {
        window.removeEventListener(this.name, listener.__listener__, false);
    };

    channelPrototype.shutdown = function () {
        this.listeners.forEach(function (listener) {
            window.removeEventListener(this.name, listener.__listener__, false);
        }, this);

        this.listeners = [];
    };
});