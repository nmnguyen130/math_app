import { useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useTheme } from "@/components/theme/theme-provider";
import {
  Camera,
  Image as ImageIcon,
  Scan as ScanIcon,
  Check,
} from "lucide-react-native";
import { Text, Button, Icon, Card } from "@/components/ui";
import { MathEquation } from "@/components/math";
import { Colors } from "@/constants/theme";

const ScanScreen = () => {
  const { isDarkMode } = useTheme();
  const [scanComplete, setScanComplete] = useState(false);
  const router = useRouter();

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      {!scanComplete ? (
        <>
          <View className="flex-1 items-center justify-center p-4">
            <View className="w-full h-3/4 border-2 border-blue-500 rounded-xl items-center justify-center">
              <Text style={{ textAlign: "center", paddingHorizontal: 32 }}>
                Position your math problem within the frame and take a photo
              </Text>
            </View>
          </View>

          <View className="p-4">
            <View className="flex-row justify-center mb-4">
              <Button
                variant="primary"
                size="lg"
                style={{ borderRadius: 999, width: 64, height: 64 }}
                onPress={() => setScanComplete(true)}
              >
                <Icon>
                  <Camera size={28} />
                </Icon>
              </Button>
            </View>

            <View className="flex-row justify-between">
              <Button
                variant="ghost"
                leftIcon={
                  <Icon>
                    <ImageIcon />
                  </Icon>
                }
              >
                Gallery
              </Button>

              <Button
                variant="ghost"
                leftIcon={
                  <Icon>
                    <ScanIcon />
                  </Icon>
                }
              >
                Tips
              </Button>
            </View>
          </View>
        </>
      ) : (
        <View className="flex-1 p-4">
          <Text variant="h2" style={{ marginBottom: 16 }}>
            Algebra Assignment
          </Text>

          <Card variant="outlined" style={{ marginBottom: 16 }}>
            <Text weight="medium" style={{ marginBottom: 8 }}>
              1. Solve the linear equation
            </Text>
            <MathEquation equation="(2x-3)/5 + (4x-1)/10 = 1" />
          </Card>

          <Card variant="outlined" style={{ marginBottom: 16 }}>
            <Text weight="medium" style={{ marginBottom: 8 }}>
              Solve for x
            </Text>
            <MathEquation equation="x = 17/8 - 1/8 = 2.125" isHighlighted />
          </Card>

          <Text weight="medium" style={{ marginBottom: 8 }}>
            Steps for Solving Linear Equation
          </Text>

          <Button
            variant="primary"
            fullWidth
            style={{ marginBottom: 16 }}
            onPress={() => router.push("/solve/x")}
          >
            Get step-by-step solution
          </Button>

          <Card variant="outlined" style={{ marginBottom: 16 }}>
            <Text weight="medium" style={{ marginBottom: 8 }}>
              Graph
            </Text>
            <View
              style={{
                height: 160,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDarkMode ? "#262626" : "#f5f5f5",
                borderRadius: 8,
              }}
            >
              <Text
                color={
                  isDarkMode
                    ? Colors.dark.secondaryText
                    : Colors.light.secondaryText
                }
              >
                Graph visualization would appear here
              </Text>
            </View>
          </Card>

          <Button
            variant="outline"
            leftIcon={
              <Icon>
                <Check />
              </Icon>
            }
            fullWidth
            onPress={() => setScanComplete(false)}
          >
            Scan Another Problem
          </Button>
        </View>
      )}
    </View>
  );
};

export default ScanScreen;
