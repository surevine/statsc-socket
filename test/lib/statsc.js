'use strict';
                 
var mockery = require('mockery')
  , should = require('should')

var events = require('events')
  , statsd = '127.0.0.1:8127'
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
    
    it('Should throw an error if statsd is not an address', function() {
        (function() {
            new Statsc(socket, {an:'object'})
        }).should.throw(Error)
    })
    
    it('Is passed \'statsd\' to setAddress', function() {
        statscLibrary.getAddress().should.eql(statsd)  
    })
    
    it('Does not respond to invalid data', function() {
        socket.emit('data', {})
        should(statscLibrary.getReceived()).be.null
    })
    
    it('Does not respond to a non \'statsc.tick\' event', function() {
        socket.emit('statsg.money', {})
        should(statscLibrary.getReceived()).be.null
    })
    
    it('Processes received \'statsc.tick\' event', function() {
        var data = { some: { nice: 'data' } }
        socket.emit('statsc.tick', data)
        statscLibrary.getReceived().should.eql(data)
    })
    
})