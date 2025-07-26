import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

// Datos de preguntas
const questions = [
  {
    id: 1,
    question: "¿Cuál es tu experiencia en desarrollo de software?",
    answer:
      "Mi interés por el desarrollo de software comenzó a los 16 años, cuando me regalaron una Raspberry Pi y empecé a experimentar con Python. Desde ese momento supe que la programación era mi camino. En 2017, con mi primer portátil, comencé a aprender HTML y CSS de forma autodidacta, lo que me introdujo al mundo del desarrollo web. Luego descubrí Java, y poco después JavaScript, que me abrió un universo completamente nuevo al permitirme crear aplicaciones dinámicas e interactivas. Con el tiempo, he adquirido experiencia en lenguajes como JavaScript, Java, C#, Kotlin y SQL, y he trabajado con tecnologías y frameworks como React, React Native, Tailwind CSS, Bootstrap, Spring Boot y Node.js. También he desarrollado un fuerte interés por el diseño web, la maquetación responsive y la experiencia de usuario, lo que me permite unir la lógica del desarrollo con la estética visual en cada proyecto.",
  },
  {
    id: 2,
    question: "¿Cómo se manejan los desafíos y problemas técnicos?",
    answer:
      "Los desafíos técnicos se abordan con un enfoque sistemático basado en análisis, colaboración y mejora continua. Primero se identifica y define claramente el problema. Luego, se realiza una investigación técnica para entender las causas raíz, evaluando posibles soluciones en términos de impacto, viabilidad y coste. Siempre que es posible, se fomenta la colaboración con otros miembros del equipo, promoviendo la revisión de código y el intercambio de ideas. Se prioriza la documentación de los hallazgos y se implementan soluciones sostenibles, no solo parches temporales. En contextos de alta presión, es clave mantener la calma, gestionar bien el tiempo y comunicar los avances de forma transparente. Cada problema se convierte en una oportunidad para fortalecer la arquitectura del sistema y prevenir futuros errores.",
  },
  {
    id: 3,
    question: "¿Cómo mantenerse actualizado con las nuevas tecnologías?",
    answer:
      "Mantenerse actualizado exige disciplina y curiosidad constante. Sigo fuentes confiables como documentación oficial, newsletters técnicas, canales especializados (como GitHub Trending, Hacker News, Dev.to), y publicaciones de líderes del sector. También participo en comunidades, foros y conferencias (presenciales o virtuales), y realizo cursos cuando es necesario profundizar en nuevas herramientas o paradigmas. Además, aplico el aprendizaje a proyectos personales o entornos de prueba, ya que la práctica es la mejor forma de asimilar nueva tecnología. El objetivo no es solo saber lo nuevo, sino entender cuándo y por qué aplicarlo.",
  },
  {
    id: 4,
    question: "¿Qué te motiva a seguir desarrollando software?",
    answer:
      "Me motiva la capacidad del software para transformar ideas en realidades concretas que resuelven problemas reales. Programar es una forma de crear, de construir sistemas que pueden escalar globalmente. Además, el aprendizaje es continuo; cada proyecto, cada tecnología, representa un nuevo reto intelectual. También me impulsa la posibilidad de colaborar con otras mentes técnicas, aprender de ellas y contribuir con soluciones elegantes y eficientes. El desarrollo de software es más que código: es visión, impacto y evolución constante.",
  },
  {
    id: 5,
    question: "¿Qué valor añadido puedes aportar a un proyecto o equipo?",
    answer:
      "Aporto pensamiento crítico, visión a largo plazo y una fuerte orientación a la calidad. No solo ejecuto tareas, cuestiono supuestos, detecto posibles cuellos de botella antes de que ocurran, y busco mejorar tanto el producto como los procesos. Me enfoco en escribir código limpio, documentado y testeado, pero también en construir una cultura de equipo saludable, donde la comunicación y el feedback sean constantes. Tengo facilidad para detectar patrones, automatizar procesos repetitivos y priorizar lo que realmente agrega valor. No solo soy un ejecutor, soy un catalizador.",
  },
  /*
  {
    id: 6,
    question:
      "¿Cuál ha sido tu proyecto más desafiante hasta ahora y cómo lo resolviste?",
    answer:
      "Uno de los proyectos más desafiantes fue el rediseño completo de una plataforma legacy utilizada por miles de usuarios, con arquitectura monolítica, bajo rendimiento y deuda técnica acumulada. El reto era migrar a una arquitectura basada en microservicios sin interrumpir el servicio. Lo abordé dividiendo la plataforma en módulos funcionales, documentando dependencias ocultas y diseñando una estrategia de migración progresiva. Implementamos contenedores con Docker, monitoreo con Prometheus y un pipeline de CI/CD robusto. La clave fue coordinarse estrechamente con el equipo de QA y mantener una comunicación constante con los stakeholders. El resultado fue una plataforma más escalable, rápida y mantenible.",
  },*/
  {
    id: 7,
    question: "¿Qué herramientas utilizas para la gestión de proyectos?",
    answer:
      "En mis proyectos de desarrollo utilizo herramientas que me permiten organizar tareas, colaborar eficientemente y mantener un flujo de trabajo claro. Para la gestión de tareas, uso principalmente Trello, donde puedo organizar fases de desarrollo, asignar prioridades y hacer seguimiento del progreso de manera visual y simple. Para el control de versiones, utilizo Git junto con GitHub, lo cual me permite gestionar ramas, colaborar en proyectos de equipo, y mantener el código limpio y documentado. También uso GitHub Projects para integrar la planificación directamente con los repositorios cuando el proyecto lo requiere.",
  },
];

// Componente "+" rotativo
const AnimatedPlus = ({ isOpen }) => {
  const rotation = useSharedValue(isOpen ? 0 : 45);

  useEffect(() => {
    rotation.value = withTiming(isOpen ? 0 : 45, { duration: 200 });
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

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
      <Ionicons name={"close"} size={20} color="white" />
    </Animated.Text>
  );
};

// Acordeón animado
const Answer = ({ text, isOpen }) => {
  const contentHeight = useSharedValue(0);
  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: animatedOpacity.value,
    overflow: "hidden",
  }));

  useEffect(() => {
    if (isOpen) {
      animatedHeight.value = withTiming(contentHeight.value, { duration: 300 });
      animatedOpacity.value = withTiming(1, { duration: 300 });
    } else {
      animatedHeight.value = withTiming(0, { duration: 200 });
      animatedOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [isOpen]);

  return (
    <Animated.View style={containerStyle}>
      <View
        onLayout={(e) => {
          contentHeight.value = e.nativeEvent.layout.height;
        }}
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
          {text}
        </Text>
      </View>
    </Animated.View>
  );
};

// Componente principal
export default function FrequentQuestion() {
  const [openId, setOpenId] = useState(null);

  const toggleQuestion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <View
      className="bg-black"
      style={{
        width: "100%",
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
        alignItems: "center",
      }}
    >
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

      <View style={{ width: "100%", maxWidth: 600 }}>
        {questions.map(({ id, question, answer }, index) => {
          const isOpen = openId === id;

          return (
            <View
              key={id}
              style={{
                marginBottom: 16,
                borderTopWidth: index > 0 ? 1 : 0,
                borderColor: "rgba(255,255,255,0.3)",
                paddingTop: 16,
                paddingBottom: 4,
              }}
            >
              <Pressable
                onPress={() => toggleQuestion(id)}
                className="flex-row items-center"
              >
                <View className="mt-2">
                  <AnimatedPlus isOpen={isOpen} />
                </View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                    textAlign: "left",
                    flex: 1,
                  }}
                >
                  {question}
                </Text>
              </Pressable>

              <Answer text={answer} isOpen={isOpen} />
            </View>
          );
        })}
      </View>
    </View>
  );
}
