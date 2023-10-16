import { AsyncStorage } from "react-native";

/******************** ASYNC STORAGE **********************/
export const saveUserIdStorage = async userId => {
  try {
    await AsyncStorage.setItem("userId", userId);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveUserIdAnonymousStorage = async userIdAnonymous => {
  try {
    await AsyncStorage.setItem("userIdAnonymous", userIdAnonymous);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserIdAnonymousStorage = async () => {
  let userId = "";
  try {
    userId = await AsyncStorage.getItem("userIdAnonymous");
  } catch (error) {
    console.log(error.message);
  }
  return userId;
};

export const getUserIdStorage = async () => {
  let userId = "";
  try {
    userId = await AsyncStorage.getItem("userId");
  } catch (error) {
    console.log(error.message);
  }
  return userId;
};

export const deleteUserId = async () => {
  try {
    await AsyncStorage.removeItem("userId");
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const deleteUserIdAnonymous = async () => {
  try {
    await AsyncStorage.removeItem("userIdAnonymous");
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const saveAddressStorage = async address => {
  try {
    await AsyncStorage.setItem("address", address);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAddressStorage = async () => {
  let address = "";
  try {
    address = (await AsyncStorage.getItem("address")) || "none";
  } catch (error) {
    console.log(error.message);
  }
  return address;
};
