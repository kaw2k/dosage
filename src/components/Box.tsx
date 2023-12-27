import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

type BoxProps = PropsWithChildren<{
  p?: number;
  border?: boolean;
}>;

export const Box: FC<BoxProps> = ({ children, p = 8, border }) => (
  <>
    <div className={clsx("box", { border })}>{children}</div>

    <style jsx>{`
      .box {
        ${!!p && `padding: ${p}px;`}
      }

      .border {
        border: 1px solid #222;
        border-radius: 4px;
      }
    `}</style>
  </>
);
