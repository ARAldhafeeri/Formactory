import { render, screen } from '@testing-library/react';
import React from 'react';
import Emmitter from "../../src/Events";


describe('Events', () => {
    it('should add event listeners', () => {
        const emitter = new Emmitter();
        const callback = jest.fn();
        emitter.on('form:submit', callback);
        emitter.emit('form:submit');
        expect(callback).toHaveBeenCalled();
    });

    it('should remove event listeners', () => {
        const emitter = new Emmitter();
        const callback = jest.fn();
        emitter.on('form:submit', callback);
        emitter.off('form:submit', callback);
        emitter.emit('form:submit');
        expect(callback).not.toHaveBeenCalled();
    });
});