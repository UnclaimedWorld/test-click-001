import BaseComponentType from "../types/components";
import AppIcon from "./AppIcon";

interface AppLoaderType extends BaseComponentType {
  loading: boolean;
}

export default function AppLoader(props: AppLoaderType) {
  return (
    <div className={"relative " + props.className}>
      {props.loading && (
        <AppIcon
          className="z-1 absolute left-[50%] top-[50%] -ml-[18px] -mt-[18px] animate-spin"
          icon="loading"
          size={36}
        />
      )}
      <div
        className={props.loading ? "opacity-[0.15] pointer-events-none" : ""}
      >
        {props.children}
      </div>
    </div>
  );
}
