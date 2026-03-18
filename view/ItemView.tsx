import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import { Item } from '../models/Item';
import { useItemViewModel } from '../viewmodels/ItemViewModel';

export const ItemView: React.FC = () => {
  const { viewModel, items, dialogVisible, inputText, imageUrl} = useItemViewModel();

  const handleAddItem = () => {
    try {
      viewModel.addItem();
    }catch (error: any) {
      Alert.alert("Erro", error.message);
    } 
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.itemImage} 
        />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => viewModel.confirmarExclusao(item.id)}
        style={styles.lixeira}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.main}>
      <TouchableOpacity
        onPress={() => viewModel.openDialog()}
        style={styles.additem}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Adicionar Item</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Modal visible={dialogVisible} transparent animationType="slide">
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#707070',
        }}>
          <View style={styles.adicionar}>
            <Text style={styles.title}>Adicionar Item</Text>
            
            <TextInput
              value={inputText}
              onChangeText={(text) => viewModel.setInputText(text)}
              placeholder="Nome do item"
              style={styles.input}
            />
            <TextInput
              value={imageUrl}
              onChangeText={(text) => viewModel.setImageUrl(text)}
              placeholder="URL da Imagem (Ex: https://...)"
              style={styles.input}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => viewModel.closeDialog()}
                style={{ padding: 12, backgroundColor: '#fa9191', borderRadius: 40, flex: 0.45 }}
              >
                <Text style={{ textAlign: 'center' }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleAddItem}
                style={styles.addbutton}
              >
                <Text style={{ color: 'black', textAlign: 'center' }}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 16, 
    backgroundColor: 'white', 
    marginTop: 5,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  main:{ 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#000000"
  },

  lixeira:{
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 40,
    marginBottom: 16,
    alignSelf: "center"
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    marginRight: 12,
    backgroundColor: '#ccc', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#b3f294',
    padding: 8,
    marginBottom: 16,
    borderRadius: 40,
    color: 'white'
  },
  title:{
     fontSize: 18, 
     marginBottom: 16,
     color: 'red',
  },
  adicionar: {
    width: 300,
    padding: 20,
    backgroundColor: '#383636',
    borderRadius: 40,
  },
  additem:{
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 40,
    marginBottom: 16,
  },
  addbutton:{
    padding: 12, 
    backgroundColor: '#ffffff', 
    borderRadius: 40, 
    flex: 0.45 
  }
});