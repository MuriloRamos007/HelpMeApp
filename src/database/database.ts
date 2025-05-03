// database.ts
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase;

export const dbinitialize = async () => {
  db = await SQLite.openDatabaseSync("tarefas.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      feita INTEGER DEFAULT 0
    );
  `);

  console.log("📁 Banco de dados inicializado.");
};

const tarefasIniciais = [
  { titulo: 'Estudar Matemática', descricao: 'Revisar equações do 2º grau' },
  { titulo: 'Trabalho de História', descricao: 'Finalizar pesquisa sobre a Guerra Fria' },
  { titulo: 'Ler Capítulo de Biologia', descricao: 'Células eucariontes vs. procariontes' },
  { titulo: 'Projeto de Física', descricao: 'Construir modelo de circuito elétrico' },
  { titulo: 'Trabalho de Química', descricao: 'Estudar tabela periódica' },
  { titulo: 'Estudar para a prova de Geografia', descricao: 'Revisar mapa mundi e rios' },
  { titulo: 'Ler livro de Literatura', descricao: 'Analisar as obras de Machado de Assis' },
  { titulo: 'Fazer exercícios de Inglês', descricao: 'Praticar verbos irregulares' },
  { titulo: 'Revisão para a prova de Português', descricao: 'Estudar regras de gramática' },
  { titulo: 'Fazer resumo sobre Filosofia', descricao: 'Estudar principais filósofos' },
  { titulo: 'Trabalho de Arte', descricao: 'Desenhar a perspectiva de um prédio' },
  { titulo: 'Revisão para a prova de História', descricao: 'Estudar Revolução Francesa' },
  { titulo: 'Organizar material de estudo', descricao: 'Separar livros e anotações' },
  { titulo: 'Escrever redação sobre Meio Ambiente', descricao: 'Trabalhar no tema de preservação ambiental' },
  { titulo: 'Resolver questões de Matemática', descricao: 'Praticar problemas de álgebra' },
];

export const popularBase = async () => {
  if (!db) db = await SQLite.openDatabaseSync("tarefas.db");

  const result = await db.getFirstAsync<{ total: number }>("SELECT COUNT(*) AS total FROM tarefas");
  if (result?.total === 0) {
    const insertPromises = tarefasIniciais.map(tarefa =>
      db.runAsync("INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)", [tarefa.titulo, tarefa.descricao])
    );
    await Promise.all(insertPromises);
    console.log("✅ Tarefas iniciais inseridas.");
  } else {
    console.log("⚠️ Base de dados já populada.");
  }
};

export const getTarefas = async (showFeitas: boolean) => {
  if (!db) db = await SQLite.openDatabaseSync("tarefas.db");
  try {
    const filtro = showFeitas ? 1 : 0; // Se showFeitas for true, queremos tarefas feitas (feita = 1)
    const tarefas = await db.getAllAsync("SELECT * FROM tarefas WHERE feita = ?", [filtro]);
    return tarefas;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return [];
  }
};

export const deletarTarefa = async (id: number) => {
  if (!db) db = await SQLite.openDatabaseSync("tarefas.db");
  try {
    await db.runAsync("DELETE FROM tarefas WHERE id = ?", [id]);
    console.log(`❌ Tarefa ${id} deletada.`);
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
  }
};

export const marcarTarefaComoFeita = async (id: number) => {
  if (!db) db = await SQLite.openDatabaseSync("tarefas.db");
  try {
    await db.runAsync("UPDATE tarefas SET feita = 1 WHERE id = ?", [id]);
    console.log(`🆗 Tarefa ${id} marcada como feita.`);
  } catch (error) {
    console.error("Erro ao marcar tarefa como feita:", error);
  }
};

// Função para adicionar tarefa
export const addTarefa = async (titulo: string, descricao: string) => {
  if (!db) db = await SQLite.openDatabaseSync("tarefas.db");
  try {
    await db.runAsync(
      "INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)",
      [titulo, descricao]
    );
    console.log("🆕 Tarefa adicionada com sucesso.");
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
};