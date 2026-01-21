export class DateFormatter {

  static forDisplay(date) {
    return date ? new Date(date).toLocaleDateString() : "";
  }

  static forDisplayWithTime(date) {
    return date ? new Date(date).toLocaleString() : "";
  }
  

  static forInput(date) {
    return date ? new Date(date).toISOString().split('T')[0] : "";
  }

  static forInputDateTime(date) {
    return date ? new Date(date).toISOString().slice(0, 16) : "";
  }
}