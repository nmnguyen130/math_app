import React from "react";
import { Text, Card } from "@components/ui";
import { useTheme } from "@components/theme/theme-provider";
import { formatMathExpression } from "@utils/helpers";

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
  const { colors } = useTheme();

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

  return (
    <Card
      variant={showBorder ? "outlined" : "filled"}
      style={{
        backgroundColor: isHighlighted ? `${colors.primary}20` : colors.card,
        borderColor: isHighlighted ? colors.primary : colors.border,
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
