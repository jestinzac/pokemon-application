import { mutations, actions } from "@/store/index.js";

jest.mock("@/lib/utilities", () => {
  return {
    isURL: jest.fn().mockReturnValue(true),
  };
});

describe("store mutations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should exist", () => {
    expect(mutations).toBeTruthy();
  });

  it("should update the data key on page load if its not detail page", () => {
    const state = { data: [] };
    mutations.setData(state, {
      isDetail: false,
      finalData: { name: "picachu" },
    });
    expect(state.data).toStrictEqual([{ name: "picachu" }]);
  });

  it("should update respective key with API data, if user refresh the detial page", () => {
    const state = { specificDataDetails: [] };
    mutations.setData(state, {
      isDetail: true,
      finalData: { name: "picachu" },
    });
    expect(state.specificDataDetails).toStrictEqual([{ name: "picachu" }]);
  });
});

describe("store actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should exist", () => {
    expect(actions).toBeTruthy();
  });
  describe("getPokemonDetailData", () => {
    it("should reject the pokemon endpoint and throw error", async () => {
      expect.assertions(2);
      global.fetch = jest.fn(() => Promise.reject(""));
      const commit = jest.fn();
      await actions.getPokemonDetailData(
        { commit },
        { pokemon: { url: "https://www.fakeurl.com" } }
      );
      expect(commit).not.toHaveBeenCalledWith("setData", {
        finalData: expect.any(Object),
        isDetail: false,
      });
      expect(commit).toHaveBeenCalledWith("setErrorState", {
        type: "data",
        error: { hasError: true, status: "" },
      });
    });
    it("should resolve the pokemon endpoint with valid data", async () => {
      expect.assertions(2);
      global.fetch = jest.fn(() => Promise.resolve({ json: () => "" }));
      const commit = jest.fn();
      await actions.getPokemonDetailData(
        { commit },
        { pokemon: { url: "https://www.fakeurl.com" } }
      );
      expect(commit).toHaveBeenCalledWith("setData", {
        finalData: expect.any(Object),
        isDetail: false,
      });
      expect(commit).toHaveBeenCalledWith("setErrorState", {
        type: "data",
        error: "",
      });
    });

    afterEach(() => {
      // cleanup on exiting
      global.fetch.mockClear();
      delete global.fetch;
    });
  });
});
