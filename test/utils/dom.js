import jsdom from 'jsdom'

// setup the simplest DOM possible
const dom = new jsdom.JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

// set globals for mocha that make access to document and window feel 
// natural in the test environment
global.window = dom.window
global.document = dom.window.document

// take all properties of the window object and also attach it to the 
// mocha global object
propagateToGlobal(window)

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}
