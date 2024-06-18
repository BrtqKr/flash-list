/** *
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

export interface BidirectionalListState {
  // This property is used but eslint fails to find its usage.
  /* eslint-disable react/no-unused-prop-types */
  elems: any[];
}

/** *
 * To test out just copy this component and render in you root component
 */
export default class BidirectionalList extends React.Component<BidirectionalListState> {
  state: BidirectionalListState = this.getInitialState();

  private getInitialState() {
    return { elems: this._generateArray(40, 60) } as BidirectionalListState;
  }

  private _generateArray(start: number, size: number, isPrepend = false) {
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
      arr[i] = isPrepend ? start - i : start + i;
    }
    return isPrepend ? arr.reverse() : arr;
  }

  render() {
    return (
      <FlashList
        keyExtractor={(item: number) => {
          return item.toString();
        }}
        renderItem={({ item }: { item: number }) => {
          const backgroundColor = item % 2 === 0 ? "#00a1f1" : "#ffbb00";
          return (
            <View style={{ ...styles.container, backgroundColor }}>
              <Text>Cell Id: {item}</Text>
            </View>
          );
        }}
        estimatedItemSize={100}
        onEndReached={() => {
          console.warn("END REACHED");
          // Since FlatList is a pure component, data reference should change for a render
          const elems = [...this.state.elems];
          elems.push(...this._generateArray(elems.length, 20));
          this.setState(() => {
            return { elems };
          });
        }}
        initialScrollIndex={9}
        estimatedFirstItemOffset={900}
        onEndReachedThreshold={0.2}
        data={this.state.elems}
        inverted
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 120,
    backgroundColor: "#00a1f1",
  },
});
