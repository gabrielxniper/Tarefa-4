import { useState, useEffect } from 'react';
import { Item } from '../models/Item';
import ItemService from '../services/ItemService';
import {Alert} from 'react-native';
export class ItemViewModel {
  private _items: Item[] = [];
  private _dialogVisible: boolean = false;
  private _inputText: string = '';
  private _imageUrl: string = '';
  
  private setItemsCallback: ((items: Item[]) => void) | null = null;
  private setDialogVisibleCallback: ((visible: boolean) => void) | null = null;
  private setInputTextCallback: ((text: string) => void) | null = null;

  private setImageUrlCallback: ((text: string) => void) | null = null;


  get items(): Item[] {
    return this._items;
  }

  get dialogVisible(): boolean {
    return this._dialogVisible;
  }

  get inputText(): string {
    return this._inputText;
  }

  get imageUrl(): string { 
    return this._imageUrl; 
  }


  setItemsListener(callback: (items: Item[]) => void) {
    this.setItemsCallback = callback;
  }

  setDialogVisibleListener(callback: (visible: boolean) => void) {
    this.setDialogVisibleCallback = callback;
  }

  setInputTextListener(callback: (text: string) => void) {
    this.setInputTextCallback = callback;
  }

  setImageUrlListener(callback: (text: string) => void) {
    this.setImageUrlCallback = callback;
  }

  
  loadItems(): void {
    this._items = ItemService.getAllItems();
    this.setItemsCallback?.(this._items);
  }

  addItem(): void {
      ItemService.addItem(this._inputText.trim(), this._imageUrl.trim());
      this.loadItems();
      this.setInputText('');
      this.setImageUrl('');
      this.closeDialog();
  }
  confirmarExclusao(id: string): void {
   Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este item?",
      [
        { text: "Cancelar" },
        { text: "Excluir", onPress: () => this.deleteItem(id) }
      ]
    );
  }
  deleteItem(id: string): void {
    ItemService.deleteItem(id);
    this.loadItems();
  }

  openDialog(): void {
    this._dialogVisible = true;
    this.setDialogVisibleCallback?.(this._dialogVisible);
  }
  
  closeDialog(): void {
    this._dialogVisible = false;
    this.setDialogVisibleCallback?.(this._dialogVisible);
  }

  setInputText(text: string): void {
    this._inputText = text;
    this.setInputTextCallback?.(this._inputText);
  }

  setImageUrl(text: string): void { 
    this._imageUrl = text;
    this.setImageUrlCallback?.(this._imageUrl);
  }
}

export const useItemViewModel = () => {
  const [viewModel] = useState(() => new ItemViewModel());
  const [items, setItems] = useState<Item[]>([]);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    viewModel.setItemsListener(setItems);
    viewModel.setDialogVisibleListener(setDialogVisible);
    viewModel.setInputTextListener(setInputText);
    viewModel.setImageUrlListener(setImageUrl); 
    
    viewModel.loadItems();
  }, [viewModel]);

  return {
    viewModel,
    items,
    dialogVisible,
    inputText,
    imageUrl, 
  };
};