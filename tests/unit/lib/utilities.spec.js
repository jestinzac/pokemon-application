import * as utilities from "@/lib/utilities";

describe("utilities", () => {
  describe("isURL", () => {
    it("should return false if the parameter is undefined or empty", () => {
      expect(utilities.isURL(undefined)).toBe(false);
    });
    it("should return true if the string is a valid url pattern", () => {
      expect(utilities.isURL("https://pokemon.api")).toBe(true);
    });
  });
});
