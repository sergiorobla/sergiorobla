import { View, Text, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const icon = require("../../assets/favicon.png");
export default function Header({ isMenuOpen, toggleMenu, toggleSearch }) {
  return (
    <View
      className="absolute flex-row items-center gap-5 rounded-full border border-white/30 bg-black/50 px-2 py-1 mt-5 self-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Pressable style={{ padding: 10 }} onPress={toggleMenu}>
        <Ionicons
          name={isMenuOpen ? "close" : "menu"}
          size={30}
          color="white"
        />
      </Pressable>
      <Image source={icon} style={{ width: 45, height: 45 }} />
      <Pressable style={{ padding: 10 }} onPress={toggleSearch}>
        <Ionicons name={"search"} size={25} color="white" />
      </Pressable>
    </View>
  );
}
