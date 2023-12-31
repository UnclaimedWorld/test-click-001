import AppLoader from "../components/AppLoader";
import BaseComponentType from "../types/components";
import { useState } from "react";

export default function useLoaderComponent() {
  const [loading, setLoading] = useState(false);

  return {
    async submitCallback(
      callback: () => Promise<any>,
      finallyCallback?: () => void
    ) {
      if (loading) return;
      try {
        setLoading(true);
        await callback();
      } catch (e) {
        console.log(e);
      } finally {
        if (finallyCallback) {
          finallyCallback();
        }
        setLoading(false);
      }
    },
    LoaderComponent: (props: BaseComponentType) => (
      <AppLoader {...props} loading={loading}>{props.children}</AppLoader>
    ),
  };
}
