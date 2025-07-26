import { View, Text, ScrollView } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function SearchOverlay({}) {
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      className="absolute top-0 left-0 w-full h-full z-40"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", flex: 1 }}
          className="justify-center items-center"
        >
          <Text className="text-white font-inter-light">Menu abierto</Text>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
