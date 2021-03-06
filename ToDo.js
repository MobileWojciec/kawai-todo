import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { TextInput } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");
export default class ToDo extends Component {
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: ""
    };

  render() {
      const { isCompleted, isEditing, toDoValue } = this.state;
      const { text } = this.props;
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View style={[
                        styles.circle, 
                        isCompleted ? styles.completedCircle : styles.uncompletedCircle
                        ]}>
                    </View>
                </TouchableOpacity>
                {isEditing ? (
                <TextInput 
                    value={toDoValue} 
                    style={[
                        styles.input, 
                        styles.text,
                        isCompleted ? styles.completedText: styles.uncompledtedText
                    ]}
                    multiline={true}
                    />
                ) : (
                <Text 
                    style={[
                        styles.text, 
                        isCompleted ? styles.completedText: styles.uncompledtedText
                        ]}
                    >
                        { text }
                </Text>
                )}
            </View>
                {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text>✔</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ): (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}> 
                            <View style={styles.actionContainer}>
                                <Text>✏</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            
        </View>   
    );
  }
  _toggleComplete = () => {
      this.setState(prevState => {
          return {
              isCompleted: !prevState.isCompleted
          };
      })
  }
  _startEditing = () =>{
         const { text } = this.props;
         this.setState({ isEditing: true, toDoValue: text});
  }
  _finishEditing = () => {
      this.setState({
        isEditing :false
      });
  }
}

const styles = StyleSheet.create({
    container: {
        width: width- 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairLineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        fontWeight: "600",
        fontSize: 24,
        marginVertical: 20
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    column: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    unCompletedCircle: {
        borderColor: '#f23657'
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    actions: {
        flexDirection: 'row',
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
    actionText: {
        fontSize: 32
    },
    input: {
        marginVertical: 15,
        width: width / 2
    }
});
