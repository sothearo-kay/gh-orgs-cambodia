import tooltip from "~/directives/tooltip";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("tooltip", tooltip);

  nuxtApp.hooks.hook("page:finish", () => {
    useTooltip().hide();
  });
});
