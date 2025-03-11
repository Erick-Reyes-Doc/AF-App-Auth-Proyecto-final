import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSession } from '../../ctx';
import { useNavigation } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

async function migrateDbIfNeeded(db) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync('PRAGMA user_version');
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE tasks (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL);
    `);
    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>📝 Sistema de Tareas</Text>
    </View>
  );
}

function TasksContent() {
  const db = useSQLiteContext();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM tasks');
      setTasks(result);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  };

  const addTask = async () => {
    if (task.trim() === '') return;
    try {
      await db.runAsync('INSERT INTO tasks (text) VALUES (?)', task);
      setTask('');
      await loadTasks();
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await db.runAsync('DELETE FROM tasks WHERE id = ?', id);
      await loadTasks();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [db]);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nueva tarea..."
          placeholderTextColor="#ccc"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>➕</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItemContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default function TasksScreen() {
  const { signOut } = useSession();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={signOut} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#1e1e1e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation, signOut]);

  return (
    <SQLiteProvider databaseName="tasks.db" onInit={migrateDbIfNeeded}>
      <LinearGradient colors={['#3b3b98', '#1e3799']} style={styles.container}>
        <Header />
        <TasksContent />
      </LinearGradient>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButton: {
    marginRight: 10,
    padding: 8,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
  },
  headerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4cd137',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
