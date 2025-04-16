import React from "react";
import { View, Image, type ImageSourcePropType } from "react-native";
import Card from "./card";
import Text from "./text";
import Icon from "./icon";
import { Play } from "lucide-react-native";

interface VideoCardProps {
  title: string;
  source: string;
  thumbnail: ImageSourcePropType;
  duration?: string;
  onPress?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  source,
  thumbnail,
  duration,
  onPress,
}) => {
  return (
    <Card variant="outlined" onPress={onPress} style={{ marginBottom: 8 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ position: "relative", marginRight: 12 }}>
          <Image
            source={thumbnail}
            style={{ width: 80, height: 80, borderRadius: 8 }}
            resizeMode="cover"
          />
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
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: 999,
                padding: 4,
              }}
            >
              <Icon>
                <Play size={16} color="#fff" fill="#fff" />
              </Icon>
            </View>
          </View>
          {duration && (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderRadius: 4,
                paddingHorizontal: 4,
                paddingVertical: 2,
              }}
            >
              <Text variant="caption" color="#fff">
                {duration}
              </Text>
            </View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text weight="medium" numberOfLines={2}>
            {title}
          </Text>
          <Text variant="body-sm" style={{ marginTop: 4 }}>
            {source}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default VideoCard;
