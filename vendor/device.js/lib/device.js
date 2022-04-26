// Device.js
// (c) 2014 Matthew Hudson
// Device.js is freely distributable under the MIT license.
// For all details and documentation:
// http://matthewhudson.me/projects/device.js/

(function() {

  
  var device,
    previousDevice,
    addClass,
    documentElement,
    find,
    handleOrientation,
    hasClass,
    orientationEvent,
    removeClass,
    userAgent;


  
  // Save the previous value of the device variable.
  previousDevice = window.device;

  device = {};

  // Add device as a global object.
  window.device = device;

  // The <html> element.
  documentElement = window.document.documentElement;// Save the previous value of the device variable.
  previousDevice = window.device;


