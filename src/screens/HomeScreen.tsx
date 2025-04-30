import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { tarefa } from '../data/Tarefas';
import styles from '../styles/styles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.area}>
        <Text style={styles.titulo}>Minhas Tarefas</Text>

        {tarefa.map((tarefa) => (
          <View key={tarefa.id} style={styles.card}>
            <Text style={styles.cardTitulo}>{tarefa.titulo}</Text>
            <Text style={styles.cardDesc}>{tarefa.descricao}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.botaoContainer}>
        <TouchableOpacity style={styles.botaoTarefa}>
          <Text style={styles.botaoTarefaText}>➕ Nova Tarefa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botaoTarefa, styles.botaoFeito]}>
          <Text style={styles.botaoTarefaText}>🆗 Tarefas Feita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
