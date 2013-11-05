ig.module(
	'game.data.storage'
).requires(
).defines(function () {
    'use strict';

    var storage = {
        registerStore: function () {
            window.storage = this;
        },
        isCapable: function () {
            return (typeof (window.localStorage) !== 'undefined');
        },
        isSet: function (key) {
            return (this.get(key) !== null);
        },
        get: function (key, standart) {
            var value = JSON.parse(localStorage.getItem(key));
            if (value !== null) {
                return value;
            } else {
                return standart;
            }
        },
        set: function (key, value) {
            window.localStorage.setItem(key, JSON.stringify(value));
        },
        isHigher: function (key, value) {
            if (this.isSet(key)){
                return (value > this.get(key));
            } else {
                return null;
            }
        },
        isLower: function (key, value) {
            if (this.isSet(key)){
                return (value < this.get(key));
            } else {
                return null;
            }
        },
        setHigher: function (key, value) {
            if (value > this.isHigher(key) || !this.isSet(key)) {
                this.set(key, value);
            }
        },
        setLower: function (key, value) {
            if (value < this.isLower(key) || !this.isSet(key)) {
                this.set(key, value);
            }
        },
        remove: function (key) {
            window.localStorage.removeItem(key);
        },
        clear: function () {
            window.localStorage.clear();
        }
    };
    
    return storage.registerStore();
});