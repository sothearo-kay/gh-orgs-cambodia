import type { DirectiveBinding } from "vue";

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const tooltip = useTooltip();

    el.addEventListener("mouseenter", (e: MouseEvent) => {
      tooltip.show(binding.value, e);
    });

    el.addEventListener("mouseleave", () => {
      tooltip.hide();
    });
  }
};
