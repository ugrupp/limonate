import {
  RecoilState,
  RecoilValue,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from "recoil";

// Custom hook to get an asynchronous recoil value from state
export function useLoadableValue<T>(recoilValue: RecoilValue<T>) {
  let error: Error | undefined;
  let loading = false;
  let result: T | null = null;

  const loadable = useRecoilValueLoadable(recoilValue);

  if (loadable.state === "hasValue" && !!loadable.contents) {
    result = loadable.contents;

    // Loadable is loading
  } else if (loadable.state === "loading") {
    loading = true;

    // Loadable has error
  } else if (loadable.state === "hasError") {
    error = loadable.contents;
  }

  return { error, loading, result, loadable };
}

// Custom hook to get an asynchronous recoil state value and setter
export function useLoadableState<T>(recoilState: RecoilState<T>) {
  let error: Error | undefined;
  let loading = false;
  let result: T | null = null;

  const [loadable, setterOrUpdater] = useRecoilStateLoadable(recoilState);

  if (loadable.state === "hasValue" && !!loadable.contents) {
    result = loadable.contents;

    // Loadable is loading
  } else if (loadable.state === "loading") {
    loading = true;

    // Loadable has error
  } else if (loadable.state === "hasError") {
    error = loadable.contents;
  }

  return { error, loading, result, loadable, setterOrUpdater };
}
