import Vue from "vue";
import Vuex from "vuex";
import { constants } from "@/lib/CONSTANTS.js";
import { isURL } from "@/lib/utilities.js";

Vue.use(Vuex);

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export default new Vuex.Store({
  namespaced: true,
  state: {
    data: [],
    dataError: null,
    isLoading: false,
    userAction: {
      filterByName: "",
      filterByAabilities: "",
      sortBy: "name",
      pagination: {
        page: 1,
        perPageCount: 20,
        offset: 0,
      },
    },
    specificDataDetails: [],
    specificDataError: null,
  },
  mutations: {
    setData(state, data) {
      if (data.isDetail) {
        state.specificDataDetails.push(data.finalData);
      } else {
        state.data.push(data.finalData);
      }
    },
    setLoader(state, status) {
      state.isLoading = status;
    },
    setErrorState(state, param) {
      state[`${param.type}Error`] = param.error
        ? "hasError" in param.error
          ? param.error
          : {
            hasError: true,
            status: param.error.status,
            message: param.error.message,
          }
        : null;
    },
    setPerPageCount(state, value) {
      state.userAction.pagination.perPageCount = value;
    },
    clearData(state, type = "") {
      if (type == "detail") {
        state.specificDataDetails.length = 0;
      } else {
        state.data.length = 0;
      }
    },
    setPageAndOffset(state, type) {
      if (type === "n") {
        state.userAction.pagination.page += 1;
        state.userAction.pagination.offset += parseInt(
          state.userAction.pagination.perPageCount
        );
      }
      if (type === "p" && state.userAction.pagination.page > 1) {
        state.userAction.pagination.page -= 1;
        state.userAction.pagination.offset -= parseInt(
          state.userAction.pagination.perPageCount
        );
      }
    },
  },
  actions: {
    async getPaginatedPokemonData(
      { state, commit, dispatch },
      resetDataSet = false
    ) {
      if (resetDataSet) {
        commit("clearData");
      }
      commit("setLoader", true);
      try {
        if (state.data.length === 0) {
          //await sleep(5000); //checking loader placeholder
          const response = await fetch(
            `${constants.API.pokemon}?limit=${state.userAction.pagination.perPageCount}&offset=${state.userAction.pagination.offset}`
          );
          const parsedResponse = await response.json();
          parsedResponse.results.forEach((pokemon) => {
            dispatch("getPokemonDetailData", { pokemon, isDetailPage: false });
          });
          commit("setErrorState", {
            type: "data",
            error: "",
          });
        }
        commit("setLoader", false);
      } catch (e) {
        commit("setErrorState", {
          type: "data",
          error: e,
        });
        commit("setLoader", false);
      }
    },

    async getPokemonDetailData({ commit }, params) {
      let status = "",
        finalData = "",
        isDetail = false,
        errorType = "data";
      if (params.isDetailPage) {
        isDetail = true;
        errorType = "specificData";
      }
      try {
        const param = isURL(params.pokemon.url)
          ? params.pokemon.url
          : `${constants.API.pokemon}/${params.pokemon}`;
        const response = await fetch(param);
        status = response.status;
        const parsedResponse = await response.json();
        const { weight, height, sprites, abilities, id, order } =
          parsedResponse;
        finalData = {
          ...params.pokemon,
          id,
          order,
          details: { weight, height, sprites, abilities },
        };
        commit("setData", { finalData, isDetail });
        commit("setErrorState", {
          type: errorType,
          error: "",
        });
      } catch (e) {
        commit("setErrorState", {
          type: errorType,
          error: { hasError: true, status },
        });
      }
    },
  },
  modules: {},
});
