import { getWeekDay } from '../../src/components/helpers';

describe("GetWeekDay Function", () => {
    it("Gets the correct weekday", () => {
        expect(getWeekDay(2022, 8, 19)).toEqual(1);
        expect(getWeekDay(2022, 8, 20)).toEqual(2);
    });
});