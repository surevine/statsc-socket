'use strict';

var EVENT = 'statsd.tick'

var statsc = require('statsc')

var Statsc = function(socket, statsd) {
    this.statsd = statsd
    statsc.setAddress(statsd)
    
    socket.on('data', function(raw) {
        var data = raw.data
        var event = data[0]
        if ( event !== EVENT )
            return
        
        var payload = data[1]
        this.process(payload)
    }.bind(this))
}

Statsc.prototype.process = function(data) {
    statsc.receive(data)
}

module.exports = Statsc