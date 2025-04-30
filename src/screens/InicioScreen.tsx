import React from 'react';
import { View, Text,TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import styles from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function InicioScreen({ navigation }: Props) {
  return (
    <View style={styles.containerInicio}>
      {}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <Text style={styles.titulo}>HelpMe - Apoio Estudantil</Text>
      <Text style={styles.frase}>Organize sua vida acadêmica com praticidade e foco.</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.botaoTexto}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}
