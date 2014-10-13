'use strict';

var StatscLibrary = function() {}

var address  = null
var received = null
    
StatscLibrary.prototype.getAddress = function() {
    return address
}
    
StatscLibrary.prototype.setAddress = function(data) {
    address = data
}
    
StatscLibrary.prototype.receive = function(data) {
    received = data
}
    
StatscLibrary.prototype.getReceived = function() {
    return received
}

module.exports = StatscLibrary