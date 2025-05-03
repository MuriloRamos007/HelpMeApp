import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerInicio: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  titulo: {
    fontSize: 28,
    marginTop: 10,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  frase: {
    fontSize: 20,
    marginBottom: 20,
    padding: 20,
    textAlign: 'center',
    color: '#555',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  botao: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: 130,
    alignSelf: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  botaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  botaoTarefa: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoFeito: {
    backgroundColor: '#2196F3',
  },
  botaoTarefaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  area: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
  },

  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  modalTextarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    height: 80,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  modalSalvarBotao: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  modalSalvarTexto: {
    color: 'white',
    textAlign: 'center',
  },
  modalCancelarBotao: {
    marginTop: 10,
  },
  modalCancelarTexto: {
    color: 'red',
    textAlign: 'center',
  },
});

export default styles;
