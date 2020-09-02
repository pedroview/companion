import React, { useState } from "react";
import { connect } from "react-redux";
import { TextInput, Headline, Button } from "react-native-paper";
import { StyleSheet, View, Image, TouchableHighlight } from "react-native";

import { sleep } from "../../source/commonFunc";
import { createUser } from "../../source/store/actions";

const AppIndex = ({ profile, createUser }) => {
  const { width } = profile;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const nameCompanion = async () => {
    setLoading(true);
    await sleep(2);
    const handle = !name ? "Companion" : name.toString();
    createUser({ handle });
    setLoading(false);
  };

  return (
    <View style={{ ...styles.welcome, width: width - 20 }}>
      <View style={styles.welcomeImage}>
        <TouchableHighlight>
          <Image
            source={require("../../assets/image/logo.png")}
            resizeMode="stretch"
            style={{
              maxWidth: width - 20,
            }}
          />
        </TouchableHighlight>
      </View>
      <View style={styles.subWelcome}>
        <Headline style={{ color: "rgb(255, 150, 40)", textAlign: "center" }}>
          Your companion do not have a name yet. Do you mind naming me?
        </Headline>
        <TextInput label="Companion Name" mode="outlined" value={name} onChangeText={(name) => setName(name)} />
        <Button mode="contained" loading={loading} labelStyle={{ color: "#fff" }} onPress={nameCompanion}>
          {!name ? "skip" : "Next"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
  },
  welcomeImage: {
    flex: 1,
    justifyContent: "center",
  },
  subWelcome: {
    flex: 0.5,
  },
});

const mapStateToProps = (state) => ({
    profile: state.profile,
  }),
  mapDispatchToProps = { createUser };

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
