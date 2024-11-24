import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router'; // Importa o roteador do expo-router

// Configura o redirecionamento para o navegador
WebBrowser.maybeCompleteAuthSession();

// Caminho do logo principal e do ícone do Google
const logo = require('../../assets/images/logo.png');
const googleIcon = require('../../assets/images/google-icon.png');

const LoginScreen = () => {
  const router = useRouter(); // Inicializa o roteador para navegação

  // Configurar o provedor de autenticação com o Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '913028070234-7ju7v1rtjd9pqkg1gtd3btolobb3aesa.apps.googleusercontent.com',
  });

  // Verificar o resultado da autenticação
  useEffect(() => {
    if (response?.type === 'success') {
      router.push('/cadastro'); // Redireciona para a tela de cadastro
    }
  }, [response]);

  const handleLogin = () => {
    router.push('/cadastro'); // Redireciona para a tela de cadastro ao clicar no botão "Entrar"
  };

  return (
    <View style={styles.container}>
      {/* Adicionando o logo principal */}
      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>Vamos começar a adotar!</Text>

      {/* Campo de Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Campo de Senha */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão com ícone do Google */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request} // Desabilita se o request não estiver pronto
      >
        <Image source={googleIcon} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f2f4',
  },
  logo: {
    width: 150, // Largura do logo principal
    height: 150, // Altura do logo principal
    marginBottom: 20, // Espaçamento abaixo do logo principal
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%', // Faz o container preencher 80% da largura
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5, // Espaçamento entre o label e o campo de entrada
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    backgroundColor: '#761e4a',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    width: '80%',
    flexDirection: 'row', // Organiza o ícone e texto em linha
    justifyContent: 'center', // Centraliza os elementos
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  googleIcon: {
    width: 20, // Largura do ícone do Google
    height: 20, // Altura do ícone do Google
    marginRight: 10, // Espaçamento entre o ícone e o texto
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
