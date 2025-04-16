import { useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useTheme } from "@/components/theme/theme-provider";
import { Trash2, Undo, Pencil, Eraser, Check } from "lucide-react-native";
import { Text, Button, Icon, Card, Input } from "@/components/ui";
import { DrawingCanvas } from "@/components/math";

const DrawScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("draw");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [paths, setPaths] = useState([]);
  const router = useRouter();

  const handlePathsChange = (newPaths) => {
    setPaths(newPaths);
  };

  const handleUndo = () => {
    if (paths.length > 0) {
      const newPaths = [...paths];
      newPaths.pop();
      setPaths(newPaths);
    }
  };

  const handleClear = () => {
    setPaths([]);
  };

  const handleSolve = () => {
    // In a real app, you would send the drawing to a recognition service
    // For now, we'll just navigate to the solve screen
    router.push("/solve/x");
  };

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <View className="flex-row justify-center p-2 border-b border-gray-200">
        <Button
          variant={activeTab === "draw" ? "primary" : "secondary"}
          onPress={() => setActiveTab("draw")}
          style={{ marginHorizontal: 4 }}
        >
          Draw
        </Button>
        <Button
          variant={activeTab === "type" ? "primary" : "secondary"}
          onPress={() => setActiveTab("type")}
          style={{ marginHorizontal: 4 }}
        >
          Type
        </Button>
        <Button
          variant={activeTab === "scan" ? "primary" : "secondary"}
          onPress={() => setActiveTab("scan")}
          style={{ marginHorizontal: 4 }}
        >
          Scan
        </Button>
      </View>

      <View className="flex-1 p-4">
        {activeTab === "draw" && (
          <>
            <Card
              variant="outlined"
              style={{
                flex: 1,
                marginBottom: 16,
                padding: 0,
                overflow: "hidden",
              }}
            >
              <DrawingCanvas
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                onPathsChange={handlePathsChange}
              />
              {paths.length === 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text color={colors.secondaryText}>
                    Draw your equation here
                  </Text>
                  <Text
                    variant="body-sm"
                    color={colors.secondaryText}
                    style={{ marginTop: 8 }}
                  >
                    Example: 4x + 5y = 6
                  </Text>
                </View>
              )}
            </Card>

            <View className="flex-row justify-between mb-4">
              <View className="flex-row">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={
                    <Icon>
                      <Undo />
                    </Icon>
                  }
                  onPress={handleUndo}
                  style={{ marginRight: 8 }}
                  isDisabled={paths.length === 0}
                >
                  Undo
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={
                    <Icon>
                      <Trash2 />
                    </Icon>
                  }
                  onPress={handleClear}
                  isDisabled={paths.length === 0}
                >
                  Clear
                </Button>
              </View>

              <View className="flex-row">
                <Button
                  variant={strokeWidth === 3 ? "primary" : "secondary"}
                  size="sm"
                  leftIcon={
                    <Icon>
                      <Pencil />
                    </Icon>
                  }
                  onPress={() => setStrokeWidth(3)}
                  style={{ marginRight: 8 }}
                >
                  Pen
                </Button>
                <Button
                  variant={strokeWidth === 6 ? "primary" : "secondary"}
                  size="sm"
                  leftIcon={
                    <Icon>
                      <Eraser />
                    </Icon>
                  }
                  onPress={() => setStrokeWidth(6)}
                >
                  Thick
                </Button>
              </View>
            </View>

            <Button
              variant="primary"
              leftIcon={
                <Icon>
                  <Check />
                </Icon>
              }
              onPress={handleSolve}
              fullWidth
            >
              Solve
            </Button>
          </>
        )}

        {activeTab === "type" && (
          <>
            <Card variant="outlined" style={{ marginBottom: 16 }}>
              <Text variant="h3" style={{ marginBottom: 16 }}>
                Type Your Equation
              </Text>
              <Input
                placeholder="e.g., x^2 - 4x - 5 = 0"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Card>

            <Button
              variant="primary"
              leftIcon={
                <Icon>
                  <Check />
                </Icon>
              }
              onPress={() => router.push("/solve/x")}
              fullWidth
            >
              Solve
            </Button>
          </>
        )}

        {activeTab === "scan" && (
          <View className="flex-1 items-center justify-center">
            <Text>Camera interface would go here</Text>
            <Button
              variant="primary"
              style={{ marginTop: 16 }}
              onPress={() => router.push("/scan")}
            >
              Go to Scan Screen
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default DrawScreen;
