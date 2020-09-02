import { View } from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import { sleep } from "../source/commonFunc";
import { AddScreen, EditScreen, ViewScreen } from "../component/noteScreen";
import { WelcomeScreen1, WelcomeScreen2 } from "../component/welcomeScreen";

const Stack = createStackNavigator();

const AppIndex = ({ profile }) => {
  const { companion } = profile;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      async function delay() {
        await sleep(3);
        setLoading(false);
      }
      delay();
    }
    return () => (mounted = false);
  }, []);

  const styles = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(200, 200, 200)",
    paddingTop: Constants.statusBarHeight,
  };

  const ComponentArray = [
    ["Home", ViewScreen, `${companion ? companion : "Companion"} Home`],
    ["Add Note", AddScreen, "Add Note"],
    ["Edit Note", EditScreen, "View or Edit Note"],
  ].map(([x, Y, z = companion], index) => {
    const Component = ({ navigation }) => (
      <View style={styles}>
        <Y navigation={navigation} />
      </View>
    );

    return (
      <Stack.Screen
        key={index}
        name={x}
        component={Component}
        options={{
          title: z,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "rgb(255, 150, 40)",
          },
        }}
      />
    );
  });

  return loading ? (
    <WelcomeScreen1 />
  ) : !companion ? (
    <View style={styles}>
      <WelcomeScreen2 />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>{ComponentArray}</Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
    profile: state.profile,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
