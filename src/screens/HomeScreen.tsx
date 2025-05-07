import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, ActivityIndicator } from 'react-native';
import { dbinitialize, getTarefas, marcarTarefaComoFeita, addTarefa, deletarTarefa, resetarBancoDeDados  } from '../database/database';
import styles from '../styles/styles';

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  feita: number;
}

export default function HomeScreen() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFeitas, setShowFeitas] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');

  useEffect(() => {
    const setup = async () => {
      try {
        // await resetarBancoDeDados();
        await dbinitialize();
        const tarefas = await getTarefas(showFeitas);
        setTarefas(tarefas);
      } catch (error) {
        console.error("Erro ao inicializar banco de dados:", error);
      } finally {
        setLoading(false);
      }
    };
    setup();
  }, [showFeitas]);

  const marcarComoFeita = async (id: number) => {
    try {
      await marcarTarefaComoFeita(id);
      const tarefasAtualizadas = await getTarefas(showFeitas);
      setTarefas(tarefasAtualizadas);
    } catch (error) {
      console.error('Erro ao marcar tarefa como feita:', error);
    }
  };

  const handleSalvarTarefa = async () => {
    if (!novoTitulo.trim() || !novaDescricao.trim()) return;

    await addTarefa(novoTitulo.trim(), novaDescricao.trim());
    const novasTarefas = await getTarefas(showFeitas);
    setTarefas(novasTarefas);
    setNovoTitulo('');
    setNovaDescricao('');
    setModalVisible(false);
  };

  const excluirTarefa = async (id: number) => {
    try {
      await deletarTarefa(id);
      const tarefasAtualizadas = await getTarefas(showFeitas);
      setTarefas(tarefasAtualizadas);
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.area}>
        <Text style={styles.titulo}>Minhas Tarefas</Text>

        {}
        <View style={styles.botaoContainer}>
          {}
          <TouchableOpacity
            style={[styles.botaoTarefa, styles.botaoFeito]}
            onPress={() => setShowFeitas(!showFeitas)}
          >
            <Text style={styles.botaoTarefaText}>
              {showFeitas ? '🧾 Mostrar Pendentes' : '🧾 Tarefas Feitas'}
            </Text>
          </TouchableOpacity>

          {}
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

                {showFeitas === false && tarefa.feita === 0 && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                      style={[styles.botaoTarefa, styles.botaoFeito, { flex: 1, marginRight: 5 }]}
                      onPress={() => marcarComoFeita(tarefa.id)}
                    >
                      <Text style={styles.botaoTarefaText}>🆗 Feita</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.botaoTarefa, { backgroundColor: '#cc0000', flex: 1, marginLeft: 5 }]}
                      onPress={() => excluirTarefa(tarefa.id)}
                    >
                      <Text style={styles.botaoTarefaText}>🗑️ Excluir</Text>
                    </TouchableOpacity>
                  </View>

                )}
              </View>
            ))
          ) : (
            <Text style={styles.frase}>Nenhuma tarefa encontrada!</Text>
          )
        )}
      </ScrollView>

      {}
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
