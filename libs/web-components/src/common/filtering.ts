export type FilterOption = {
  label: string;
  value: string;
  filter: string;
};

// Match against the filter text and the text the user sees, which is the
// label, or the value when no label is set. Both are searched so that adding
// a filter supplies extra search terms rather than replacing the visible text.
export function isFilterMatch(
  option: FilterOption,
  filter: string,
  partialMatch = true,
) {
  // empty string matches all
  if (filter.length === 0) return true;

  const targets = [option.filter, option.label || option.value].filter(
    (target) => target !== "",
  );
  filter = filter.toLowerCase().trim();

  return targets.some((target) => {
    const value = target.toLowerCase();

    if (!partialMatch) {
      return value === filter;
    }

    return value.startsWith(filter) || value.includes(" " + filter);
  });
}
