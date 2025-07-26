import { View, Text, ScrollView, Pressable } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function MenuOverlay({ closeOverlays }) {
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
          <Pressable onPress={closeOverlays}>
            <Text href="#inicio" className="text-white font-inter-light">
              Inicio
            </Text>
          </Pressable>
          <Pressable onPress={closeOverlays}>
            <Text href="#projecto" className="text-white font-inter-light">
              Proyectos
            </Text>
          </Pressable>
          <Pressable onPress={closeOverlays}>
            <Text href="#sobreMi" className="text-white font-inter-light">
              Sobre mí
            </Text>
          </Pressable>
          <Pressable onPress={closeOverlays}>
            <Text href="#contacto" className="text-white font-inter-light">
              Contacto
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
