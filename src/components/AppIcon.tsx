import { useEffect, useState } from "react";
import BaseComponentType from "../types/components";

export default function AppIcon(
  props: { icon: string; size?: number } & BaseComponentType
) {
  const [icon, setIcon] = useState(null);

  async function getIcon() {
    const module = await import(`../assets/icons/${props.icon}.svg`);
    setIcon(module.ReactComponent);
  }

  useEffect(() => {
    getIcon();
  });
  if (!icon) {
    return (
      <div
        className={props.className || ""}
        style={{
          width: (props.size || 20) + "px",
          height: (props.size || 20) + "px",
        }}
      ></div>
    );
  }

  return (
    <div
      className={"svg-icon " + (props.className || "")}
      style={{
        width: (props.size || 20) + "px",
        height: (props.size || 20) + "px",
      }}
    >
      {icon}
    </div>
  );
}
