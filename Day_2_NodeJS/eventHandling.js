var events = require('events');
// all event properties and methods are an instance of an object
// call constructor for that object
var eventEmitter = new events.EventEmitter();

//event handler:
var myEventHandler = function(){
  console.log('I hear a scream');
}
// attaches handler to some event name
eventEmitter.on('scream', myEventHandler);

//fire event:
eventEmitter.emit('scream');



/*

created event instance
modified properties of the instance to include handling a new type of event

*/
