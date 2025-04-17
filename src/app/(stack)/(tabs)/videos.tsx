import { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "@components/theme/theme-provider";
import { Text, VideoCard, Input } from "@components/ui";
import { Search, Filter } from "lucide-react-native";

const VideosScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Algebra",
    "Calculus",
    "Geometry",
    "Trigonometry",
    "Statistics",
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const videos = [
    {
      title: "Algebra Tutorial- Quadratic Equation",
      source: "YouTube",
      thumbnail: { uri: "/placeholder.svg?height=120&width=200" },
      duration: "10:25",
      views: "1.2M",
      category: "Algebra",
    },
    {
      title:
        "Quadratic Equation | Easy Tutorial for Beginners | Solve Equation",
      source: "YouTube",
      thumbnail: { uri: "/placeholder.svg?height=120&width=200" },
      duration: "15:30",
      views: "856K",
      category: "Algebra",
    },
    {
      title: "Understanding Trigonometric Functions",
      source: "YouTube",
      thumbnail: { uri: "/placeholder.svg?height=120&width=200" },
      duration: "8:45",
      views: "543K",
      category: "Trigonometry",
    },
    {
      title: "Calculus Basics - Derivatives and Integrals",
      source: "YouTube",
      thumbnail: { uri: "/placeholder.svg?height=120&width=200" },
      duration: "20:15",
      views: "1.5M",
      category: "Calculus",
    },
    {
      title: "Geometry Fundamentals - Angles and Shapes",
      source: "YouTube",
      thumbnail: { uri: "/placeholder.svg?height=120&width=200" },
      duration: "12:30",
      views: "678K",
      category: "Geometry",
    },
    {
      title: "Statistics Made Easy - Mean, Median, Mode",
      source: "YouTube",
      thumbnail: { uri: "/placeholder.svg?height=120&width=200" },
      duration: "14:20",
      views: "432K",
      category: "Statistics",
    },
  ];

  const filteredVideos = videos.filter(
    (video) =>
      (activeCategory === "All" || video.category === activeCategory) &&
      (searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    searchContainer: {
      marginBottom: 16,
    },
    categoriesContainer: {
      marginBottom: 24,
    },
    categoriesScroll: {
      flexDirection: "row",
    },
    categoryButton: {
      marginRight: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 999,
    },
    activeCategoryButton: {
      backgroundColor: isDarkMode
        ? `${colors.primary}30`
        : `${colors.primary}10`,
    },
    inactiveCategoryButton: {
      backgroundColor: isDarkMode ? colors.highlight : "#f5f5f5",
    },
    featuredContainer: {
      marginBottom: 24,
    },
    featuredImage: {
      width: "100%",
      height: 192,
      borderRadius: 12,
    },
    featuredOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 12,
      backgroundColor: isDarkMode ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
    },
    featuredMeta: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 4,
    },
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 32,
    },
  });

  return (
    <ScrollView style={styles.container} className="flex-1">
      <View className="p-4">
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search tutorials..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search size={20} color={colors.secondaryText} />}
            rightIcon={<Filter size={20} color={colors.secondaryText} />}
            variant="filled"
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                activeCategory === category
                  ? styles.activeCategoryButton
                  : styles.inactiveCategoryButton,
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                color={
                  activeCategory === category
                    ? colors.primary
                    : colors.secondaryText
                }
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Video */}
        {activeCategory === "All" && searchQuery === "" && (
          <View style={styles.featuredContainer}>
            <Text variant="h3" className="mb-4">
              Featured
            </Text>
            <TouchableOpacity>
              <Image
                source={{ uri: "/placeholder.svg?height=200&width=400" }}
                style={styles.featuredImage}
                resizeMode="cover"
              />
              <View style={styles.featuredOverlay}>
                <Text weight="semibold">Master Algebra in 30 Minutes</Text>
                <View style={styles.featuredMeta}>
                  <Text variant="body-sm" color={colors.secondaryText}>
                    30:45 • 2.5M views
                  </Text>
                  <Text variant="body-sm" color={colors.primary}>
                    Premium
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Video List */}
        <View>
          <Text variant="h3" className="mb-4">
            {activeCategory === "All"
              ? "All Videos"
              : activeCategory + " Videos"}
          </Text>

          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, index) => (
              <VideoCard
                key={index}
                title={video.title}
                source={`${video.source} • ${video.views} views`}
                thumbnail={video.thumbnail}
                duration={video.duration}
                category={video.category}
                onPress={() => {}}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text>No videos found for "{searchQuery}"</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default VideosScreen;
