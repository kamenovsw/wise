import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Home() {
  const [nome, setNome] = useState("pedro aveleira");
  const [valor, setValor] = useState("40");

  useEffect(() => {
    async function configurar() {
      await Notifications.requestPermissionsAsync();
    }

    configurar();
  }, []);

  async function gerarNotificacao() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Você acabou de receber dinheiro",
        body: `${nome} enviou ${valor} EUR. O valor já está na sua conta e pronto para usar.`,
        sound: true,
      },
      trigger: null,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>WISE DEMO</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        placeholderTextColor="#888"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={gerarNotificacao}
      >
        <Text style={styles.buttonText}>
          GERAR NOTIFICAÇÃO
        </Text>
      </TouchableOpacity>

      <View style={styles.preview}>
        <Text style={styles.previewTitle}>
          Você acabou de receber dinheiro
        </Text>

        <Text style={styles.previewText}>
          {nome} enviou {valor} EUR. O valor já está na sua conta e pronto para
          usar.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    justifyContent: "center",
  },

  logo: {
    color: "#6CFF45",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#6CFF45",
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },

  preview: {
    backgroundColor: "#151515",
    borderRadius: 20,
    padding: 18,
    marginTop: 25,
  },

  previewTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },

  previewText: {
    color: "#ddd",
    fontSize: 18,
    lineHeight: 26,
  },
});