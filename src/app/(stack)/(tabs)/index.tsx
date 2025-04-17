import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@components/theme/theme-provider";
import {
  Pencil,
  Camera,
  BookOpen,
  Settings,
  ChevronRight,
  Calculator,
  Video,
  Lightbulb,
} from "lucide-react-native";
import { Text, Card, Icon, Button } from "@components/ui";
import { MathEquation } from "@components/math";

type RoutePath =
  | "/(stack)/draw"
  | "/(stack)/(tabs)/scan"
  | "/(stack)/solve/x"
  | "/(stack)/(tabs)/practice"
  | "/(stack)/(tabs)/videos";

const HomeScreen = () => {
  const router = useRouter();
  const { colors, isDarkMode } = useTheme();

  const features: {
    title: string;
    description: string;
    icon: React.ReactNode;
    route: RoutePath;
  }[] = [
    {
      title: "Draw Equations",
      description: "Write naturally as on paper",
      icon: <Pencil color={colors.primary} />,
      route: "/(stack)/draw",
    },
    {
      title: "Scan & Solve",
      description: "Take a photo of your math problem",
      icon: <Camera color={colors.secondary} />,
      route: "/(stack)/(tabs)/scan",
    },
    {
      title: "Step-by-Step",
      description: "Get detailed explanations",
      icon: <BookOpen color={colors.accent} />,
      route: "/(stack)/solve/x",
    },
    {
      title: "Practice Problems",
      description: "Improve your skills with examples",
      icon: <Calculator color={colors.primary} />,
      route: "/(stack)/(tabs)/practice",
    },
    {
      title: "Tutorial Videos",
      description: "Learn from expert instructors",
      icon: <Video color={colors.secondary} />,
      route: "/(stack)/(tabs)/videos",
    },
  ];

  const recentProblems = [
    {
      equation: "x² - 4x - 5 = 0",
      type: "Quadratic Equation",
      color: colors.primary,
    },
    {
      equation: "4 sin θ cos θ = 2 sin θ",
      type: "Trigonometric Equation",
      color: colors.secondary,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      borderRadius: 16,
      marginBottom: 24,
      padding: 24,
      backgroundColor: isDarkMode
        ? `${colors.primary}20`
        : `${colors.primary}10`,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    settingsButton: {
      borderRadius: 999,
      padding: 8,
      backgroundColor: isDarkMode
        ? `${colors.primary}30`
        : `${colors.primary}20`,
    },
    buttonRow: {
      flexDirection: "row",
      marginTop: 16,
    },
    quickActionsContainer: {
      marginBottom: 24,
    },
    quickActionsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    quickActionButton: {
      width: "31%",
      padding: 12,
      borderRadius: 12,
      marginBottom: 12,
      alignItems: "center",
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    problemCard: {
      marginBottom: 12,
      overflow: "hidden",
    },
    problemIndicator: {
      height: 4,
      width: "100%",
    },
    problemContent: {
      padding: 12,
    },
    problemFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    solvedBadge: {
      flexDirection: "row",
      alignItems: "center",
    },
  });

  return (
    <ScrollView className="flex-1" style={styles.container}>
      <View className="p-4">
        {/* Header with gradient background */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text variant="h1" color={colors.primary}>
              Math Solver
            </Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => router.push("/(stack)/(tabs)/settings")}
            >
              <Icon>
                <Settings color={colors.primary} />
              </Icon>
            </TouchableOpacity>
          </View>
          <Text color={colors.secondaryText} className="mb-4">
            Solve any math problem with ease
          </Text>

          <View style={styles.buttonRow}>
            <Button
              variant="primary"
              onPress={() => router.push("/(stack)/draw")}
              style={{ marginRight: 8, flex: 1 }}
            >
              Start Solving
            </Button>
            <Button
              variant="outline"
              onPress={() => router.push("/(stack)/(tabs)/practice")}
              style={{ flex: 1 }}
            >
              Practice
            </Button>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text variant="h3" className="mb-4">
            Quick Actions
          </Text>
          <View style={styles.quickActionsRow}>
            {features.slice(0, 3).map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quickActionButton,
                  {
                    backgroundColor: isDarkMode
                      ? `${colors.primary}15`
                      : `${colors.primary}05`,
                  },
                ]}
                onPress={() => router.push(feature.route)}
              >
                <Icon className="mb-2">{feature.icon}</Icon>
                <Text weight="semibold" variant="body-sm">
                  {feature.title.split(" ")[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Features */}
        <View className="mb-6">
          <Text variant="h3" className="mb-4">
            Features
          </Text>
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="outlined"
              onPress={() => router.push(feature.route)}
              className="mb-3"
            >
              <View className="flex-row items-center">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-4"
                  style={{
                    backgroundColor: isDarkMode
                      ? `${colors.primary}15`
                      : `${colors.primary}05`,
                  }}
                >
                  <Icon>{feature.icon}</Icon>
                </View>
                <View className="flex-1">
                  <Text weight="semibold">{feature.title}</Text>
                  <Text variant="body-sm" color={colors.secondaryText}>
                    {feature.description}
                  </Text>
                </View>
                <Icon>
                  <ChevronRight color={colors.secondaryText} />
                </Icon>
              </View>
            </Card>
          ))}
        </View>

        {/* Recent Problems */}
        <View>
          <View style={styles.sectionHeader}>
            <Text variant="h3">Recent Problems</Text>
            <TouchableOpacity>
              <Text color={colors.primary}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentProblems.map((problem, index) => (
            <Card
              key={index}
              variant="outlined"
              onPress={() => router.push("/(stack)/solve/x")}
              style={styles.problemCard}
            >
              <View
                style={[
                  styles.problemIndicator,
                  {
                    backgroundColor:
                      index === 0 ? colors.primary : colors.secondary,
                  },
                ]}
              />
              <View style={styles.problemContent}>
                <MathEquation equation={problem.equation} />
                <View style={styles.problemFooter}>
                  <Text variant="body-sm" color={colors.secondaryText}>
                    {problem.type}
                  </Text>
                  <View style={styles.solvedBadge}>
                    <Icon className="mr-1">
                      <Lightbulb size={14} color={problem.color} />
                    </Icon>
                    <Text variant="body-sm" color={problem.color}>
                      Solved
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}

          <Button
            variant="primary"
            className="mt-3"
            onPress={() => router.push("/(stack)/solve/x")}
          >
            Solve New Problem
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
