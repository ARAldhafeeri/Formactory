import { useReducer } from 'react';
import reducerGenerator from "../../src/Reducer";
import { act, renderHook, screen  } from '@testing-library/react';


describe('reducerGenerator', () => {
    const initState = { name: 'John Doe' };
    // rule to change name to test if change name is dispatched
    const rules = [
      { on: 'changeName', condition: { operator: 'equal', values: ['John Doe'] }, action: () => ({ name: 'test' }) },    
    ];

    test(('should return a reducer function'), () => {
      const reducer = reducerGenerator(rules);
      expect(reducer).toBeInstanceOf(Function);
    });

    test("should return the initial state", () => {
      const reducer = reducerGenerator(rules);
      const { result } = renderHook(() => useReducer(reducer, initState));
      expect(result.current[0]).toEqual(initState);
    });

    test('should change the state when an action is dispatched', () => {
      const reducer = reducerGenerator(rules);
      const { result } = renderHook(() => useReducer(reducer, initState));
      act(() => {
        result.current[1]({ type: 'changeName' });
      });
      expect(result.current[0].name).toBe('test');
    });

  });