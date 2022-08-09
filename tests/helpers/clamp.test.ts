import { clamp } from "../../src/components/helpers";

describe("Clamp Function", () => {
    it("Keeps value below or at max", () => {
        expect(clamp(80, 0, 60)).toStrictEqual(60);
    });

    it("Keeps value above or at min", () => {
        expect(clamp(-40, 0, 60)).toStrictEqual(0);
    });
});
