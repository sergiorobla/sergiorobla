import React from "react";
import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const questions = [
  {
    id: 1,
    question: "¿Cuál es el objetivo de esta plataforma?",
    answer:
      "Nuestro objetivo es ayudar a las personas a conectar con proyectos digitales innovadores y facilitar el acceso a recursos tecnológicos.",
  },
  {
    id: 2,
    question: "¿Puedo colaborar con ustedes?",
    answer:
      "Sí, siempre estamos abiertos a colaboraciones. Puedes contactarnos mediante el formulario de contacto o redes sociales.",
  },
  {
    id: 3,
    question: "¿Qué tecnologías utilizan?",
    answer:
      "Trabajamos principalmente con JavaScript, React, TypeScript y herramientas modernas de desarrollo web y móvil.",
  },
];

export default function FrequentQuestion() {
  const [openId, setOpenId] = useState(null);

  // Aquí guardaremos la rotación para cada pregunta
  // Pero para simplificar: solo animamos la pregunta abierta (openId)
  // Así que creamos una función que devuelve el estilo animado según si está abierta

  const toggleQuestion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Componente para el + con animación
  const AnimatedPlus = ({ isOpen }) => {
    const rotation = useSharedValue(isOpen ? 45 : 0);

    // Actualizamos rotación cuando cambia isOpen
    // Pero reactivate con useEffect:
    React.useEffect(() => {
      rotation.value = withTiming(isOpen ? 45 : 0, { duration: 200 });
    }, [isOpen]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotateZ: `${rotation.value}deg` }],
      };
    });

    return (
      <Animated.Text
        style={[
          {
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            width: 20,
            textAlign: "center",
            marginRight: 8,
          },
          animatedStyle,
        ]}
      >
        +
      </Animated.Text>
    );
  };

  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 40 }}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: 24,
          fontFamily: "Stacion",
          fontSize: 50,
        }}
      >
        Preguntas frecuentes
      </Text>

      {questions.map(({ id, question, answer }) => {
        const isOpen = openId === id;

        return (
          <View
            key={id}
            style={{
              alignSelf: "center",
              width: "100%",
              maxWidth: 600,
              marginBottom: 16,
            }}
          >
            <Pressable
              onPress={() => toggleQuestion(id)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <AnimatedPlus isOpen={isOpen} />
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {question}
              </Text>
            </Pressable>

            {isOpen && (
              <Animated.View
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(150)}
              >
                <Text
                  style={{
                    color: "white",
                    opacity: 0.7,
                    marginTop: 8,
                    fontSize: 16,
                    textAlign: "left",
                  }}
                >
                  {answer}
                </Text>
              </Animated.View>
            )}
          </View>
        );
      })}
    </View>
  );
}
