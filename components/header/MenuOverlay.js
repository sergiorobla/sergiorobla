import { View, Text, ScrollView, Pressable } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function MenuOverlay({ closeOverlays, scrollToSection }) {
  const goTo = (index) => {
    closeOverlays();
    setTimeout(() => scrollToSection(index), 100);
  };

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      className="absolute top-0 left-0 w-full h-full z-40"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", flex: 1 }}
          className="justify-center items-center gap-5"
        >
          <Pressable onPress={() => goTo(0)}>
            <Text className="text-white text-3xl font-inter-light">Inicio</Text>
          </Pressable>
          <Pressable onPress={() => goTo(1)}>
            <Text className="text-white text-3xl font-inter-light">
              Proyectos
            </Text>
          </Pressable>
          <Pressable onPress={() => goTo(2)}>
            <Text className="text-white text-3xl font-inter-light">
              Sobre mí
            </Text>
          </Pressable>
          <Pressable onPress={() => goTo(3)}>
            <Text className="text-white text-3xl font-inter-light">
              Contacto
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
