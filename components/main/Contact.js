import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native-web";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!email.trim() || !message.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch(
        "https://hook.eu2.make.com/e1qq83int5q0v8pvu84naqen1x9fayab",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, message }),
        }
      );

      if (response.ok) {
        Alert.alert("Mensaje enviado", "Gracias por contactarme.");
        setEmail("");
        setMessage("");
      } else {
        Alert.alert("Error", "Hubo un problema al enviar el mensaje.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar el mensaje.");
    }
  };

  return (
    <View className="w-full items-center px-6 py-12 gap-6 bg-black">
      <Text className="text-white text-4xl font-stacion text-center">
        Contacta conmigo
      </Text>

      <View className="w-full max-w-md gap-4">
        <TextInput
          className="bg-white text-black py-3 px-4 rounded-xl text-base"
          placeholder="Tu correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          className="bg-white text-black py-3 px-4 rounded-xl text-base h-32"
          placeholder="Escribe tu mensaje"
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <Pressable
          onPress={handleSubmit}
          className="bg-zinc-700 hover:bg-zinc-800 py-3 px-4 rounded-xl mt-2"
          style={({ pressed }) => ({
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text className="text-white text-center text-base">
            Enviar mensaje
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
