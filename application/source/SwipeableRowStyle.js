import React, { Component } from "react";
import { RectButton } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Animated, StyleSheet, View, I18nManager } from "react-native";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class SwipeableRowStyle extends Component {
  renderLeftActions = (progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [192, 0],
    });
    const pressHandler = async () => {
      this.close();
      const { dateCreated, _id, deleteNote, navigation } = this.props;
      await deleteNote({ _id, dateCreated });
      navigation.push("Home", { notesUpdated: `Note Updated, pls refresh @ ${Math.random() * 100}` });
    };
    return (
      <View style={{ width: 192, flexDirection: I18nManager.isRTL ? "row-reverse" : "row" }}>
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <RectButton style={[styles.rightAction, { backgroundColor: "#dd2c00" }]} onPress={pressHandler}>
            <AnimatedIcon name="delete-forever" size={40} color="#fff" />
          </RectButton>
        </Animated.View>
      </View>
    );
  };
  renderRightActions = (progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [192, 0],
    });
    const pressHandler = async () => {
      this.close();
      const { dateCreated, _id, navigation, priority, editPriority } = this.props;
      const newPriority = priority === "moderate" ? "very important" : "moderate";
      await editPriority({ _id, dateCreated, priority: newPriority });
      navigation.push("Home", { notesUpdated: `Note Updated, pls refresh @ ${Math.random() * 100}` });
    };
    return (
      <View style={{ width: 192, flexDirection: I18nManager.isRTL ? "row-reverse" : "row" }}>
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <RectButton style={[styles.rightAction, { backgroundColor: "#388e3c" }]} onPress={pressHandler}>
            <AnimatedIcon name="archive" size={40} color="#fff" />
          </RectButton>
        </Animated.View>
      </View>
    );
  };

  updateRef = (ref) => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  render() {
    const { children, lastUpdate, _id } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    justifyContent: "center",
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
