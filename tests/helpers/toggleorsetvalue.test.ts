import { toggleOrSetValue } from "../../src/components/helpers";

describe("ToggleOrSetValue Function", () => {
    it("Sets an object to current value", () => {
        const out = toggleOrSetValue("new val", "val");

        expect(out).toStrictEqual("new val");
    });

    it("Sets an object to undefined if object is set to current value", () => {
        const out = toggleOrSetValue("val", "val");

        expect(out).toStrictEqual(undefined);
    });

    it("Appends an array with current value", () => {
        const out = toggleOrSetValue("new val", ["val"]);

        expect(out).toStrictEqual(["val", "new val"]);
    });

    it("Removes current value from an array containing current value", () => {
        const out = toggleOrSetValue("new val", ["val", "new val"]);

        expect(out).toStrictEqual(["val"]);
    });

    it("Removing current value from array is case insensitive", () => {
        const out = toggleOrSetValue("New Val", ["val", "new val"]);

        expect(out).toStrictEqual(["val"]);
    });
});
