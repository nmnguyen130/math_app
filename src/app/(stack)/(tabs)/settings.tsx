import { View, ScrollView, Switch, StyleSheet } from "react-native";
import { useTheme } from "@components/theme/theme-provider";
import {
  Moon,
  Sun,
  Info,
  Bell,
  HelpCircle,
  Languages,
} from "lucide-react-native";
import { Text, Card, Icon, Button } from "@components/ui";

const SettingsScreen = () => {
  const { colors, isDarkMode, theme, setTheme } = useTheme();

  const themeOptions = [
    { label: "Light Mode", value: "light", icon: <Sun /> },
    { label: "Dark Mode", value: "dark", icon: <Moon /> },
    { label: "System Default", value: "system", icon: <Info /> },
  ];

  const notificationOptions = [
    { label: "Push Notifications", value: true },
    { label: "Email Notifications", value: false },
  ];

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <View className="p-4">
        <Text variant="h2" style={{ marginBottom: 16 }}>
          Settings
        </Text>

        <View className="mb-6">
          <Text variant="h3" style={{ marginBottom: 12 }}>
            Appearance
          </Text>
          <Card variant="outlined">
            {themeOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                onPress={() => setTheme(option.value as any)}
                style={{
                  justifyContent: "space-between",
                  borderBottomWidth: index < themeOptions.length - 1 ? 1 : 0,
                  borderBottomColor: isDarkMode ? "#404040" : "#e5e5e5",
                  borderRadius: 0,
                  paddingVertical: 12,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon style={{ marginRight: 12 }}>{option.icon}</Icon>
                  <Text>{option.label}</Text>
                </View>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#a3a3a3",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {theme === option.value && (
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: "#1890ff",
                      }}
                    />
                  )}
                </View>
              </Button>
            ))}
          </Card>
        </View>

        <View className="mb-6">
          <Text variant="h3" style={{ marginBottom: 12 }}>
            Notifications
          </Text>
          <Card variant="outlined">
            {notificationOptions.map((option, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderBottomWidth:
                    index < notificationOptions.length - 1 ? 1 : 0,
                  borderBottomColor: isDarkMode ? "#404040" : "#e5e5e5",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon style={{ marginRight: 12 }}>
                    <Bell />
                  </Icon>
                  <Text>{option.label}</Text>
                </View>
                <Switch value={option.value} />
              </View>
            ))}
          </Card>
        </View>

        <View className="mb-6">
          <Text variant="h3" style={{ marginBottom: 12 }}>
            Language
          </Text>
          <Button
            variant="outline"
            leftIcon={
              <Icon>
                <Languages />
              </Icon>
            }
            style={{ justifyContent: "space-between" }}
          >
            <Text>English (US)</Text>
            <Text color={isDarkMode ? "#a3a3a3" : "#737373"}>Change</Text>
          </Button>
        </View>

        <View>
          <Text variant="h3" style={{ marginBottom: 12 }}>
            Help & Support
          </Text>
          <Button
            variant="outline"
            leftIcon={
              <Icon>
                <HelpCircle />
              </Icon>
            }
            style={{ marginBottom: 8 }}
          >
            Help Center
          </Button>
          <Button
            variant="outline"
            leftIcon={
              <Icon>
                <Info />
              </Icon>
            }
          >
            About
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
