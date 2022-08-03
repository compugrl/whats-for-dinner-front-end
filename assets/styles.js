import { StyleSheet } from "react-native";

export const styles = Stylesheet.create({
  buttonStyle: {
    borderColor: "#C2DED1",
    backgroundColor: "#354259",
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
  },
  login: {
    flex: 0.75,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#354259",
    width: 500,
    margin: 20,
    padding: 5,
  },
  uName: {
    flex: 0.25,
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    color: "#354259",
    width: 400,
    height: 25,
    margin: 10,
  },
  pWord: {
    flex: 0.25,
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    color: "#354259",
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
});
