import { HTMLAttributes, ReactElement } from "react";

export interface TextProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactElement | string
}