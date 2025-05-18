export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("transition-link", {
    mounted(el, binding) {
      el.addEventListener("click", async (_event: MouseEvent) => {
        const avatar = el.querySelector("img") as HTMLElement | null;
        if (!avatar) return;

        const router = useRouter();
        const href = binding.value;
        if (!href) return;

        if ("startViewTransition" in document) {
          const transition = document.startViewTransition(() => {
            router.push(href);
          });

          setTemporaryViewTransitionNames([[avatar, "avatar"]], transition.finished);
        } else {
          router.push(href);
        }
      });
    }
  });
});
