import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, FlatList, StyleSheet } from "react-native";
// import 'react-native-gesture-handler';
import {
  Appbar,
  Button,
  Divider,
  PaperProvider,
  TextInput,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import Todo from "./todo";
const Todos = () => {
  const ref = firestore().collection("todos");
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo("");
  }

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      setTodos(list);
      if (loading) {
        setLoading(false);
      }
    });
  });
  if (loading) {
    return null;
  }

  const Divider = () => {
    return <View style={styles.divider} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{ backgroundColor: "blue" }}>
        <Appbar.Content
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          title={"TODOs List"}
        />
      </Appbar>
      
      <FlatList
        style={{
          flex: 1,
          backgroundColor: "#f0f8ff",
          padding: 10,
          paddingTop: 20,
        }}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item} />}
        ItemSeparatorComponent={Divider}
      />
      <TextInput
        label={"New Todo"}
        value={todo}
        onChangeText={(text) => setTodo(text)}
      />
      <Button
        icon="plus"
        onPress={addTodo}
        textColor="#000"
        style={{ borderRadius: 0, backgroundColor: "blue", borderWidth: 0 }}
      >
        Add TODO
      </Button>
    </View>
  );
};
export default Todos;
const styles = StyleSheet.create({
    divider: {
      height: 1,
      backgroundColor: 'grey',
    },
  });