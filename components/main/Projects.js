import { View, Image, Text } from "react-native";
import { projects } from "../../data/projects";

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
