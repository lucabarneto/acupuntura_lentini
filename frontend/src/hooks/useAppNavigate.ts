// import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export type AppNavigateState = {
  mainPane: string;
  detailsPane?: string;

  /* extra navigation data */
  [extra: string]: unknown;
};

export const useAppNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(location.state);
  //   console.log("previous pathname: " + location.pathname);
  // }, [location]);

  const pathname = location.pathname;
  const navigationData = location.state;

  const extractMainNavigationData = (): AppNavigateState => {
    const mainNavigationData: Partial<AppNavigateState> = {};

    for (const key in navigationData) {
      if (key === "mainPane") mainNavigationData[key] = navigationData[key];
    }

    return mainNavigationData as AppNavigateState;
  };

  const mainNavigationData = extractMainNavigationData();

  const appNavigate = (url: string, state: AppNavigateState): void => {
    navigate(url, { state });
  };

  return {
    location,
    pathname,
    navigationData,
    mainNavigationData,
    appNavigate,
  };
};
