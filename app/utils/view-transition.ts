type TransitionEntry = [HTMLElement, string];

export async function setTemporaryViewTransitionNames(
  entries: TransitionEntry[],
  vtPromise: Promise<unknown>
): Promise<void> {
  for (const [$el, name] of entries) {
    $el.style.viewTransitionName = name;
  }

  await vtPromise;

  for (const [$el] of entries) {
    $el.style.viewTransitionName = "";
  }
}
