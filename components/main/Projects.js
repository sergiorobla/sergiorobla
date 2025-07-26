import { View, Image, Text } from "react-native";

const projects = [
  {
    id: 1,
    title: "cryptoinvert",
    description:
      "Aplicación de inversión automática en criptomonedas. Usa IA para analizar datos en tiempo real y recomendar cuándo comprar o vender, optimizando decisiones financieras.",
    image: require("../../assets/images/projects/invert/invert.png"),
    lang: ["Python", "React", "JavaScript"],
  },
  {
    id: 2,
    title: "digitalizatumundo",
    description:
      "Web orientada a ayudar a pequeñas empresas a digitalizarse. Ofrece servicios de diseño y mejora de sitios web para aumentar su visibilidad online y competitividad en el mercado.  ",
    image: require("../../assets/images/projects/digitaliza/digitaliza.png"),
    lang: ["React", "TypeScript"],
  },
  {
    id: 3,
    title: "conectat",
    description:
      "Plataforma ganadora del Hackathon “Tarragona Impulsa”. Permite a los ciudadanos reportar incidencias, proponer ideas y descubrir eventos locales para mejorar su ciudad de forma colaborativa.",
    image: require("../../assets/images/projects/conectat/conectat.png"),
    lang: ["React", "TypeScript"],
  },
  {
    id: 4,
    title: "xploraspain",
    description:
      "Web creada como proyecto final de Bootcamp. Promueve el turismo rural en la España vacía, conectando a los usuarios con destinos poco conocidos y ayudando a revitalizar zonas despobladas.",
    image: require("../../assets/images/projects/xplora/xplora.png"),
    lang: ["Node.js", "Spring Boot", "React", "TypeScript"],
  },
  {
    id: 5,
    title: "finapp",
    description:
      "SuperApp multipropósito inspirada en WeChat. Combina red social, mensajería instantánea y pagos digitales en una sola plataforma para una experiencia digital completa.",
    image: require("../../assets/images/projects/finapp/finapp.png"),
    lang: ["Python", "React", "JavaScript"],
  },
  {
    id: 6,
    title: "trapgang",
    description:
      "Página oficial del canal de entrevistas Trapgang.tv. Ofrece información sobre nuevos contenidos y una tienda online para la venta de merchandising exclusivo.",
    image: require("../../assets/images/projects/trapgang/trapgang.png"),
    lang: ["React", "JavaScript"],
  },
];

export default function Projects() {
  const rows = [];
  for (let i = 0; i < projects.length; i += 3) {
    rows.push(projects.slice(i, i + 3));
  }

  return (
    <View
      className="p-4 pt-8 xl:pt-20 w-full border-t border-white/30 bg-black rounded-t-3xl shadow-lg"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      }}
    >
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          className="flex-row flex-wrap justify-center gap-4 mb-4"
        >
          {row.map((project) => (
            <View
              key={project.id}
              className="w-[300] bg-zinc-900 rounded-xl shadow-md items-center cursor-pointer pb-20"
              style={{ paddingTop: 16 }}
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
                <Text
                  className="text-white font-bold pb-3"
                  style={{ fontFamily: "Inter" }}
                >
                  {project.title}
                </Text>
                <Text
                  className="text-white/70 text-sm text-left"
                  style={{ width: 250, fontFamily: "Inter" }}
                >
                  {project.description}
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-2 self-start absolute bottom-3 px-3">
                {project.lang.map((tech, index) => (
                  <View
                    key={index}
                    className="bg-[#3f3f46] p-1 rounded-full px-2"
                  >
                    <Text
                      className="text-white"
                      style={{ fontSize: 12, fontFamily: "Inter" }}
                    >
                      {tech.trim()}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
