import { useLocation, useNavigate } from "react-router";
import { DetailsPanes, MainPanes } from "../types/navigation.types";
import { AnyStringObject } from "../types/general.types";

export type AppNavigateState = {
  mainPane: MainPanes;
  detailsPane: undefined | DetailsPanes;

  /* extra navigation data, mainly entity ids */
  [extra: string]: unknown;
};

type NavigationData = {
  mainPane: MainPanes;
  detailsPane: undefined | DetailsPanes;
};

export const useAppNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationState = location.state;

  const navigationData: NavigationData = {
    mainPane: navigationState?.mainPane,
    detailsPane: navigationState?.detailsPane,
  };

  const extractExtraData = (): AnyStringObject => {
    const extraData: AnyStringObject = {};

    for (const key in navigationState) {
      if (key !== "mainPane" && key !== "detailsPane")
        extraData[key] = navigationState[key];
    }

    return extraData;
  };

  const extraData = extractExtraData();

  const setNavigationState = (
    mainPane: MainPanes | "keep",
    detailsPane?: DetailsPanes | "keep",
    extra: AnyStringObject = {}
  ): AppNavigateState => {
    const newMainPane =
      mainPane === "keep" ? navigationData.mainPane : mainPane;
    const newDetailsPane =
      detailsPane === "keep" ? navigationData.detailsPane : detailsPane;

    const newNavigationState = {
      mainPane: newMainPane,
      detailsPane: newDetailsPane,
      ...extra,
    };
    return newNavigationState;
  };

  const appNavigate = (url: string, state?: AppNavigateState): void => {
    navigate(url, { state });
  };

  return {
    location,
    navigationData,
    extraData,
    appNavigate,
    setNavigationState,
  };
};
