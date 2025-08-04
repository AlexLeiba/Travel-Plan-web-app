import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const gridCvaStates = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      7: 'gap-7',
      8: 'gap-8',
      9: 'gap-9',
      10: 'gap-10',
      11: 'gap-11',
      12: 'gap-12',
    },
    wrap: {
      true: 'grid-flow-row',
      false: 'grid-flow-col',
    },
    // auto-fill -> fill the row with as many columns as possible
  },
});

type Props = {
  children: React.ReactNode;
  cols?: VariantProps<typeof gridCvaStates>['cols'];
  gap?: VariantProps<typeof gridCvaStates>['gap'];
  wrap?: boolean;
  className?: string;
};
function GridContainer({
  children,
  cols = 1,
  gap = 0,
  wrap = false,
  className,
}: Props) {
  return (
    <div className={gridCvaStates({ cols, gap, wrap, className })}>
      {children}
    </div>
  );
}

export default GridContainer;
