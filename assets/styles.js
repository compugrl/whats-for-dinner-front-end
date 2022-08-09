import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: "#368F8B",
    backgroundColor: "#246A73",
    borderWidth: 2,
    borderRadius: 10,
    width: 450,
    alignSelf: "center",
    margin: 20,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    fontSize: 20,
    paddingTop: 30,
  },
  login: {
    flex: 0.75,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#246A73",
    width: 500,
    margin: 20,
    padding: 5,
  },
  input: {
    flex: 0.25,
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    color: "#246A73",
    width: 400,
    height: 25,
    margin: 10,
  },
  img: {
    alignSelf: "center",
    width: 150,
    height: 150,
    margin: 20,
  },
  completed: {
    textDecorationLine: "line-through",
  },
  incomplete: {
    textDecorationLine: "none",
  },
});
