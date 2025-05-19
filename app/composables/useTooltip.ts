const visible = ref(false);
const text = ref("");
const position = reactive({
  x: 0,
  y: 0
});

export const useTooltip = () => {
  const show = (content: string, event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    // center X of the element
    position.x = rect.left + rect.width / 2 + window.scrollX;

    // place Y slightly above the element
    position.y = rect.top + window.scrollY - 30; // you can tweak `-30`

    text.value = content;
    visible.value = true;
  };

  const hide = () => {
    visible.value = false;
  };

  return { visible, text, position, show, hide };
};
