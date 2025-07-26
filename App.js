import { useEffect, useState, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, ImageBackground, View } from "react-native";
import { useFonts } from "expo-font";
import "./global.css";

import Header from "./components/header/Header";
import SearchOverlay from "./components/header/SearchOverlay";
import MenuOverlay from "./components/header/MenuOverlay";
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
    Inter: require("./assets/fonts/Inter-Light.ttf"),
    Games: require("./assets/fonts/GamerStation.ttf"),
    Stacion: require("./assets/fonts/Stacion-Regular.otf"),
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

  const closeOverlays = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
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
    <ImageBackground
      source={bgBackground}
      resizeMode="cover"
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      imageStyle={{
        alignSelf: "center",
      }}
      className="relative mx-auto select-none"
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(10, 20, 60, 0.5)",
          zIndex: 0,
        }}
      />
      <View className="relative z-10 flex-1">
        <StatusBar style="dark" />
        <Header
          isMenuOpen={isMenuOpen}
          isSearchOpen={isSearchOpen}
          toggleMenu={toggleMenu}
          toggleSearch={toggleSearch}
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          <Intro />
          <Page />
        </ScrollView>
        {isMenuOpen && <MenuOverlay closeOverlays={closeOverlays} />}
        {isSearchOpen && (
          <SearchOverlay
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
          />
        )}
      </View>
    </ImageBackground>
  );
}
