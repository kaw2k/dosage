import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

type FlexProps = PropsWithChildren<{
  gap?: number;
  component?: string;
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  direction?: "row" | "column";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  w?: string | number;
}>;

const Flex: FC<FlexProps> = ({
  children,
  direction = "row",
  gap = 0,
  justify,
  align,
  component = "div",
  wrap,
  w,
}) => {
  const Component = component as any;
  return (
    <>
      <Component className={clsx("v-stack", {})}>{children}</Component>

      <style jsx>{`
        .v-stack {
          display: flex;
          flex-direction: ${direction};
          gap: ${gap}px;
          ${!!justify ? `justify-content: ${justify};` : ""}
          ${!!align ? `align-items: ${align};` : ""}
        ${!!wrap ? `flex-wrap: ${wrap};` : ""}
        ${!!w ? `width: ${typeof w === "string" ? w : w + "px"};` : ""}
        }
      `}</style>
    </>
  );
};

type VStackProps = Omit<FlexProps, "direction">;
export const VStack: FC<VStackProps> = (props) => (
  <Flex {...props} direction="column" />
);

type HStackProps = Omit<FlexProps, "direction">;
export const HStack: FC<HStackProps> = (props) => (
  <Flex {...props} direction="row" />
);
