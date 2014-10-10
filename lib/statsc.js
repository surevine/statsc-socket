'use strict';

var EVENT = 'statsc.tick'

var statsc = require('statsc')

var Statsc = function(socket, statsd) {
    this.statsd = statsd
    statsc.setAddress(statsd)
    
    socket.on(EVENT, function(payload) {
        this.process(payload)
    }.bind(this))
}

Statsc.prototype.process = function(data) {
    statsc.receive(data)
}

module.exports = Statsc