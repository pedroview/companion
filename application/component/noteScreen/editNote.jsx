import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Caption } from "react-native-paper";

import { editNote, deleteNote } from "../../source/store/actions";

const AppIndex = ({ profile, note, navigation, editNote, deleteNote }) => {
  const { width } = profile;
  // const {_id, body, priority, title}= note
  const [title, setTitle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [priority, setPriority] = useState("moderate");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const priorityList = [
    { label: "Urgent", value: "urgent" },
    { label: "Very Important", value: "very important" },
    { label: "Moderate", value: "moderate" },
    { label: "Petty", value: "petty" },
  ];

  return (
    <View style={{ ...styles.note, width }}>
      <View>
        <Caption>Title</Caption>
        <TextInput maxLength={30} label="Title" mode="outlined" value={title} onChangeText={(title) => setTitle(title)} />

        <Caption>Body</Caption>
        <TextInput
          label="Body"
          mode="outlined"
          multiline={true}
          numberOfLines={20}
          value={body}
          onChangeText={(body) => setBody(body)}
        />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Button
          mode="contained"
          loading={loading}
          labelStyle={{ color: "#fff" }}
          disabled={!body}
          onPress={() => {
            setLoading(true);
            addNote({ title, priority, body });
            setLoading(false);
            navigation.navigate("Home");
          }}>
          save
        </Button>

        <Button
          mode="contained"
          loading={loading}
          labelStyle={{ color: "#fff" }}
          disabled={!body}
          onPress={() => {
            setLoading(true);
            addNote({ title, priority, body });
            setLoading(false);
            navigation.navigate("Home");
          }}>
          delete
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
});

const mapStateToProps = (state) => ({
    profile: state.profile,
    note: state.note.doc,
  }),
  mapDispatchToProps = {
    editNote,
    deleteNote,
  };

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
