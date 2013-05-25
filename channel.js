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
    };

    channelPrototype.subscribe = function (listener) {
        window.addEventListener(this.name, listener, false);
    };

    channelPrototype.broadcast = function (data) {
        var ev = new CustomEvent(this.name);
        ev.data = data;
        window.dispatchEvent(ev);
    };

    channelPrototype.unsubscribe = function (listener) {
        window.removeEventListener();
    };

    channelPrototype.shutdown = function () {
        this.listeners.forEach(function (listener) {
            window.removeEventListener(this.name, listener, false);
        });
    };
});