import { ComponentProps, FC } from "react";

const Input: FC<ComponentProps<"input">> = (props) => {
  return (
    <input
      className={`mt-1 w-full rounded-md bg-foreground/60 dark:bg-foreground/90 px-4 py-2 text-background transition
    duration-200 ease-in-out focus:border-none focus:outline-none focus:ring-1 focus:ring-neutral-500
    ${props.className}`}
      {...props}
    />
  );
};

export default Input;
