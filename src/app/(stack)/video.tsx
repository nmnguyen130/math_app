import { View, ScrollView } from "react-native";
import { useTheme } from "@/components/theme/theme-provider";
import { Text, VideoCard } from "@/components/ui";

const VideosScreen = () => {
  const { isDarkMode } = useTheme();

  const videos = [
    {
      title: "Algebra Tutorial- Quadratic Equation",
      source: "YouTube",
      thumbnail: { uri: "/placeholder.svg?height=120&width=200" },
      duration: "10:25",
    },
    {
      title:
        "Quadratic Equation | Easy Tutorial for Beginners | Solve Equation",
      source: "YouTube",
      thumbnail: { uri: "/placeholder.svg?height=120&width=200" },
      duration: "15:30",
    },
    {
      title: "Understanding Trigonometric Functions",
      source: "YouTube",
      thumbnail: { uri: "/placeholder.svg?height=120&width=200" },
      duration: "8:45",
    },
    {
      title: "Calculus Basics - Derivatives and Integrals",
      source: "YouTube",
      thumbnail: { uri: "/placeholder.svg?height=120&width=200" },
      duration: "20:15",
    },
  ];

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <View className="p-4">
        <Text variant="h2" style={{ marginBottom: 16 }}>
          Videos
        </Text>

        {videos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            source={video.source}
            thumbnail={video.thumbnail}
            duration={video.duration}
            onPress={() => {}}
          />
        ))}

        <Text variant="h2" style={{ marginTop: 24, marginBottom: 16 }}>
          Recommended
        </Text>

        {videos.slice(2).map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            source={video.source}
            thumbnail={video.thumbnail}
            duration={video.duration}
            onPress={() => {}}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default VideosScreen;
