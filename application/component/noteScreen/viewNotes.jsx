import { connect } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { RectButton, FlatList } from "react-native-gesture-handler";
import { IconButton, Divider } from "react-native-paper";

import { getNotes, editPriority, deleteNote } from "../../source/store/actions";
import SwipeableRowStyle from "../../source/SwipeableRowStyle";

const AppIndex = (props) => {
  const { profile, navigation, getNotes, route, deleteNote, editPriority } = props,
    { width, height } = profile,
    [veryImportantList, setVeryImportantList] = useState([]),
    [moderateList, setModerateList] = useState([]);
  let notesRefresh = route?.params?.notesUpdated;

  const notesList = (filter, notes) => {
    notes = notes || [];
    if (notes.length <= 0) return [];
    const newNotes = notes.filter((x) => x && x.priority === filter);
    if (newNotes.length <= 0) return [];
    return newNotes.sort((x, y) => {
      if (new Date(x.lastUpdate).getTime() > new Date(y.lastUpdate).getTime()) return -1;
      if (new Date(x.lastUpdate).getTime() < new Date(y.lastUpdate).getTime()) return 1;
      if (x.title.toLowerCase() < y.title.toLowerCase()) return -1;
      if (x.title.toLowerCase() > y.title.toLowerCase()) return 1;
    });
  };

  const SwipeableRow = ({ item, index }) => {
    const { title, body, _id, dateCreated, lastUpdate, priority } = item;
    return (
      <SwipeableRowStyle
        key={index}
        _id={_id}
        dateCreated={dateCreated}
        navigation={navigation}
        priority={priority}
        deleteNote={deleteNote}
        editPriority={editPriority}>
        <RectButton style={styles.rectButton} onPress={() => navigation.navigate("Edit Note", { note: item })}>
          <Text style={styles.fromText}>{title}</Text>
          <Text numberOfLines={2} style={styles.messageText}>
            {body}
          </Text>
          <Text style={styles.dateText}>{lastUpdate}</Text>
        </RectButton>
      </SwipeableRowStyle>
    );
  };

  const setNotes = (notes) => {
    setVeryImportantList(notesList("very important", notes));
    setModerateList(notesList("moderate", notes));
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getNotes();
    }
    return () => (mounted = false);
  }, [notesRefresh]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setNotes(props.notes);
    }
    return () => (mounted = false);
  }, [props.notes]);

  return (
    <View style={{ flex: 1, width }}>
      <FlatList
        data={veryImportantList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => <SwipeableRow item={item} index={index} />}
        keyExtractor={(item, index) => `key ${index}`}
      />
      <Divider />
      <FlatList
        data={moderateList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => <SwipeableRow item={item} index={index} />}
        keyExtractor={(item, index) => `key ${index}`}
      />

      <IconButton
        style={{ position: "absolute", top: height - 250, right: 5 }}
        icon="comment-plus"
        color="rgb(255, 150, 40)"
        animated={true}
        size={80}
        onPress={() => {
          navigation.navigate("Add Note");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "white",
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  messageText: {
    color: "#999",
    backgroundColor: "transparent",
  },
  dateText: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 20,
    top: 10,
    color: "#999",
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => ({
    profile: state.profile,
    notes: state.note.docs,
  }),
  mapDispatchToProps = { getNotes, editPriority, deleteNote };

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
