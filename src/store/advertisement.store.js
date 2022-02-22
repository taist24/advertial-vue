import axios from "axios";

const { defineStore } = require("pinia");

export default defineStore("advertisement", {
  state: () => ({
    showMoreFilter: false,
    filters: {
      search: {
        name: "search",
        elementId: "search",
        placeholder: "Search by Keyword",
        item: {},
        items: [],
      },
      type_of_ad: {
        name: "type_of_ad",
        elementId: "type-of-ad",
        placeholder: "Type of Ad",
        item: {},
        items: [],
      },
      sub_industry: {
        name: "sub_industry",
        elementId: "sub-industry",
        placeholder: "Niche/Sub-niche",
        item: {},
        items: [],
      },
      format: {
        name: "format",
        elementId: "format",
        placeholder: "Format",
        item: {},
        items: [],
      },
      objective: {
        name: "objective",
        elementId: "objective",
        placeholder: "Objective",
        item: {},
        items: [],
      },
      analysis: {
        name: "analysis",
        elementId: "analysis",
        placeholder: "Analysis",
        item: {},
        items: [],
      },
      platform: {
        name: "platform",
        elementId: "platform",
        placeholder: "Platform",
        item: {},
        items: [],
      },
      language: {
        name: "language",
        elementId: "language",
        placeholder: "Language",
        item: {},
        items: [],
      },
      other: {
        name: "other",
        elementId: "other",
        placeholder: "Other",
        item: {},
        items: [],
      },
      sort_by: {
        name: "sort_by",
        elementId: "sort-by",
        placeholder: "Sort By",
        item: {},
        items: [],
      },
    },
  }),
  actions: {
    async fillFilters() {
      const {
        data: { data: typeOfAds },
      } = await axios.get("/types");
      this.filters.type_of_ad.items = typeOfAds;

      const {
        data: { data: subIndustries },
      } = await axios.get("/sub-industries");
      this.filters.sub_industry.items = subIndustries;

      const {
        data: { data: filters },
      } = await axios.get("/advertisements/filters");

      this.filters.format.items = filters.formats;
      this.filters.objective.items = filters.objectives;
      this.filters.platform.items = filters.platforms;
      this.filters.language.items = filters.languages;
      this.filters.analysis.items = filters.analysis;
      this.filters.other.items = filters.other;
      this.filters.sort_by.items = filters.sort_by;
    },

    setDropdownSelectedItem(key, item) {
      this.filters[key].item = item;
    },
  },
});
