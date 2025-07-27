import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native-web";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green", backgroundColor: "#e6ffe6" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ color: "green", fontWeight: "bold" }}
      text2Style={{ color: "darkgreen" }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red", backgroundColor: "#ffe6e6" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ color: "darkred", fontWeight: "bold" }}
      text2Style={{ color: "red" }}
    />
  ),
};

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim() && !email.trim() && !message.trim()) {
      return Toast.show({ type: "error", text1: "No has añadido nada." });
    }
    if (!name.trim()) {
      return Toast.show({
        type: "error",
        text1: "Debes añadir el nombre primero.",
      });
    }
    if (!email.trim()) {
      return Toast.show({
        type: "error",
        text1: "Debes añadir el email primero.",
      });
    }
    if (!message.trim()) {
      return Toast.show({
        type: "error",
        text1: "Debes añadir el mensaje primero.",
      });
    }
    if (!emailRegex.test(email)) {
      return Toast.show({
        type: "error",
        text1: "Por favor ingresa un correo electrónico válido.",
      });
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://hook.eu2.make.com/e1qq83int5q0v8pvu84naqen1x9fayab",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Mensaje enviado.",
          text2: "Gracias por contactarme.",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        Toast.show({
          type: "error",
          text1: "Hubo un problema al enviar el mensaje.",
        });
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "No se pudo enviar el mensaje." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View className="w-full items-center px-6 py-12 gap-6 bg-black">
        <Text className="text-white text-4xl font-stacion text-center">
          Contacta conmigo
        </Text>

        <View className="w-full max-w-md gap-4">
          <TextInput
            className="bg-white text-black py-3 px-4 rounded-xl text-base"
            placeholder="Tu nombre"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
          <TextInput
            className="bg-white text-black py-3 px-4 rounded-xl text-base"
            placeholder="Tu correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!loading}
          />
          <TextInput
            className="bg-white text-black py-3 px-4 rounded-xl text-base h-32"
            placeholder="Escribe tu mensaje"
            value={message}
            onChangeText={setMessage}
            multiline
            editable={!loading}
          />

          <Pressable
            onPress={handleSubmit}
            disabled={loading}
            className={`bg-zinc-700 hover:bg-zinc-800 py-3 px-4 rounded-xl mt-2 ${
              loading ? "opacity-50" : "opacity-100"
            }`}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text className="text-white text-center text-base">
              {loading ? "Enviando..." : "Enviar mensaje"}
            </Text>
          </Pressable>
        </View>
      </View>

      <Toast config={toastConfig} topOffset={400} />
    </>
  );
}
