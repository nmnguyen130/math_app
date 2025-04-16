import React from "react";
import { Text, Card } from "@/components/ui";
import { useTheme } from "@/components/theme/theme-provider";
import { formatMathExpression } from "@/utils/helpers";
import { Colors } from "@/constants/theme";

interface MathEquationProps {
  equation: string;
  isHighlighted?: boolean;
  showBorder?: boolean;
  size?: "sm" | "md" | "lg";
}

const MathEquation: React.FC<MathEquationProps> = ({
  equation,
  isHighlighted = false,
  showBorder = true,
  size = "md",
}) => {
  const { isDarkMode } = useTheme();

  const getFontSize = () => {
    switch (size) {
      case "sm":
        return 16;
      case "md":
        return 20;
      case "lg":
        return 24;
      default:
        return 20;
    }
  };

  const getBackgroundColor = () => {
    if (isHighlighted) {
      return isDarkMode ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.1)";
    }
    return isDarkMode ? Colors.dark.card : Colors.light.card;
  };

  return (
    <Card
      variant={showBorder ? "outlined" : "filled"}
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: isHighlighted ? Colors.primary[500] : undefined,
        padding: size === "sm" ? 8 : size === "lg" ? 16 : 12,
      }}
    >
      <Text
        variant="math"
        style={{
          fontSize: getFontSize(),
          textAlign: "center",
        }}
      >
        {formatMathExpression(equation)}
      </Text>
    </Card>
  );
};

export default MathEquation;
