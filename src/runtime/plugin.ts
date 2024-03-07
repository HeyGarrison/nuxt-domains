import { defineNuxtPlugin, useRequestURL } from "#app";
import { useDomain } from "./composables/useDomain";

export default defineNuxtPlugin(nuxtApp => {
  const url = useRequestURL();

});
