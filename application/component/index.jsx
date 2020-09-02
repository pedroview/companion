import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";

import theme from "../source/theme";
import { store } from "../source/store";
import { persistUser } from "../source/store/actions";
import ScreenNavigator from "../source/navigator";
import { StatusBar } from "react-native";

export default () => {
  useEffect(() => {
    store.dispatch(persistUser());
  }, []);

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor="rgb(255, 150, 40)" />
        <ScreenNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
};
