import { addOrSetValue } from "../../src/components/helpers";

describe("AddOrSetValue Function", () => {
    it("Sets an object to current value", () => {
        const out = addOrSetValue("new val", "val");

        expect(out).toStrictEqual("new val");
    });

    it("Sets an object to undefined if object is set to current value", () => {
        const out = addOrSetValue("val", "val");

        expect(out).toStrictEqual(undefined);
    });

    it("Appends an array with current value", () => {
        const out = addOrSetValue("new val", ["val"]);

        expect(out).toStrictEqual(["val", "new val"]);
    });

    it("Does not remove current value from an array containing current value", () => {
        const out = addOrSetValue("new val", ["val", "new val"]);

        expect(out).toStrictEqual(["val", "new val"]);
    });
});
