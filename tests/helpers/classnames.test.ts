import { classNames } from "../../src/components/helpers";

describe("ClassNames Function", () => {
    it("Handles concatination properly", () => {
        expect(classNames("accordion", "selected", "purple")).toStrictEqual(
            "accordion selected purple"
        );
    });

    it("Handles undefined classnames properly", () => {
        expect(classNames("accordion", undefined, "purple")).toStrictEqual("accordion purple");
    });

    it("Handles falsey classnames properly", () => {
        expect(classNames("accordion", false && "selected", "purple")).toStrictEqual(
            "accordion purple"
        );
    });

    it("Handles truthy classnames properly", () => {
        expect(classNames("accordion", true && "selected", "purple")).toStrictEqual(
            "accordion selected purple"
        );
    });
});
