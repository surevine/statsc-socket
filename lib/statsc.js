'use strict';

var statsc = require('statsc')
  , _ = require('underscore')

var Statsc = function(socket, statsd) {
    if ( !_.isString(statsd) )
        throw new Error('statsd must be a server address')
    
    this.statsd = statsd
    statsc.setAddress(statsd)
    this.attachEvents(socket)
}

Statsc.prototype._events = {
    'statsc.tick': 'process'
}

Statsc.prototype.attachEvents = function(socket) {
    if (!this._events) return
    var self = this
    Object.keys(this._events).forEach(function(event) {
        socket.removeAllListeners(event)
        socket.on(event, function(data, callback) {
            self[self._events[event]](data, callback)
        })
    })
}

Statsc.prototype.process = function(data) {
    statsc.receive(data)
}

module.exports = Statsc