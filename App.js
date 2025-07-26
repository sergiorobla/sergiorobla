import { useEffect, useState, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, ImageBackground } from "react-native";
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
          isSearchOpen={isSearchOpen}
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

        {isMenuOpen && <MenuOverlay />}

        {isSearchOpen && (
          <SearchOverlay
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
          />
        )}
      </ImageBackground>
    </>
  );
}
