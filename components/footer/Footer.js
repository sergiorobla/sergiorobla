import { View, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <View className="flex-row justify-around items-center pb-5 bg-black">
      <Text className="text-white" style={{ fontFamily: "Inter" }}>
        <span className="border-r border-white/30 px-2">sergiorobla.es</span>
        <span className="px-2">{currentYear}</span>
      </Text>
      <View className="flex-row gap-5">
        <Pressable>
          <Ionicons name={"logo-linkedin"} size={25} color="white" />
        </Pressable>
        <Pressable>
          <Ionicons name={"logo-github"} size={25} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
