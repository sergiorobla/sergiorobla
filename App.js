import { useEffect, useState, useRef, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { SectionList, ImageBackground, View } from "react-native";
import { useFonts } from "expo-font";
import "./global.css";

import Header from "./components/header/Header";
import SearchOverlay from "./components/header/SearchOverlay";
import MenuOverlay from "./components/header/MenuOverlay";
import Intro from "./components/main/Intro";
import Projects from "./components/main/Projects";
import FrequentQuestion from "./components/main/FrequentQuestion";
import Contact from "./components/main/Contact";
import Footer from "./components/footer/Footer";

const bgBackground = require("./assets/background-home.png");

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sectionListRef = useRef(null);

  const scrollToSection = (index) => {
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0,
        animated: true,
        viewOffset: 120,
      });
    }
  };

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

  const sections = [
    {
      title: "Inicio",
      data: [""],
      renderItem: () => <Intro />,
    },
    {
      title: "Proyectos",
      data: [""],
      renderItem: () => <Projects />,
    },
    {
      title: "Sobre mí",
      data: [""],
      renderItem: () => <FrequentQuestion />,
    },
    {
      title: "Contacto",
      data: [""],
      renderItem: () => <Contact />,
    },
    {
      title: "Footer",
      data: [""],
      renderItem: () => <Footer />,
    },
  ];

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
        <SectionList
          ref={sectionListRef}
          sections={sections}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ section }) => {
            section.renderItem();
          }}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
        />

        {isMenuOpen && (
          <MenuOverlay
            closeOverlays={closeOverlays}
            scrollToSection={scrollToSection}
          />
        )}
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
