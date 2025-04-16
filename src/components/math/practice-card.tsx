import React from "react";
import { View } from "react-native";
import { Card, Icon, Text } from "@/components/ui";
import { FileText, CheckCircle } from "lucide-react-native";
import { Colors } from "@/constants/theme";

interface PracticeCardProps {
  equation: string;
  type: string;
  index: number;
  isCompleted?: boolean;
  onPress?: () => void;
}

const PracticeCard: React.FC<PracticeCardProps> = ({
  equation,
  type,
  index,
  isCompleted = false,
  onPress,
}) => {
  return (
    <Card variant="outlined" onPress={onPress} style={{ marginBottom: 8 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text weight="medium">
            {index + 1}. {equation}
          </Text>
          <Text
            variant="body-sm"
            color={isCompleted ? Colors.success : undefined}
            style={{ marginTop: 4 }}
          >
            {type} {isCompleted && "• Completed"}
          </Text>
        </View>
        <Icon>
          {isCompleted ? <CheckCircle color={Colors.success} /> : <FileText />}
        </Icon>
      </View>
    </Card>
  );
};

export default PracticeCard;
