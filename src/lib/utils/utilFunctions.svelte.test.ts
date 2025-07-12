import { describe, it, expect } from 'vitest';
import sinon from 'sinon';
import { 
    claculateTimeRemaining, 
    lessThanTen,
    createFormatTime,
    calculateTotalTabataDuration
 } from '$lib/utils/utilFunctions.svelte'
describe('utilFunctions', () => {
    describe('claculateTimeRemaining', () => {
        it('Returns a TimeObjec', () => {
            const testObj = claculateTimeRemaining(100);
            expect(testObj).toEqual({ sec: 40, min: 1 });
        });
    });
    describe('lessThanTen', () => {
        it('returns true if number is less than 10 ', () => {
            const test = lessThanTen(9);
            expect(test).toBe(true);
        })
        it('returns false if number is greater than 10 ', () => {
            const test = lessThanTen(11);
            expect(test).toBe(false);
        })
    });
    describe('createFormatTime', () => {        
        it('returns leading 0 for numbers less than ten', () => {   
            const stubLessThanTen = sinon.stub();
            const testStr = createFormatTime(stubLessThanTen);         
            stubLessThanTen.callsFake(() => true);
            const res = testStr(9);
            expect(stubLessThanTen.calledOnce).toBe(true);
            expect(res).toEqual(`09`)
        });
        it('returns no leading 0 for numbers greater than ten', () => {
            const stubLessThanTen = sinon.stub();
            const testStr = createFormatTime(stubLessThanTen);
            stubLessThanTen.callsFake(() => false);
            const res = testStr(37);
            expect(stubLessThanTen.calledOnce).toBe(true);
            expect(res).toEqual(`37`)
        });
    });
    describe('calculateTotalTabataDuration', () => {
        it('calculates Total Tabata Duration', () => {
            const test = calculateTotalTabataDuration(
                1,
                20,
                10,
                7
            );
            expect(test).toEqual(37)
        })
    });
});
