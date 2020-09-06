import React, { useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";
import { TextInput, Button, Caption } from "react-native-paper";

import { addNote } from "../../source/store/actions";

const AppIndex = ({ profile, navigation, addNote }) => {
  const { height, width } = profile;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView style={{ paddingHorizontal: 10, width }}>
      <View>
        <Caption>Title</Caption>
        <TextInput maxLength={30} label="Title" mode="outlined" value={title} onChangeText={(title) => setTitle(title)} />

        <Caption>Body</Caption>
        <TextInput
          label="Body"
          mode="outlined"
          multiline={true}
          numberOfLines={35}
          style={{ maxHeight: height - 300 }}
          value={body}
          onChangeText={(body) => setBody(body)}
        />
      </View>

      <View>
        <Button
          mode="contained"
          loading={loading}
          labelStyle={{ color: "#fff" }}
          disabled={!body}
          style={{
            marginVertical: 30,
          }}
          onPress={() => {
            setLoading(true);
            addNote({ title, body });
            setLoading(false);
            navigation.navigate("Home", { notesUpdated: `Note Updated, pls refresh @ ${Math.random() * 1000} ` });
          }}>
          Next
        </Button>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
    profile: state.profile,
  }),
  mapDispatchToProps = { addNote };

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
