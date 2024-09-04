import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { BottomSheetMenu } from '@/components/BottomSheets';

const ConfigPage = () => {
  // Obtém o userId dos parâmetros da URL
  const { userId } = useLocalSearchParams();

  console.log('User ID in Config Page:', userId); // Adiciona um log para verificar o valor
  console.log('TO AQUIII')

  // Configura os itens do menu para o BottomSheetMenu
  const menuItems = [
    { label: 'Configuração Geral', value: 'general' },
    { label: 'Perfil', value: 'profile' },
    { label: 'Logout', value: 'logout' },
    // Outros itens conforme necessário
  ];

  return (
    <BottomSheetMenu items={menuItems} />
  );
};

export default ConfigPage;
