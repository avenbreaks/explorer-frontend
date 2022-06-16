import * as React from 'react';
import { memo, SVGProps } from 'react';

/**
 * @param props - SVG props.
 */
const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="6" width="10" height="2" rx="1" transform="rotate(-180 10 6)" fill="#808A9D"/>
    <rect x="4" y="10" width="10" height="2" rx="1" transform="rotate(-90 4 10)" fill="#808A9D"/>
  </svg>
);

const Memo = memo(Plus);
export default Memo;
