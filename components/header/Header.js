import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const icon = require("../../assets/favicon.png");

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <View className="z-50">
        <View
          className="absolute flex-row items-center gap-5 rounded-full border border-white/30 bg-black/50 px-2 py-1 mt-5 self-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <Image source={icon} style={{ width: 50, height: 50 }} />
          <Text className="text-white text-3xl font-red-hat">sergiorobla</Text>
          <Pressable style={{ padding: 10 }} onPress={toggleMenu}>
            <Ionicons
              name={isMenuOpen ? "close" : "menu"}
              size={30}
              color="white"
            />
          </Pressable>
        </View>
      </View>

      {isMenuOpen && (
        <View style={{ flex: 1, height: Dimensions.get("window").height }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
              className="w-full flex-1 justify-center items-center"
            >
              <Text className="text-white font-inter-light">Menu abierto</Text>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
