import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, ImageBackground } from "react-native";

const AppIndex = ({ profile }) => {
  const { width } = profile;

  return (
    <ImageBackground
      source={require("../../assets/image/logo.png")}
      resizeMode="contain"
      style={{
        ...styles.welcome,
        width,
      }}>
      <Text style={{ color: "rgb(150, 250, 255)", fontSize: 25, marginBottom: -20 }}>my</Text>
      <Text style={{ color: "rgb(255, 150, 40)", fontSize: 50, marginBottom: 100 }}>COmpaniON</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    backgroundColor: "rgb(0, 0, 65)",
    alignItems: "center",
    justifyContent: "flex-end",
    borderColor: "black",
    borderBottomWidth: 20,
  },
});

const mapStateToProps = (state) => ({
    profile: state.profile,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
