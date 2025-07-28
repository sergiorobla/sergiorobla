// toastConfig.js
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#b2ccb2",
        borderLeftWidth: "0",
        borderLeftColor: "transparent",
        zIndex: 9999,
        width: "auto",
        height: "40px",
        alignSelf: "center",
        pointerEvents: "none",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ color: "green", fontWeight: "bold" }}
      text2Style={{ color: "darkgreen" }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: "#d7bcbc",
        borderLeftWidth: "0",
        borderLeftColor: "transparent",
        zIndex: 9999,
        width: "auto",
        height: "40px",
        alignSelf: "center",
        pointerEvents: "none",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ color: "darkred", fontWeight: "bold" }}
      text2Style={{ color: "red" }}
    />
  ),
};
