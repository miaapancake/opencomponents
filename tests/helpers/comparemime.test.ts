import { compareMime } from "../../src/components/helpers";

describe("CompareMime Function", () => {
    it("Validates correct mimetypes", () => {
        expect(compareMime("image/png", "image/png")).toEqual(true);
        expect(compareMime("image/jpg", "image/jpg")).toEqual(true);
        expect(compareMime("image/*", "image/png")).toEqual(true);
        expect(compareMime("image/*", "image/jpg")).toEqual(true);
        expect(compareMime("audio/mpeg", "audio/mpeg")).toEqual(true);
        expect(compareMime("audio/*", "audio/mpeg")).toEqual(true);
    });

    it("Rejects incorrect mimetypes", () => {
        expect(compareMime("image/png", "image/jpg")).toEqual(false);
        expect(compareMime("image/jpg", "image/png")).toEqual(false);
        expect(compareMime("image/png", "image/*")).toEqual(false);
    });
});
