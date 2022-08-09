import { modulo } from "../../src/components/helpers";

describe("Modulo", () => {
    it("Properly handles negative values", () => {
        expect(modulo(-8, 4)).toStrictEqual(0);
        expect(modulo(-150, 4)).toStrictEqual(2);
    });

    it("Properly handles positive values", () => {
        expect(modulo(8, 4)).toStrictEqual(0);
        expect(modulo(150, 4)).toStrictEqual(2);
    });
});
