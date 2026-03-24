import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';


import { HomeView } from '../view/screens/HomeView';
import { AddView } from '../view/screens/AddView';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home" 
            screenOptions={{
                headerStyle: { backgroundColor: '#000000' }, // Topo preto
                headerTintColor: 'red',                      // Letra e seta vermelhas
                headerTitleStyle: { fontWeight: 'bold' },
            }}>

            <Stack.Screen 
                name="Home" 
                component = { HomeView }
                options = {{ title: 'Catálogo de Itens' }} 
            />
            <Stack.Screen
                name = "Adicionar"
                component = { AddView } 
                options = {{ title: 'Novo Item' }} 
            />

        </Stack.Navigator>
    );
};