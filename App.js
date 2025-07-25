import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import { useFonts } from "expo-font";
import "./global.css";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import Header from "./components/header/Header";
import Intro from "./components/main/Intro";
import Page from "./components/main/Page";

const bgBackground = require("./assets/background-home.png");

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [fontsLoaded] = useFonts({
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    Games: require("./assets/fonts/GamerStation.ttf"),
  });

  useEffect(() => {
    document.title = "Sergio Robla | Full-Stack Developer";
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
        <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
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
      </ImageBackground>
    </>
  );
}
