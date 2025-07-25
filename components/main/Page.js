import { View, Text } from "react-native";

export default function Page() {
  return (
    <View
      className="w-full h-full top-10 border border-white/30 bg-black"
      style={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8, // Para Android
      }}
    >
    </View>
  );
}
