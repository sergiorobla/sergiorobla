import { View, Text } from "react-native";

export default function Page() {
  return (
    <View
      className="w-full h-full top-10 border-t border-white/30 bg-black rounded-t-3xl shadow-lg"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
      }}
    ></View>
  );
}
