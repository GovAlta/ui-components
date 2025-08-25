function extractDataProps(
  props: Record<string, any>,
  prefix: string
): [Record<string, any>, Record<string, any>] {
  const dataProps: Record<string, any> = {};
  const otherProps: Record<string, any> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith(prefix)) {
      dataProps[key] = value;
    } else {
      otherProps[key] = value;
    }
  });

  return [dataProps, otherProps];
}

export interface DataGridProps {
  [key: `data-grid${string}`]: string | boolean | undefined;
}

/**
 * Hook to extract data-grid specific props from a props object.
 *
 * @param props - The props object to extract data-grid props from
 * @returns A tuple containing [dataGridProps, otherProps] where dataGridProps
 *          contains all props starting with 'data-grid' and otherProps contains the rest
 *
 * @example
 * const [dataGridProps, otherProps] = useDataGridProps({
 *   'data-grid': 'row',
 *   onClick: handleClick
 * });
 * // dataGridProps: { 'data-grid': 'row' }
 * // otherProps: { onClick: handleClick }
 */
export function useDataGridProps(props: Record<string, any>) {
  return extractDataProps(props, 'data-grid');
}

