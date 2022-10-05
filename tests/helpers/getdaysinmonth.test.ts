import { getDaysInMonth } from "../../src/components/helpers";

describe("GetDaysInMonth Function", () => {
    it("Gets the correct amount of days", () => {
        expect(getDaysInMonth(2022, 8)).toEqual(30);
        expect(getDaysInMonth(2022, 1)).toEqual(28);
        expect(getDaysInMonth(2022, 11)).toEqual(31);
        expect(getDaysInMonth(2004, 1)).toEqual(29);
    });
});
