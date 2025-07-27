import { View, Pressable, Text, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const linkedInUrl = "https://www.linkedin.com/in/sergiorobla/";
  const githubUrl = "https://github.com/sergiorobla";

  const openUrl = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn(`No se puede abrir la URL: ${url}`);
    }
  };

  return (
    <View className="flex-row justify-around items-center pb-5 bg-black">
      <Text className="text-white" style={{ fontFamily: "Inter" }}>
        <Text
          style={{
            borderRightWidth: 1,
            borderColor: "rgba(255,255,255,0.3)",
            paddingRight: 8,
          }}
        >
          sergiorobla.es
        </Text>
        <Text style={{ paddingLeft: 8 }}>{currentYear}</Text>
      </Text>
      <View className="flex-row gap-5">
        <Pressable onPress={() => openUrl(linkedInUrl)}>
          <Ionicons name={"logo-linkedin"} size={25} color="white" />
        </Pressable>
        <Pressable onPress={() => openUrl(githubUrl)}>
          <Ionicons name={"logo-github"} size={25} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
