// Jest Test File for calculator TDD

const data = require('./calculator');

test('when 0 button pressed, input row appends number', () => {
    expect(data.numberInput([0],1)).toBe([1]);
});