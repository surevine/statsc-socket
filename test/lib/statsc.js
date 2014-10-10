'use strict';
                 
var mockery = require('mockery')
  , should = require('should')

var events = require('events')
  , statsd = { some: 'object' }
  , StatscLibrary = require('../utils/statsc-library')

/* jshint -W030 */
describe('Statsc socket', function() {
    
    var statsc = null
      , socket = null
      , statscLibrary = null
    
    beforeEach(function() {
        
        mockery.enable()
        
        statscLibrary = new StatscLibrary()

        mockery.registerMock('statsc', statscLibrary)
        
        var Statsc = require('../../index')
        socket = new events.EventEmitter()
        statsc = new Statsc(socket, statsd)
    })
    
    afterEach(function() {
        statscLibrary = null
        socket = null
        statsc = null
        mockery.disable()
    })
    
    it('Is passed \'statsd\' to setAddress', function() {
        statscLibrary.getAddress().should.eql(statsd)  
    })
    
    it('Does not respond to invalid data', function() {
        socket.emit('data', {})
        should(statscLibrary.getReceived()).be.null
    })
    
    it('Does not respond to a non \'statsd.tick\' event', function() {
        socket.emit('data', { data: [ 'statsg.money' ] })
        should(statscLibrary.getReceived()).be.null
    })
    
    it('Processes received \'statsd.tick\' event', function() {
        var data = { some: { nice: 'data' } }
        socket.emit('data', { data: [ 'statsd.tick', data ] })
        statscLibrary.getReceived().should.eql(data)
    })
    
})