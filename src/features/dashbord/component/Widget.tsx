import * as React from "react";

export interface WidgetProps {
  title: string;
  children: any;
}

export default function Widget({ title, children }: WidgetProps) {
  return <div></div>;
}
