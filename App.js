import { useEffect, useState, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import "./global.css";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import Header from "./components/header/Header";
import Intro from "./components/main/Intro";
import Page from "./components/main/Page";

const bgBackground = require("./assets/background-home.png");

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mockData = [
    "React",
    "React Native",
    "Next.js",
    "Expo",
    "Tailwind",
    "Node.js",
  ];

  const [fontsLoaded] = useFonts({
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    Games: require("./assets/fonts/GamerStation.ttf"),
  });

  useEffect(() => {
    document.title = "Sergio Robla | Full-Stack Developer";
  }, []);

  useEffect(() => {
    if (!isSearchOpen || isMenuOpen) {
      setSearchQuery("");
    }
  }, [isSearchOpen, isMenuOpen]);

  const searchResults = useMemo(() => {
    if (searchQuery.trim() === "") return [];
    return mockData.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    if (newMenuState) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    const newSearchState = !isSearchOpen;
    setIsSearchOpen(newSearchState);
    if (newSearchState) setIsMenuOpen(false);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ImageBackground
        source={bgBackground}
        className="relative flex-1 mx-auto w-full h-full bg-[#0F28F2]/50 overflow-hidden select-none"
      >
        <StatusBar style="dark" />
        <Header
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          toggleSearch={toggleSearch}
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          <Intro />
          <Page />
        </ScrollView>

        {isMenuOpen && (
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
                <Text className="text-white font-inter-light">
                  Menu abierto
                </Text>
              </View>
            </ScrollView>
          </Animated.View>
        )}

        {isSearchOpen && (
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            className="absolute top-0 left-0 w-full h-full z-40"
          >
            <View
              style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
              className="flex-1"
            >
              {/* Buscador fijo */}
              <View
                className="w-full px-6 pt-28 pb-4"
                style={{ paddingTop: 100 }}
              >
                <View className="relative">
                  <TextInput
                    placeholder="Buscar..."
                    placeholderTextColor="#ccc"
                    className="bg-white/10 text-white px-4 py-3 pr-10 rounded-xl font-inter-light"
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
                    <Text key={index} className="text-white text-lg mb-2">
                      {result}
                    </Text>
                  ))
                ) : searchQuery.length > 0 ? (
                  <Text className="text-white/50 mt-4">
                    No se encontraron resultados.
                  </Text>
                ) : null}
              </ScrollView>
            </View>
          </Animated.View>
        )}
      </ImageBackground>
    </>
  );
}
