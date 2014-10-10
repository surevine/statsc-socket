statsc-socket
===============

An event emitter interface to [statsc](https://npm.org/packages/statsc).

## Build status

[![Build Status](https://travis-ci.org/surevine/statsc-socket.svg?branch=master)](https://travis-ci.org/surevine/statsc-socket) 

[![Coverage Status](https://img.shields.io/coveralls/surevine/statsc-socket.svg)](https://coveralls.io/r/surevine/statsc-socket)

## Coding Standards

Checkstyle is used to confirm the preferred coding standards are used, these are based loosely on Google's OS Java guidelines.  There is support in maven, the build should fail on the introduction of errors and there is also support for automated formatting in Eclipse.  To setup do the following -

* Navigate to Eclipse->Preferences->Java ->Code Style->Formatter
* Select 'import' and there is a file named 'eclipse_formatter.xml' in src/main/resources.
* Import and set it as the active profile