import { Item } from '../models/Item';

class ItemService {
  private items: Item[] = [
    { id: '1', name: 'Item 1', imageUrl: 'https://mundodosprodutos.com.br/wp-content/uploads/2024/07/curiosidades-sobre-o-flamengo.png' },
    { id: '2', name: 'Item 2', imageUrl: 'https://mundodosprodutos.com.br/wp-content/uploads/2024/07/curiosidades-sobre-o-flamengo.png' },
  ];
  deleteItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
  getAllItems(): Item[] {
    return this.items;
  }

  addItem(name: string, imageUrl: string): void {
    const nameTrim = name.trim();
    if(nameTrim.length <= 2){
      throw new Error("O nome do item não pode estar vazio e deve conter mais que 2 caracteres.");
    }
    const isCloned = this.items.some((item) => 
      item.name.toLowerCase() === nameTrim.toLowerCase()
    );
    if (isCloned) {
      throw new Error("Este item já existe na lista.");
    } 
    const newItem: Item = {
      id: Date.now().toString(),
      name: name,
      imageUrl: imageUrl.trim() !== '' ? imageUrl : 'https://mundodosprodutos.com.br/wp-content/uploads/2024/07/curiosidades-sobre-o-flamengo.png', 
    };
    
    this.items.push(newItem);
  }
}

export default new ItemService();