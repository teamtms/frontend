import { HTMLAttributes, ReactNode } from "react";

export interface TextProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}