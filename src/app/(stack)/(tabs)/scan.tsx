import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useTheme } from "@components/theme/theme-provider";
import {
  Image as ImageIcon,
  Scan as ScanIcon,
  Check,
  X,
  Lightbulb,
} from "lucide-react-native";
import { Text, Button, Icon, Card } from "@components/ui";
import { MathEquation } from "@components/math";
import { Camera, CameraType, CameraView, PermissionStatus } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

const ScanScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  const [scanComplete, setScanComplete] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>();
  const [cameraPermission, setCameraPermission] =
    useState<PermissionStatus | null>(null);
  const [mediaPermission, setMediaPermission] =
    useState<MediaLibrary.PermissionResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status);

      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      setMediaPermission(mediaStatus);
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          skipProcessing: true,
        });
        setImageUri(photo.uri);
        simulateProcessing();
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);
      simulateProcessing();
    }
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setScanComplete(true);
    }, 1500);
  };

  const resetCamera = () => {
    setImageUri(null);
    setScanComplete(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    cameraContainer: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    frameOverlay: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    frame: {
      width: "80%",
      height: "33%",
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 12,
    },
    tipCard: {
      position: "absolute",
      top: 16,
      left: 16,
      right: 16,
      padding: 12,
    },
    controlsContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
    },
    captureButtonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 16,
    },
    captureButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 4,
      borderColor: colors.primary,
    },
    captureButtonInner: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary,
    },
    buttonsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    imagePreview: {
      flex: 1,
    },
    processingOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: "center",
    },
    processingCard: {
      padding: 24,
      width: "80%",
      alignItems: "center",
    },
    progressBar: {
      height: 8,
      width: "100%",
      backgroundColor: colors.highlight,
      borderRadius: 4,
      overflow: "hidden",
      marginVertical: 16,
    },
    progressFill: {
      height: "100%",
      width: "75%",
      backgroundColor: colors.primary,
    },
    imageControls: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    controlButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    cancelButton: {
      backgroundColor: isDarkMode ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
    },
    confirmButton: {
      backgroundColor: colors.primary,
    },
    resultContainer: {
      flex: 1,
      padding: 16,
    },
    solutionCard: {
      marginBottom: 16,
    },
    highlightedCard: {
      marginBottom: 16,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    solutionHeader: {
      marginBottom: 8,
    },
    solvedBadge: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },
    graphPlaceholder: {
      height: 160,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode ? colors.highlight : "#f5f5f5",
      borderRadius: 8,
      marginTop: 8,
    },
    buttonsContainer: {
      flexDirection: "row",
      marginTop: 16,
    },
    permissionContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    permissionText: {
      textAlign: "center",
      marginBottom: 16,
    },
  });

  if (cameraPermission !== "granted") {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera access is required to use this feature.
        </Text>
        <Button
          variant="primary"
          onPress={() => Camera.requestCameraPermissionsAsync()}
        >
          Grant Camera Permission
        </Button>
      </View>
    );
  }

  if (mediaPermission?.status !== "granted") {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Media access is required to use this feature.
        </Text>
        <Button
          variant="primary"
          onPress={() => MediaLibrary.requestPermissionsAsync()}
        >
          Grant Media Permission
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanComplete ? (
        <>
          {imageUri ? (
            <View style={styles.cameraContainer}>
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              {isProcessing ? (
                <View style={styles.processingOverlay}>
                  <Card variant="elevated" style={styles.processingCard}>
                    <Text className="text-center mb-4">
                      Processing image...
                    </Text>
                    <View style={styles.progressBar}>
                      <View style={styles.progressFill} />
                    </View>
                    <Text variant="body-sm" className="text-center">
                      Analyzing math equation...
                    </Text>
                  </Card>
                </View>
              ) : (
                <View style={styles.imageControls}>
                  <TouchableOpacity
                    style={[styles.controlButton, styles.cancelButton]}
                    onPress={resetCamera}
                  >
                    <Icon>
                      <X color={isDarkMode ? "#fff" : "#000"} />
                    </Icon>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.controlButton, styles.confirmButton]}
                    onPress={() => setScanComplete(true)}
                  >
                    <Icon>
                      <Check color="#fff" />
                    </Icon>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            <CameraView
              ref={cameraRef}
              facing={cameraType}
              style={styles.camera}
            >
              <View style={styles.frameOverlay}>
                <View style={styles.frame} />
              </View>

              <Card variant="elevated" style={styles.tipCard}>
                <Text variant="body-sm" className="text-center">
                  Position your math problem within the frame
                </Text>
              </Card>

              <View style={styles.controlsContainer}>
                <View style={styles.captureButtonContainer}>
                  <TouchableOpacity
                    style={styles.captureButton}
                    onPress={takePicture}
                  >
                    <View style={styles.captureButtonInner} />
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonsRow}>
                  <Button
                    variant="secondary"
                    leftIcon={
                      <Icon>
                        <ImageIcon />
                      </Icon>
                    }
                    onPress={pickImage}
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    Gallery
                  </Button>

                  <Button
                    variant="secondary"
                    leftIcon={
                      <Icon>
                        <ScanIcon />
                      </Icon>
                    }
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    Tips
                  </Button>
                </View>
              </View>
            </CameraView>
          )}
        </>
      ) : (
        <ScrollView style={styles.resultContainer}>
          <Text variant="h2" className="mb-4">
            Algebra Assignment
          </Text>

          <Card variant="outlined" style={styles.solutionCard}>
            <View className="p-3">
              <Text weight="medium" style={styles.solutionHeader}>
                1. Solve the linear equation
              </Text>
              <MathEquation equation="(2x-3)/5 + (4x-1)/10 = 1" />
            </View>
          </Card>

          <Card variant="outlined" style={styles.highlightedCard}>
            <View className="p-3">
              <Text weight="medium" style={styles.solutionHeader}>
                Solve for x
              </Text>
              <MathEquation equation="x = 17/8 - 1/8 = 2.125" isHighlighted />
              <View style={styles.solvedBadge}>
                <Icon className="mr-2">
                  <Lightbulb size={16} color={colors.primary} />
                </Icon>
                <Text color={colors.primary}>Solution found</Text>
              </View>
            </View>
          </Card>

          <Text weight="medium" className="mb-2">
            Steps for Solving Linear Equation
          </Text>

          <Button
            variant="primary"
            className="mb-4"
            onPress={() => router.push("/(stack)/solve/x")}
          >
            Get step-by-step solution
          </Button>

          <Card variant="outlined" className="mb-4">
            <View className="p-3">
              <Text weight="medium" className="mb-2">
                Graph
              </Text>
              <View style={styles.graphPlaceholder}>
                <Text color={colors.secondaryText}>
                  Graph visualization would appear here
                </Text>
              </View>
            </View>
          </Card>

          <View style={styles.buttonsContainer}>
            <Button
              variant="outline"
              leftIcon={
                <Icon>
                  <Check />
                </Icon>
              }
              className="flex-1 mr-2"
              onPress={resetCamera}
            >
              Scan Another
            </Button>

            <Button
              variant="primary"
              className="flex-1"
              onPress={() => router.push("/(stack)/solve/x")}
            >
              Solve
            </Button>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ScanScreen;
