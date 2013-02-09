/**
 *
 * Version:     0.1.2
 * Author:      Gianluca Guarini
 * Contact:     gianluca.guarini@gmail.com
 * Website:     http://www.gianlucaguarini.com/
 * Twitter:     @gianlucaguarini
 *
 * Copyright (c) 2013 Gianluca Guarini
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 **/

;(function(document,window,undefined) {
    //"use strict";
    // window performance polyfill http://gent.ilcore.com/2012/06/better-timer-for-javascript.html
    window.performance = window.performance || {};
    performance.now = (function() {
        return  performance.now       ||
                performance.mozNow    ||
                performance.msNow     ||
                performance.oNow      ||
                performance.webkitNow ||
                function() { return new Date().getTime(); };
        })();
        var EasyAnimationFrame = (function ( callback , elm , frameDelay ) {

        

        // Private Vars
        var self            = this,
            _frameDelay     = frameDelay !== undefined ? frameDelay : 1000 / 60,
            _framerate      = 0,
            _stopped        = true,
            _RqAnFr,_start,_delayRange,_frameTicker;

        // Public Methods

        /*
        *
        * this method allows you to start the the animation just when you need it
        *
        */
        this.startAnimation = function () {
            _start   = window.performance.now();
            _frameTicker = _start;
            _delayRange = _start + _frameDelay;
            _stopped = false;
            loop();

        };
        /*
        *
        * stop immediately the animation
        *
        */
        this.clearAnimation = function () {
            cancelRequestAnimFrame ( _RqAnFr );
            _stopped = true;
        };
        /*
        *
        * update the framedelay on the fly
        *
        */
        this.updateFrameDelay = function ( newFrameDelay ) {
            _frameDelay = Number( newFrameDelay );
            _delayRange   = window.performance.now() + _frameDelay;
        };
        /*
        *
        * it could be used to get the current framedelay
        *
        */
        this.getFrameDelay = function () {
            return _frameDelay;
        };
        /*
        *
        * return the framerate of the current animation
        *
        */
        this.getFramerate = function () {
            return _framerate;
        };

        // Private methods

        /*
        * this function loops on itself using the requestAnimationFrame API
        * the loop can not start twice if the animation is still running
        *
        */
        var loop = function ( now ) {

            if ( !_stopped ) {
                _RqAnFr = requestAnimFrame ( loop, elm );
                frameController(  window.performance.now() );
            }
        };
        /*
        *
        * this function call the callback function respecting the framerate passed to Animator.js
        *
        */
        var frameController = function ( now ) {
            var delta = _delayRange - now;
            
            if ( delta <= 0 ) {
                delta = _frameDelay;
                _delayRange = now + _frameDelay;
                callback();
                if ( _frameTicker < now + 1000) {
                    _framerate = Math.round( 1000  / ( now - _frameTicker ) );
                    _frameTicker = now;
                }
            }
        };
        /* Paul Irish requestAnimationFrame Polyfill */
        var requestAnimFrame = (function(){
            return  window.requestAnimationFrame   ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(/* function */ callback, /* DOMElement */ element){
                    return window.setTimeout(callback, _frameDelay);
            };
        })();
        var cancelRequestAnimFrame = ( function() {
            return window.cancelAnimationFrame          ||
                window.webkitCancelRequestAnimationFrame||
                window.mozCancelRequestAnimationFrame   ||
                window.oCancelRequestAnimationFrame     ||
                window.msCancelRequestAnimationFrame    ||
                clearTimeout;
        })();

        return this;
    });
    
    window.EasyAnimationFrame = window.EAF = EasyAnimationFrame;


}(document,window));
