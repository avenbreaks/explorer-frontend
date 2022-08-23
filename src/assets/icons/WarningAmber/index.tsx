import * as React from 'react';
import { SVGProps, memo } from 'react';

const WarningAmber = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={24}
    height={24}
    fill="#FF6060"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5.99 19.53 19H4.47L12 5.99ZM2.74 18c-.77 1.33.19 3 1.73 3h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18ZM11 11v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1Zm0 5h2v2h-2v-2Z"
      fill="#fff"
    />
  </svg>
);

const Memo = memo(WarningAmber);
export default Memo;
