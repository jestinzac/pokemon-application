import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

import Pagination from "@/components/Pagination";

describe("Pagination", () => {
  let store = {
    state: {
      userAction: {
        pagination: {
          perPageCount: 20,
          page: 1,
        },
      },
    },
    actions: {
      getPaginatedPokemonData: jest.fn(),
    },
    mutations: {
      setPerPageCount: jest.fn(),
      setPageAndOffset: jest.fn(),
    },
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the page offset and trigger API calls for respective set of data", () => {
    const wrapper = shallowMount(Pagination, {
      stubs: {
        RouterView: true,
      },
      store: new Vuex.Store(store),
      localVue,
    });
    wrapper.vm.paginate("p");
    expect(store.mutations.setPageAndOffset).toHaveBeenCalledTimes(1);
    expect(store.mutations.setPageAndOffset).toHaveBeenCalledWith(
      expect.any(Object),
      "p"
    );
    expect(store.actions.getPaginatedPokemonData).toHaveBeenCalledTimes(1);
    expect(store.actions.getPaginatedPokemonData).toHaveBeenCalledWith(
      expect.any(Object),
      true
    );
  });

  it("should update the per page count and trigger corresponding API to get new results", () => {
    global.target = {
      value: 50,
    };
    const wrapper = shallowMount(Pagination, {
      stubs: {
        RouterView: true,
      },
      store: new Vuex.Store(store),
      localVue,
    });
    wrapper.vm.onChangeEvent(global);
    expect(store.mutations.setPerPageCount).toHaveBeenCalledTimes(1);
    expect(store.mutations.setPerPageCount).toHaveBeenCalledWith(
      expect.any(Object),
      50
    );
    expect(store.actions.getPaginatedPokemonData).toHaveBeenCalledTimes(1);
    expect(store.actions.getPaginatedPokemonData).toHaveBeenCalledWith(
      expect.any(Object),
      true
    );
  });
});
