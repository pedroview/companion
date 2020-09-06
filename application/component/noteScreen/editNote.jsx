import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Caption } from "react-native-paper";

import { editNote, deleteNote } from "../../source/store/actions";
import { sleep } from "../../source/commonFunc";

const AppIndex = ({ profile, route, navigation, editNote, deleteNote }) => {
  const { width } = profile;
  const note = route.params.note;
  const { _id, body, dateCreated, title } = note || [];

  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  return (
    <View style={{ ...styles.note, width }}>
      <View>
        <Caption>Title</Caption>
        <TextInput maxLength={30} label="Title" mode="outlined" value={newTitle} onChangeText={(title) => setNewTitle(title)} />
        <Caption>Body</Caption>
        <TextInput
          label="Body"
          mode="outlined"
          multiline={true}
          numberOfLines={20}
          value={newBody}
          onChangeText={(body) => setNewBody(body)}
        />
      </View>
      <View style={styles.button}>
        <Button
          mode="contained"
          loading={deleting}
          color="#f33"
          labelStyle={{ color: "#fff" }}
          disabled={!body}
          onPress={async () => {
            setDeleting(true);
            await deleteNote({ _id, dateCreated });
            await sleep(0.3);
            setDeleting(false);
            navigation.push("Home", { notesUpdated: `Note Updated, pls refresh @ ${Math.random() * 100}` });
          }}>
          delete
        </Button>
        <Button
          mode="contained"
          loading={updating}
          labelStyle={{ color: "#fff" }}
          disabled={!body}
          onPress={async () => {
            setUpdating(true);
            await editNote({ newTitle, newBody, _id, dateCreated });
            await sleep(0.3);
            setUpdating(false);
            navigation.navigate("Home", { notesUpdated: `Note Updated, pls refresh @ ${Math.random() * 100} ` });
          }}>
          save
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
  button: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const mapStateToProps = (state) => ({
    profile: state.profile,
  }),
  mapDispatchToProps = {
    editNote,
    deleteNote,
  };

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
