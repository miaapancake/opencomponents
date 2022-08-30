import { compareDate } from '../../src/components/helpers';

describe("CompareDate Function", () => {

    it("Matching dates return true", () => {
        expect(compareDate(new Date(2020, 5, 4), new Date(2020, 5, 4))).toEqual(true);
        expect(compareDate(new Date(2020, 5, 4, 10, 43, 24), new Date(2020, 5, 4, 6, 24, 3))).toEqual(true);
    });

    it("Non matching dates return false", () => {
        expect(compareDate(new Date(2020, 5, 4), new Date(2020, 5, 3))).toEqual(false);
        expect(compareDate(new Date(2020, 5, 2, 10, 43, 24), new Date(2020, 5, 5, 6, 24, 3))).toEqual(false);
    });

    it("Undefined dates return false", () => {

        expect(compareDate(undefined, new Date(2020, 5, 3))).toEqual(false);
        expect(compareDate(new Date(2020, 5, 3), undefined)).toEqual(false);
        expect(compareDate(undefined, undefined)).toEqual(false);

    });
});