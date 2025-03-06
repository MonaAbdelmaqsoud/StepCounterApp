import { Alert, View, Image, StyleSheet, Text, Pressable } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ImagePicker({}) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadUserImage = async () => {
      try {
        const userImage = await AsyncStorage.getItem("userImage");
        if (userImage) {
          setPickedImage(userImage);
        }
      } catch (error) {
        console.error("Error loading profile picture:", error);
      }
    };
    loadUserImage();
  }, []);

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
      await AsyncStorage.setItem("userImage", image.assets[0].uri);
    }
  }

  return (
    <View style={styles.imageWrapper}>
      <View style={styles.imageContainer}>
        {pickedImage ? (
          <Image source={{ uri: pickedImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons
              name="person-outline"
              size={40}
              color={GlobalStyles.colors.primary500}
            />
          </View>
        )}
      </View>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.imageButton, styles.pressed] : styles.imageButton
        }
        onPress={takeImageHandler}
      >
        <Ionicons name="camera" size={20} color="#fff" />
      </Pressable>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imageWrapper: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    backgroundColor: GlobalStyles.colors.background200,
    overflow: "hidden",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: GlobalStyles.colors.primary500,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
