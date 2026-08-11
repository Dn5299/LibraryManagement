export interface Borrow {
  id: number;

  citizenId: string;
  readers: string;
  title: string;

  quantityBorrow: number;

  // Ngày bắt đầu mượn
  borrowd: string;

  // Hạn trả hiện tại
  dueDate: string;

  // Ngày trả thực tế
  returnd: string;

  note: string;

  // Phí mượn mỗi cuốn mỗi ngày
  unit_price: number;

  // Tiền mượn
  borrow_fee: number;

  // Tiền phạt
  late_fee: number;

  // Tổng tiền
  total_fee: number;
}