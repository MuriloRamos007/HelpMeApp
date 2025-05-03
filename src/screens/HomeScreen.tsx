import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, ActivityIndicator } from 'react-native';
import { dbinitialize, getTarefas, marcarTarefaComoFeita, addTarefa } from '../database/database';
import styles from '../styles/styles';

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  feita: number; // 0 para pendente, 1 para feita
}

export default function HomeScreen() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFeitas, setShowFeitas] = useState(false); // Controla se mostramos tarefas feitas ou pendentes

  // Modal e estados para adicionar nova tarefa
  const [modalVisible, setModalVisible] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');

  // Carregar tarefas do banco de dados com base em `showFeitas`
  useEffect(() => {
    const setup = async () => {
      try {
        await dbinitialize(); // Inicializa o banco de dados
        const tarefas = await getTarefas(showFeitas); // Passa `showFeitas` para buscar as tarefas certas
        setTarefas(tarefas); // Atualiza o estado com as tarefas
      } catch (error) {
        console.error("Erro ao inicializar banco de dados:", error);
      } finally {
        setLoading(false);
      }
    };
    setup();
  }, [showFeitas]); // Atualiza as tarefas sempre que `showFeitas` mudar

  const marcarComoFeita = async (id: number) => {
    try {
      await marcarTarefaComoFeita(id); // Marca a tarefa como feita no banco
      // Atualiza as tarefas após marcar como feita
      const tarefasAtualizadas = await getTarefas(showFeitas);
      setTarefas(tarefasAtualizadas); // Atualiza o estado com as tarefas
    } catch (error) {
      console.error('Erro ao marcar tarefa como feita:', error);
    }
  };

  const handleSalvarTarefa = async () => {
    if (!novoTitulo.trim() || !novaDescricao.trim()) return;

    await addTarefa(novoTitulo.trim(), novaDescricao.trim()); // Adiciona nova tarefa
    const novasTarefas = await getTarefas(showFeitas); // Atualiza as tarefas
    setTarefas(novasTarefas); // Atualiza o estado com as tarefas
    setNovoTitulo('');
    setNovaDescricao('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.area}>
        <Text style={styles.titulo}>Minhas Tarefas</Text>

        {/* Botões para alternar entre tarefas feitas e pendentes */}
        <View style={styles.botaoContainer}>
          {/* Botão de alternar entre tarefas feitas ou pendentes */}
          <TouchableOpacity
            style={[styles.botaoTarefa, styles.botaoFeito]}
            onPress={() => setShowFeitas(!showFeitas)}
          >
            <Text style={styles.botaoTarefaText}>
              {showFeitas ? 'Mostrar Pendentes' : '🧾 Mostrar Feitas'}
            </Text>
          </TouchableOpacity>

          {/* Botão "Nova Tarefa" */}
          <TouchableOpacity style={styles.botaoTarefa} onPress={() => setModalVisible(true)}>
            <Text style={styles.botaoTarefaText}>➕ Nova Tarefa</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          tarefas.length > 0 ? (
            tarefas.map((tarefa) => (
              <View key={tarefa.id} style={styles.card}>
                <Text style={styles.cardTitulo}>{tarefa.titulo}</Text>
                <Text style={styles.cardDesc}>{tarefa.descricao}</Text>

                {showFeitas === false && tarefa.feita === 0 && ( // Mostrar o botão para marcar como feita apenas para tarefas pendentes
                  <TouchableOpacity
                    style={[styles.botaoTarefa, styles.botaoFeito]}
                    onPress={() => marcarComoFeita(tarefa.id)} // Marca a tarefa como feita
                  >
                    <Text style={styles.botaoTarefaText}>🆗 Tarefa Feita</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.frase}>Nenhuma tarefa encontrada!</Text>
          )
        )}
      </ScrollView>

      {/* Modal para adicionar nova tarefa */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Nova Tarefa</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Título"
              value={novoTitulo}
              onChangeText={setNovoTitulo}
            />
            <TextInput
              style={styles.modalTextarea}
              placeholder="Descrição"
              value={novaDescricao}
              onChangeText={setNovaDescricao}
              multiline
            />
            <TouchableOpacity style={styles.modalSalvarBotao} onPress={handleSalvarTarefa}>
              <Text style={styles.modalSalvarTexto}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelarBotao} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
