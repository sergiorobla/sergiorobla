import { useEffect, useState, useRef, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { SectionList, ImageBackground, View } from "react-native";
import { useFonts } from "expo-font";
import "./global.css";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/main/toastConfig";
import { projects } from "./data/projects";
import { questions } from "./data/questions";

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

  // Scroll a sección específica
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

  // Mapa de palabras clave a sección
  const keywordToSection = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      const words = (p.title + " " + p.description + " " + p.lang.join(" "))
        .toLowerCase()
        .split(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9]+/)
        .filter(Boolean);
      words.forEach((w) => (map[w] = 1));
    });
    questions.forEach((q) => {
      const words = (q.question + " " + q.answer)
        .toLowerCase()
        .split(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9]+/)
        .filter(Boolean);
      words.forEach((w) => (map[w] = 2));
    });
    return map;
  }, []);

  const allKeywords = useMemo(
    () => Object.keys(keywordToSection),
    [keywordToSection]
  );

  const [fontsLoaded] = useFonts({
    Inter: require("./assets/fonts/Inter-Light.ttf"),
    Games: require("./assets/fonts/GamerStation.ttf"),
    Stacion: require("./assets/fonts/Stacion-Regular.otf"),
  });

  useEffect(() => {
    document.title = "Sergio Robla | Full-Stack Developer";
  }, []);

  useEffect(() => {
    if (!isSearchOpen || isMenuOpen) setSearchQuery("");
  }, [isSearchOpen, isMenuOpen]);

  // Resultados filtrados para búsqueda
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allKeywords.filter((word) => word.includes(query));
  }, [searchQuery, allKeywords]);

  const getSectionIndexFromResult = (result) =>
    keywordToSection[result.toLowerCase()] ?? 0;

  // Handlers para abrir/cerrar menús y búsqueda
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

  const showToast = (type, text1, text2) => {
    Toast.show({ type, text1, text2 });
  };

  if (!fontsLoaded) return null;

  const sections = [
    { title: "Inicio", data: [{}], renderItem: () => <Intro /> },
    { title: "Proyectos", data: [{}], renderItem: () => <Projects /> },
    { title: "Sobre mí", data: [{}], renderItem: () => <FrequentQuestion /> },
    {
      title: "Contacto",
      data: [{}],
      renderItem: () => (
        <Contact
          onMessageSent={() =>
            showToast("success", "Mensaje enviado.", "Gracias por contactarme.")
          }
        />
      ),
    },
    { title: "Footer", data: [{}], renderItem: () => <Footer /> },
  ];

  return (
    <ImageBackground
      source={bgBackground}
      resizeMode="cover"
      style={{ flex: 1, width: "100%", height: "100%" }}
      imageStyle={{ alignSelf: "center" }}
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
          closeOverlays={closeOverlays}
          scrollToSection={scrollToSection}
        />
        <SectionList
          ref={sectionListRef}
          sections={sections}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ section }) => section.renderItem()}
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
            closeOverlays={closeOverlays}
            scrollToSection={scrollToSection}
            getSectionIndexFromResult={getSectionIndexFromResult}
          />
        )}
      </View>

      <View
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          zIndex: 1000,
          alignItems: "center",
        }}
        pointerEvents="box-none"
      >
        <Toast config={toastConfig} />
      </View>
    </ImageBackground>
  );
}
