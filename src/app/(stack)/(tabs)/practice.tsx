import React from "react";
import { useState } from "react";
import { useRouter } from "expo-router";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@components/theme/theme-provider";
import {
  Download,
  Filter,
  Search,
  BookOpen,
  Star,
  Clock,
  TrendingUp,
} from "lucide-react-native";
import { Text, Card, Button, Icon, Input } from "@components/ui";
import { PracticeCard } from "@components/math";

const PracticeScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "all", label: "All", icon: <BookOpen size={16} /> },
    { id: "favorites", label: "Favorites", icon: <Star size={16} /> },
    { id: "recent", label: "Recent", icon: <Clock size={16} /> },
    { id: "trending", label: "Trending", icon: <TrendingUp size={16} /> },
  ];

  const practiceProblems: {
    equation: string;
    type: string;
    isCompleted: boolean;
    difficulty: "Easy" | "Medium" | "Hard";
    isFavorite: boolean;
  }[] = [
    {
      equation: "4x² + 28x + 40 = 0",
      type: "Quadratic Equation",
      isCompleted: true,
      difficulty: "Medium",
      isFavorite: true,
    },
    {
      equation: "4x² + 8x - 5 = 0",
      type: "Quadratic Equation",
      isCompleted: false,
      difficulty: "Easy",
      isFavorite: false,
    },
    {
      equation: "3x - 7 = 5",
      type: "Linear Equation",
      isCompleted: false,
      difficulty: "Easy",
      isFavorite: false,
    },
    {
      equation: "sin²θ + cos²θ = 1",
      type: "Trigonometric Identity",
      isCompleted: true,
      difficulty: "Hard",
      isFavorite: true,
    },
    {
      equation: "∫ x² dx",
      type: "Calculus",
      isCompleted: false,
      difficulty: "Hard",
      isFavorite: false,
    },
    {
      equation: "log₁₀(100) + log₁₀(10)",
      type: "Logarithm",
      isCompleted: false,
      difficulty: "Medium",
      isFavorite: true,
    },
  ];

  const filteredProblems = practiceProblems.filter((problem) => {
    if (activeTab === "favorites" && !problem.isFavorite) return false;
    if (activeTab === "recent" && !problem.isCompleted) return false;
    if (
      searchQuery &&
      !problem.equation.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !problem.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      marginBottom: 24,
    },
    searchContainer: {
      marginBottom: 16,
    },
    tabsContainer: {
      marginBottom: 24,
    },
    tabsScroll: {
      flexDirection: "row",
    },
    tab: {
      marginRight: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 999,
      flexDirection: "row",
      alignItems: "center",
    },
    activeTab: {
      backgroundColor: isDarkMode
        ? `${colors.primary}30`
        : `${colors.primary}10`,
    },
    inactiveTab: {
      backgroundColor: isDarkMode ? colors.highlight : "#f5f5f5",
    },
    tabIcon: {
      marginRight: 4,
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
        {/* Header */}
        <View style={styles.header}>
          <Text variant="h2" className="mb-2">
            Practice
          </Text>
          <Text color={colors.secondaryText}>
            Improve your skills with practice problems
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search problems..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search size={20} color={colors.secondaryText} />}
            rightIcon={<Filter size={20} color={colors.secondaryText} />}
            variant="filled"
          />
        </View>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsScroll}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id ? styles.activeTab : styles.inactiveTab,
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon style={styles.tabIcon}>
                {React.cloneElement(tab.icon, {
                  color:
                    activeTab === tab.id
                      ? colors.primary
                      : colors.secondaryText,
                })}
              </Icon>
              <Text
                color={
                  activeTab === tab.id ? colors.primary : colors.secondaryText
                }
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Create Worksheet Card */}
        <Card variant="outlined" className="mb-6">
          <View className="p-4">
            <Text className="mb-3">
              Create a set of practice problems to print or share.
            </Text>
            <Button variant="primary" fullWidth>
              Create Worksheet
            </Button>
          </View>
        </Card>

        {/* Problems List */}
        <Text variant="h3" className="mb-4">
          {activeTab === "all"
            ? "All Problems"
            : activeTab === "favorites"
            ? "Favorite Problems"
            : activeTab === "recent"
            ? "Recent Problems"
            : "Trending Problems"}
        </Text>

        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem, index) => (
            <PracticeCard
              key={index}
              equation={problem.equation}
              type={problem.type}
              index={index}
              isCompleted={problem.isCompleted}
              difficulty={problem.difficulty}
              isFavorite={problem.isFavorite}
              onPress={() => router.push("/(stack)/solve/x")}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text>No problems found</Text>
          </View>
        )}

        {/* PDF Worksheets */}
        <Card variant="outlined" className="mt-6">
          <View className="p-4">
            <Text variant="h4" className="mb-3">
              PDF Worksheets
            </Text>
            <View className="flex-row items-center">
              <Icon className="mr-2">
                <Download color={colors.primary} />
              </Icon>
              <Text>Quadratic Equations Practice.pdf</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default PracticeScreen;
