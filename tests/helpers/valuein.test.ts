import { valueIn } from "../../src/components/helpers";

describe("ValueIn Function", () => {
    it("Finds value in array", () => {
        expect(valueIn("a", ["a", "b", "c", 1, 2, 3])).toStrictEqual(true);
        expect(valueIn(3, ["a", "b", "c", 1, 2, 3])).toStrictEqual(true);
    });

    it("Compares single values properly", () => {
        expect(valueIn("a", "a")).toStrictEqual(true);
        expect(valueIn(3, 3)).toStrictEqual(true);
    });

    it("Does not find values that are not there", () => {
        expect(valueIn("d", ["a", "b", "c", 1, 2, 3])).toStrictEqual(false);
        expect(valueIn(6, ["a", "b", "c", 1, 2, 3])).toStrictEqual(false);
    });
});
