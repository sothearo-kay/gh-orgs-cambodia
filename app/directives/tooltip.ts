import type { DirectiveBinding } from "vue";

interface TooltipHTMLElement extends HTMLElement {
  _tooltipCleanup?: () => void;
}

export default {
  mounted(el: TooltipHTMLElement, binding: DirectiveBinding) {
    const tooltip = useTooltip();

    const showTooltip = (e: MouseEvent) => {
      tooltip.show(binding.value, e);
    };

    const hideTooltip = () => {
      tooltip.hide();
    };

    el.addEventListener("mouseenter", showTooltip);
    el.addEventListener("mouseleave", hideTooltip);
    el.addEventListener("click", hideTooltip);

    // Close tooltip on scroll
    const onScroll = () => tooltip.hide();
    window.addEventListener("scroll", onScroll, { passive: true });

    el._tooltipCleanup = () => {
      el.removeEventListener("mouseenter", showTooltip);
      el.removeEventListener("mouseleave", hideTooltip);
      el.removeEventListener("click", hideTooltip);
      window.removeEventListener("scroll", onScroll, true);
    };
  },

  unmounted(el: TooltipHTMLElement) {
    el._tooltipCleanup?.();
  }
};
