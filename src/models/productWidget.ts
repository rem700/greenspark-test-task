export interface IProductWidget {
  id: number;
  type: string;
  amount: number;
  action: string;
  active: boolean;
  linked: boolean;
  selectedColor: 'blue' |'green' | 'beige' | 'white' | 'black';
}
