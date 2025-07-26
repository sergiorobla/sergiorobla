import { View, Image, Text } from "react-native";

const projects = [
  {
    id: 1,
    title: "xploraspain",
    description:
      "Web creada como proyecto final de Bootcamp. Promueve el turismo rural en la España vacía, conectando a los usuarios con destinos poco conocidos y ayudando a revitalizar zonas despobladas.",
    image: require("../../assets/images/projects/xplora/xplora.png"),
  },
  {
    id: 2,
    title: "conectat",
    description:
      "Plataforma ganadora del Hackathon “Tarragona Impulsa”. Permite a los ciudadanos reportar incidencias, proponer ideas y descubrir eventos locales para mejorar su ciudad de forma colaborativa.",
    image: require("../../assets/images/projects/conectat/conectat.png"),
  },
  {
    id: 3,
    title: "digitalizatumundo",
    description:
      "Web orientada a ayudar a pequeñas empresas a digitalizarse. Ofrece servicios de diseño y mejora de sitios web para aumentar su visibilidad online y competitividad en el mercado.  ",
    image: require("../../assets/images/projects/digitaliza/digitaliza.png"),
  },
  {
    id: 4,
    title: "cryptoinvert",
    description:
      "Aplicación de inversión automática en criptomonedas. Usa IA para analizar datos en tiempo real y recomendar cuándo comprar o vender, optimizando decisiones financieras.",
    image: require("../../assets/images/projects/invert/invert.png"),
  },
  {
    id: 5,
    title: "finapp",
    description:
      "SuperApp multipropósito inspirada en WeChat. Combina red social, mensajería instantánea y pagos digitales en una sola plataforma para una experiencia digital completa.",
    image: require("../../assets/images/projects/finapp/finapp.png"),
  },
  {
    id: 6,
    title: "trapgang",
    description:
      "Página oficial del canal de entrevistas Trapgang.tv. Ofrece información sobre nuevos contenidos y una tienda online para la venta de merchandising exclusivo.",
    image: require("../../assets/images/projects/trapgang/trapgang.png"),
  },
];

export default function Projects() {
  const rows = [];
  for (let i = 0; i < projects.length; i += 3) {
    rows.push(projects.slice(i, i + 3));
  }

  return (
    <View className="p-4">
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          className="flex-row flex-wrap justify-center gap-4 mb-4"
        >
          {row.map((project) => (
            <View
              key={project.id}
              className="w-[300] bg-zinc-900 rounded-xl p-3 shadow-md items-center cursor-pointer"
            >
              <Image
                source={project.image}
                style={{
                  width: 270,
                  height: 150,
                  borderRadius: 8,
                }}
                resizeMode="cover"
              />
              <View className="mt-2">
                <Text className="text-white font-bold">{project.title}</Text>
                <Text
                  className="text-white/70 text-sm text-left"
                  style={{ width: 250 }}
                >
                  {project.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
