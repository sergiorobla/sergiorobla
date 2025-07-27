import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { questions } from "../../data/questions";

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
