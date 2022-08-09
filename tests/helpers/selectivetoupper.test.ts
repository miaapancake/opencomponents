import { selectiveToUpper } from "../../src/components/helpers";

describe("SelectiveToUpper Function", () => {
    it("Converts a given type of string to upper", () => {
        let value: string | number = "some string";
        value = selectiveToUpper(value);

        expect(value).toStrictEqual("SOME STRING");
    });

    it("Does not touch any other values than string", () => {
        let value: string | number = 5;
        value = selectiveToUpper(value);

        expect(value).toStrictEqual(5);
    });
});
