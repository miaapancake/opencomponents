import { includesCaseInsensitive } from "../../src/components/helpers";

describe("IncludesCaseInsensitive Function", () => {
    it("Finds an item when in array", () => {
        const array: (string | number)[] = ["a", "b", "c", 1, 2, 3];

        expect(includesCaseInsensitive(array, "A")).toStrictEqual(true);
        expect(includesCaseInsensitive(array, "a")).toStrictEqual(true);
        expect(includesCaseInsensitive(array, 3)).toStrictEqual(true);
    });

    it("Does not find an item in an array when not there", () => {
        const array: (string | number)[] = ["a", "b", "c", 1, 2, 3];

        expect(includesCaseInsensitive(array, "D")).toStrictEqual(false);
        expect(includesCaseInsensitive(array, "d")).toStrictEqual(false);
        expect(includesCaseInsensitive(array, 5)).toStrictEqual(false);
    });
});
