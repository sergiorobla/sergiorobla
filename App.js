import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import { useFonts } from "expo-font";
import "./global.css";

import Header from "./components/header/Header";

const bgBackground = require("./assets/background-home.png");
export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Light": require("./assets/fonts/Inter/Inter-Light.ttf"),
    "Red-Hat": require("./assets/fonts/RedHat/RedHatMono.ttf"),
  });

  useEffect(() => {
    document.title = "Sergio Robla | Full-Stack Developer";
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={bgBackground}
      className="relative mx-auto w-full h-full bg-[#0F28F2]/50 overflow-hidden select-none"
    >
      <StatusBar style="dark" />
      <Header />
    </ImageBackground>
  );
}
