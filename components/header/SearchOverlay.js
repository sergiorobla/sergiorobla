import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function SearchOverlay({
  searchQuery,
  setSearchQuery,
  searchResults,
  closeOverlays,
  scrollToSection,
  getSectionIndexFromResult,
}) {
  const [height, setHeight] = useState(Dimensions.get("window").height);

  useEffect(() => {
    const onChange = ({ window }) => {
      setHeight(window.height);
    };
    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const goToResult = (result) => {
    closeOverlays();
    const sectionIndex = getSectionIndexFromResult(result);
    setTimeout(() => scrollToSection(sectionIndex), 100);
  };

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height,
        zIndex: 40,
      }}
    >
      <View
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
        className="flex-1"
      >
        {/* Buscador fijo */}
        <View className="w-full px-6 pt-28 pb-4" style={{ paddingTop: 100 }}>
          <View className="relative">
            <TextInput
              placeholder="Buscar..."
              placeholderTextColor="#ccc"
              className="bg-white/10 text-white px-4 py-3 pr-10 rounded-xl font-inter-light"
              style={{ fontFamily: "Inter" }}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable
                onPress={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Ionicons name="close" size={20} color="#ffffffcc" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Resultados */}
        <ScrollView
          className="px-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <Pressable key={index} onPress={() => goToResult(result)}>
                <Text className="text-white text-lg mb-2">{result}</Text>
              </Pressable>
            ))
          ) : searchQuery.length > 0 ? (
            <Text className="text-white/50 mt-4">
              No se encontraron resultados.
            </Text>
          ) : null}
        </ScrollView>
      </View>
    </Animated.View>
  );
}
