import { useRouter } from "expo-router";
import { View, ScrollView } from "react-native";
import { useTheme } from "@/components/theme/theme-provider";
import { Download } from "lucide-react-native";
import { Text, Card, Button, Icon } from "@/components/ui";
import { PracticeCard } from "@/components/math";

const PracticeScreen = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const practiceProblems = [
    {
      equation: "4x² + 28x + 40 = 0",
      type: "Quadratic Equation",
      isCompleted: true,
    },
    {
      equation: "4x² + 8x - 5 = 0",
      type: "Quadratic Equation",
      isCompleted: false,
    },
    {
      equation: "3x - 7 = 5",
      type: "Linear Equation",
      isCompleted: false,
    },
    {
      equation: "sin²θ + cos²θ = 1",
      type: "Trigonometric Identity",
      isCompleted: true,
    },
  ];

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <View className="p-4">
        <Text variant="h2" style={{ marginBottom: 16 }}>
          Practice
        </Text>

        <Card variant="outlined" style={{ marginBottom: 24 }}>
          <Text style={{ marginBottom: 12 }}>
            Create a set of practice problems to print or share.
          </Text>
          <Button variant="primary" fullWidth>
            Create Worksheet
          </Button>
        </Card>

        <Text variant="h3" style={{ marginBottom: 16 }}>
          Sample Problems
        </Text>

        {practiceProblems.map((problem, index) => (
          <PracticeCard
            key={index}
            equation={problem.equation}
            type={problem.type}
            index={index}
            isCompleted={problem.isCompleted}
            onPress={() => router.push("/solve/x")}
          />
        ))}

        <Card variant="outlined" style={{ marginTop: 24 }}>
          <Text variant="h4" style={{ marginBottom: 12 }}>
            PDF Worksheets
          </Text>
          <View className="flex-row items-center">
            <Icon style={{ marginRight: 8 }}>
              <Download />
            </Icon>
            <Text>Quadratic Equations Practice.pdf</Text>
          </View>
        </Card>

        <Text variant="h3" style={{ marginTop: 24, marginBottom: 16 }}>
          Similar Problems from Web Search
        </Text>
        <Card
          variant="outlined"
          style={{
            height: 120,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Web search results would appear here</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

export default PracticeScreen;
