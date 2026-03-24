import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useItemViewModel } from '../../viewmodels/ItemViewModel';
import { Item } from '../../models/Item';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeView: React.FC = () => {
    const navigation = useNavigation<HomeNavigationProp>();

    const { items, viewModel } = useItemViewModel();
    useFocusEffect(
        useCallback(() => {
            viewModel.loadItems();
        }, [viewModel])
    );
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
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Excluir</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.main}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Adicionar')}
                style={styles.additem}
            >
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
                    Adicionar Item
                </Text>
            </TouchableOpacity>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    main: { 
        flex: 1, 
        padding: 16, 
        backgroundColor: "#000000" 
    },
    additem: { 
        backgroundColor: 'red', 
        padding: 14, 
        borderRadius: 40, 
        marginBottom: 16 
    },
    item: { 
        padding: 16, 
        backgroundColor: 'white', 
        marginTop: 5, 
        borderRadius: 20, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center" 
    },
    itemContent: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        flex: 1 
    },
    itemImage: { width: 50, 
        height: 50, 
        borderRadius: 25,
        marginRight: 12, 
        backgroundColor: '#ccc' 
    },
    itemText: { 
        fontSize: 16, 
        color: 'black',
        fontWeight: 'bold', 
        flexShrink: 1 
    },
    lixeira: {
        backgroundColor: 'red', 
        paddingVertical: 10, 
        paddingHorizontal: 16, 
        borderRadius: 20 
    }
});