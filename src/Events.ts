
import { IEmitter } from './types';

class Emmitter implements IEmitter{
    /**
     * @description: Emitter is a simple pubsub class that allows  engine
     * to communicate with the form data, and form ui components
     * @private events: { [key: string]: Function[] } - events object that stores event names and callbacks
     */
    private events = new Map<string,Function>();

    on(event: string, callback: Function){
      /**
       * on is a method that will add an event listener to the events object
       * event is a string that represents the event name
       * callback is a function that will be called when the event is emitted
       * @param {event|String} event - event name
       * @param {callback|Function} callback - function to be called when the event is emitted
       * @example
       * .on('form:submit', callback);
       */
        this.events.set(event, callback);

    }

    off(event: string, callback: Function){
      /**
       * off is a method that will remove an event listener from the events object
       * event is a string that represents the event name
       * callback is a function that will be removed from the event listeners
       * @param {event|String} event - event name
       * @param {callback|Function} callback - function to be removed from the event listeners
       * @example 
       * .off('form:submit', callback);
       */
        if(!this.events.get(event)){
            return;
        }
        this.events.delete(event);
    }

    emit(event: string, ...args: any[]){
      /**
       * emit is a method that will emit an event and call all the event listeners
       * event is a string that represents the event name
       * args is a list of arguments that will be passed to the event listeners
       * @param {event|String} event - event name
       * @param {args|Array} args - arguments to be passed to the event listeners
       * @example
       * .emit('form:submit', data);
       * @returns {void}
       */
        if(!this.events.get(event)){
            return;
        }
        let curr = this.events.get(event);
        curr(...args);
    }
}

export default Emmitter;