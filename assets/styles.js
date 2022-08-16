import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";

export const styles = StyleSheet.create({
  addView: {
    flex: 0.5,
    padding: 10,
    margin: 10,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#160F29",
    color: "#246A73",
    width: 400,
  },
  alist: {
    flex: 0.2,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#246A73",
    width: "80%",
  },
  bar: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  button: {
    borderColor: "#160F29",
    borderWidth: 2,
    borderRadius: 10,
    width: "85%",
    height: 35,
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
    width: 400,
  },
  faveButton: {
    borderColor: "#160F29",
    backgroundColor: "whitesmoke",
    borderWidth: 2,
    borderRadius: 10,
    width: "85%",
    height: 35,
    alignSelf: "center",
    margin: 20,
  },
  faveLabel: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 20,
    margin: 5,
    width: "85%",
    color: "#F3DFC1",
  },
  filter: {
    backgroundColor: "#F3DFC1",
    color: "#160F29",
    fontSize: 20,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    width: 400,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#160F29",
    borderWidth: 2,
  },
  flist: {
    flex: 1,
    justifyContent: "space-around",
    alignContent: "space-around",
    alignItems: "flex-start",
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
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    textAlign: "center",
    color: "#246A73",
    width: "80%",
    height: 40,
    margin: 10,
    fontSize: 25,
  },
  item: {
    backgroundColor: "#246A73",
    color: "#F3DFC1",
    fontSize: 20,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    width: 400,
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  itemList: {
    flex: 1,
    justifyContent: "space-around",
    alignContent: "flex-start",
    width: "90%",
  },
  label: {
    textAlignVertical: "top",
    textAlign: "left",
    fontSize: 20,
    margin: 10,
    width: 175,
    textAlign: "center",
    color: "#F3DFC1",
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
    color: "#F3DFC1",
  },
  recipeScr: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
  },
  rList: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    margin: 2,
  },
  separator: {
    marginVertical: 10,
    width: "100%",
    alignSelf: "center",
    borderBottomColor: "#246A73",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  shopButton: {
    borderColor: "#160F29",
    backgroundColor: "whitesmoke",
    borderWidth: 2,
    borderRadius: 10,
    width: "85%",
    height: 35,
    alignItems: "center",
    alignSelf: "center",
    margin: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "#160F29",
  },
});
