import { View, Image, Text, Dimensions } from "react-native";
import { useState, useEffect } from "react";

const icon = require("../../assets/foto_perfil.jpg");

export default function Intro() {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  // Cambia el tamaño dependiendo del ancho de la pantalla
  const imageSize = windowWidth >= 1280 ? 250 : 150;
  const textName = windowWidth >= 1280 ? 100 : 70;
  const marginTop = windowWidth >= 1280 ? 200 : 150;

  return (
    <>
      <View
        className="w-full items-center justify-center flex-col xl:flex-row gap-10 px-10"
        style={{ marginTop: marginTop }}
      >
        <Image
          source={icon}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
          }}
        />
        <View>
          <Text
            className="text-white text-center xl:text-left"
            style={{ fontFamily: "Games", fontSize: textName }}
          >
            Sergio Robla
          </Text>
          <Text
            className="text-white text-center xl:text-left w-full mt-5"
            style={{ fontFamily: "Games", fontSize: 30 }}
          >
            Desarrollador Full-Stack
          </Text>
        </View>
      </View>
    </>
  );
}
