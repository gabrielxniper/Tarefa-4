import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useItemViewModel } from '../../viewmodels/ItemViewModel';

type AddNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Adicionar'>;

export const AddView: React.FC = () => {
  const navigation = useNavigation<AddNavigationProp>();

  const { viewModel, inputText, imageUrl } = useItemViewModel();

  const handleAddItem = () => {
    try {
      viewModel.addItem();
      Alert.alert("Sucesso", "Produto adicionado com sucesso!",[
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.adicionarBox}>
        <Text style={styles.title}>Novo Item</Text>

        <TextInput
          value={inputText}
          onChangeText={(text) => viewModel.setInputText(text)}
          placeholder="Nome do item"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <TextInput
          value={imageUrl}
          onChangeText={(text) => viewModel.setImageUrl(text)}
          placeholder="URL da Imagem (Opcional)"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <View style={styles.linhaBotoes}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.addbutton, { backgroundColor: '#fa9191' }]}
          >
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAddItem}
            style={styles.addbutton}
          >
            <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#000000' 
  },
  adicionarBox: { 
    width: '90%', 
    padding: 24, 
    backgroundColor: '#1e1e1e', 
    borderRadius: 30, 
    borderWidth: 1, 
    borderColor: '#333' 
  },
  title: { fontSize: 24, 
    marginBottom: 20, 
    color: 'red', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: 'red', 
    padding: 14, 
    marginBottom: 16, 
    borderRadius: 20, 
    color: 'white', 
    backgroundColor: '#000', 
    fontSize: 16 
  },
  linhaBotoes: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 
  },
  addbutton: { 
    padding: 14, 
    backgroundColor: '#ffffff', 
    borderRadius: 40, 
    flex: 0.47 
  }
});