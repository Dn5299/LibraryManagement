export interface Borrow {
  id: number;
  citizenId: string;
  readers: string;
  title: string;
  quantityBorrow: number;
  borrowd: string;
  returnd: string;
  note: string;
  unit_price: number;
  borrow_fee: number;
  late_fee: number;
  total_fee: number;
}