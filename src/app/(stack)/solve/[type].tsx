import { View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "@components/theme/theme-provider";
import { Edit, Bookmark } from "lucide-react-native";
import { Text, Card, Button, Icon } from "@components/ui";
import { MathEquation, StepByStepSolution, GraphView } from "@components/math";

const SolveScreen = () => {
  const { type } = useLocalSearchParams();
  const { isDarkMode } = useTheme();

  // Sample data based on the type parameter
  const getEquation = () => {
    if (type === "x") {
      return {
        title: "Solve for x",
        method: "Steps Using the Quadratic Formula",
        equation: "x² - 4x - 5 = 0",
        steps: [
          {
            explanation:
              "This equation is in standard form: ax² + bx + c = 0. Substitute 1 for a, -4 for b, and -5 for c in the quadratic formula.",
            equation: "(-b ± √(b² - 4ac)) / 2a",
          },
          {
            explanation: "Substitute the values into the formula",
            equation: "x = (-(-4) ± √((-4)² - 4(1)(-5))) / 2(1)",
          },
          {
            explanation: "Simplify the expression",
            equation: "x = (4 ± √(16 + 20)) / 2",
          },
          {
            explanation: "Continue simplifying",
            equation: "x = (4 ± √36) / 2",
          },
          {
            explanation: "Take the square root",
            equation: "x = (4 ± 6) / 2",
          },
          {
            explanation: "Calculate both solutions",
            equation: "x = 5 or x = -1",
          },
        ],
      };
    } else if (type === "θ") {
      return {
        title: "Solve for θ",
        method: "Trigonometric Equation",
        equation: "4 sin θ cos θ = 2 sin θ",
        steps: [
          {
            explanation: "Factor out sin θ from both sides",
            equation: "4 sin θ cos θ = 2 sin θ",
          },
          {
            explanation: "Divide both sides by sin θ (note: sin θ ≠ 0)",
            equation: "4 cos θ = 2",
          },
          {
            explanation: "Divide both sides by 4",
            equation: "cos θ = 1/2",
          },
          {
            explanation: "Find the angles where cos θ = 1/2",
            equation: "θ = π/3 + 2πn or θ = -π/3 + 2πn, n ∈ Z",
          },
        ],
      };
    } else {
      return {
        title: `Solve for ${type}`,
        method: "General Method",
        equation: "Example equation",
        steps: [
          {
            explanation: "Step 1",
            equation: "Example formula",
          },
        ],
      };
    }
  };

  const equationData = getEquation();

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <View className="p-4">
        <View className="mb-4">
          <Text variant="h2">{equationData.title}</Text>
          <Text variant="body" style={{ marginTop: 4 }}>
            {equationData.method}
          </Text>
        </View>

        <Card variant="outlined" style={{ marginBottom: 24 }}>
          <MathEquation equation={equationData.equation} size="lg" />
          <View className="flex-row justify-end mt-4">
            <Button
              variant="ghost"
              leftIcon={
                <Icon>
                  <Edit />
                </Icon>
              }
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              leftIcon={
                <Icon>
                  <Bookmark />
                </Icon>
              }
            >
              Save
            </Button>
          </View>
        </Card>

        <Text variant="h3" style={{ marginBottom: 16 }}>
          Solution Steps
        </Text>

        <StepByStepSolution steps={equationData.steps} />

        {type === "x" && (
          <View className="mt-6">
            <Text variant="h3" style={{ marginBottom: 16 }}>
              Graph
            </Text>
            <GraphView equation={equationData.equation} height={240} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SolveScreen;
