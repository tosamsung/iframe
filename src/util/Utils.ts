import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { useLocation } from "react-router-dom";

export function addDaysToDate(date: Date | string, daysToAdd: number): Date {
  // Chuyển đổi date thành đối tượng Date nếu cần
  const startDate = typeof date === "string" ? new Date(date) : date;

  // Kiểm tra tính hợp lệ của ngày đầu vào
  if (isNaN(startDate.getTime())) {
    throw new Error("Ngày không hợp lệ");
  }

  // Cộng số ngày vào startDate
  startDate.setDate(startDate.getDate() + daysToAdd);

  return startDate;
}
export function formatDate(date: Date | string, format: string): string {
  const inputDate = typeof date === "string" ? new Date(date) : date;

  // Kiểm tra tính hợp lệ của ngày
  if (isNaN(inputDate.getTime())) {
    throw new Error("Ngày không hợp lệ");
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = String(inputDate.getDate()).padStart(2, "0");

  // Thay thế định dạng
  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day);
}
export function mapFruitShape() {

}
export function checkScreenSize() {
  if (isMobile) {
    return "mobile";
  } 
  if(isTablet) {
    return "tablet";
  } 
  if(isDesktop) {
    return "desktop";
  }
  return "desktop"
}
export function searchParamUrl(params:string){
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  return queryParams.get(params)
}