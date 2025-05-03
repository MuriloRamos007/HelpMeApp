import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import styles from '../styles/styles';
import { dbinitialize, popularBase } from '../database/database';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function InicioScreen({ navigation }: Props) {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const iniciar = async () => {
      await dbinitialize();
      await popularBase();
      setCarregando(false);
    };
    iniciar();
  }, []);
  

  if (carregando) {
    return (
      <View style={styles.containerInicio}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerInicio}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.titulo}>HelpMe - Apoio Estudantil</Text>
      <Text style={styles.frase}>Organize sua vida acadêmica com praticidade e foco.</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.botaoTexto}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}
