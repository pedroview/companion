import { connect } from "react-redux";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { List, IconButton, Text, Title } from "react-native-paper";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";

import { getNotes } from "../../source/store/actions";

const AppIndex = (props) => {
  const { profile, navigation, getNotes } = props;
  const { width } = profile;
  const [notes, setNotes] = useState([]);
  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) setNotes(props.notes);
    return () => (mounted = false);
  }, [props.notes]);

  // const onSwipeLeft = () => console.log(notes);
  // const onSwipeRight = () => console.log(notes);
  // const config = {
  //   velocityThreshold: 0.3,
  //   directionalOffsetThreshold: 80,
  // };

  const notesList = (notes, filter = "moderate") => {
    if (!notes || (notes && notes.length <= 0)) return [];
    notes = notes.filter((x) => x.priority === filter);
    if (notes.length <= 0) return [];
    const newNotes = () => {
      notes = notes
        .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
        .map((x, index) => {
          const { title, body, _id, lastUpdated } = x;
          console.log("DFgfdwwwa");
          return <List.Item title={title} />;
          //               return "hey";
          //               // return (
          //               //   // <GestureRecognizer onSwipeLeft={() => onSwipeLeft} onSwipeRight={() => onSwipeRight} config={config}>
          //               //   //   <TouchableHighlight
          //               //   //     key={index}
          //               //   //     underlayColor="rgb(255, 150, 40)"
          //               //   //     //  onPress={() => navigation.navigate("Edit Note", { note: x })}
          //               //   //     onLongPress={() => console.log("long presses", x)}
          //               //   //     style={{
          //               //   //       backgroundColor: "rgb(250, 255, 250)",
          //               //   //       marginVertical: 3,
          //               //   //       borderRadius: 10,
          //               //   //       padding: 5,
          //               //   //     }}>
          //               //   //     <>
          //               //   //       <Title>{title}</Title>
          //               //   //       <Text numberOfLines={2}>{body}</Text>
          //               //   //     </>
          //               //   //   </TouchableHighlight>
          //               //   // </GestureRecognizer>
        });
    };
    return newNotes();
  };

  const moderateList = notesList(notes, "moderate");
  console.log(moderateList);
  //  notesList("very important");
  // const pettyList = notesList("petty");

  return (
    <View style={{ flex: 1, width }}>
      <List.Section>
        <List.Accordion
          title="Very Important"
          titleStyle={{ color: "rgb(0, 0, 65)" }}
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded1}
          onPress={() => setExpanded1(!expanded1)}>
          {/* {notesList("very important")} */}
        </List.Accordion>
        {/* <List.Accordion
          title="Moderate"
          titleStyle={{ color: "rgb(255, 150, 40)" }}
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded2}
          onPress={() => setExpanded2(!expanded2)}>
          {moderateList}
          <List.Item title="Last" />
        </List.Accordion>
        <List.Accordion
          title="Petty Notes"
          titleStyle={{ color: "green" }}
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded3}
          onPress={() => setExpanded3(!expanded3)}>
          {pettyList}
        </List.Accordion> */}
      </List.Section>

      <IconButton
        style={{ position: "absolute", bottom: 5, right: 5 }}
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

const mapStateToProps = (state) => ({
    profile: state.profile,
    notes: state.note.docs,
  }),
  mapDispatchToProps = { getNotes };

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
