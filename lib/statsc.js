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
    'statsc.increment': 'increment',
    'statsc.decrement': 'decrement',
    'statsc.timing': 'timing',
    'statsc.gauge': 'gauge',
    'statsc.send': 'send',
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

Statsc.prototype.increment = function(data) {
    data.unshift('i')
    this.process(data)
}

Statsc.prototype.decrement = function(data) {
    data.unshift('d')
    this.process(data)
}

Statsc.prototype.timing = function(data) {
    data.unshift('t')
    this.process(data)
}

Statsc.prototype.gauge = function(data) {
    data.unshift('g')
    this.process(data)
}

Statsc.prototype.send = function(data) {
    data.unshift('s')
    this.process(data)
}

Statsc.prototype.process = function(data) {
    statsc.receive(data)
}

module.exports = Statsc