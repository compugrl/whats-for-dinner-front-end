import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";

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
  completed: {
    textDecorationLine: "line-through",
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    fontSize: 20,
    marginTop: StatusBar.currentHeight || 0,
  },
  datePicker: {
    flex: 1,
    width: 375,
  },
  icons: {
    marginLeft: 20,
  },
  img: {
    width: 100,
    height: 100,
    margin: 20,
    resizeMode: "contain",
  },
  incomplete: {
    textDecorationLine: "none",
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
  item: {
    padding: 5,
    marginVertical: 5,
    width: 350,
    alignSelf: "center",
  },
  label: {
    textAlignVertical: "top",
    fontSize: 20,
    marginHorizontal: 5,
    width: 175,
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
  mDate: {
    marginRight: 10,
    fontSize: 20,
  },
  recipeScr: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
  },
  rList: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    justifyContent: "flex-start",
  },
  separator: {
    marginVertical: 20,
    width: "100%",
    alignSelf: "center",
    borderBottomColor: "#246A73",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    textAlign: "left",
    fontSize: 20,
  },
  topBar: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
});
