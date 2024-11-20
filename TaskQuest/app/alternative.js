import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

export default function SignInWithGoogleButton() {
  const webClientId = '207537132897-48j7u5v34vg3qi3e71e290842o228occ.apps.googleusercontent.com';
  const iosClientId = '207537132897-f7lkp5m4ftlp39m0srgtv9aa1dntq70o.apps.googleusercontent.com';
  const router = useRouter();

  const config = {
    webClientId,
    iosClientId,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const handleToken = () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log("Access Token:", token);
      router.push('/tabs')
    }
  };

  useEffect(() => {
    if (response) {
      console.log(response);
      handleToken();
    }
  }, [response]);

  return (
    <View style={styles.body}>
      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: '#007AFF', // Blue colour for the button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
});
