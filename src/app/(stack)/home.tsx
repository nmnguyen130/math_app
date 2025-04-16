import { View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/components/theme/theme-provider";
import {
  Pencil,
  Camera,
  BookOpen,
  Settings,
  ChevronRight,
  Calculator,
  Video,
} from "lucide-react-native";
import { Text, Card, Icon, Button } from "@/components/ui";
import { MathEquation } from "@/components/math";

type RoutePath =
  | "(stack)/draw"
  | "(stack)/scan"
  | "(stack)/solve/x"
  | "(stack)/practice"
  | "(stack)/video";

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
      title: "Write naturally as on paper",
      description: "Draw equations and get instant solutions",
      icon: <Pencil />,
      route: "(stack)/draw",
    },
    {
      title: "Scan and solve math problems",
      description: "Take a photo of your math problem",
      icon: <Camera />,
      route: "(stack)/scan",
    },
    {
      title: "Get step-by-step explanations",
      description: "Understand how to solve any problem",
      icon: <BookOpen />,
      route: "(stack)/solve/x",
    },
    {
      title: "Practice with examples",
      description: "Improve your skills with practice problems",
      icon: <Calculator />,
      route: "(stack)/practice",
    },
    {
      title: "Watch tutorial videos",
      description: "Learn from expert instructors",
      icon: <Video />,
      route: "(stack)/video",
    },
  ];

  const recentProblems = [
    { equation: "x² - 4x - 5 = 0", type: "Quadratic Equation" },
    { equation: "4 sin θ cos θ = 2 sin θ", type: "Trigonometric Equation" },
  ];

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text variant="h1">Math Solver</Text>
          <TouchableOpacity
            onPress={() => router.push("/(stack)/setting")}
            className="p-2"
          >
            <Icon>
              <Settings />
            </Icon>
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <Text variant="h3" style={{ marginBottom: 16 }}>
            Features
          </Text>
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="outlined"
              onPress={() => router.push(`/${feature.route}`)}
              style={{ marginBottom: 12 }}
            >
              <View className="flex-row items-center">
                <Icon style={{ marginRight: 16 }}>{feature.icon}</Icon>
                <View className="flex-1">
                  <Text weight="semibold">{feature.title}</Text>
                  <Text variant="body-sm" color={colors.secondaryText}>
                    {feature.description}
                  </Text>
                </View>
                <Icon>
                  <ChevronRight />
                </Icon>
              </View>
            </Card>
          ))}
        </View>

        <View>
          <Text variant="h3" style={{ marginBottom: 16 }}>
            Recent Problems
          </Text>
          {recentProblems.map((problem, index) => (
            <Card
              key={index}
              variant="outlined"
              onPress={() => router.push("/solve/x")}
              style={{ marginBottom: 12 }}
            >
              <MathEquation equation={problem.equation} />
              <Text
                variant="body-sm"
                color={colors.secondaryText}
                style={{ marginTop: 8, textAlign: "center" }}
              >
                {problem.type}
              </Text>
            </Card>
          ))}

          <Button
            variant="primary"
            fullWidth
            style={{ marginTop: 16 }}
            onPress={() => router.push("/solve/x")}
          >
            Solve New Problem
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
