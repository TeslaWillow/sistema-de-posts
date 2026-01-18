export class ApiResponse {
  static success(data: unknown, message: string = 'OK') {
    return { success: true, message, data };
  }

  static error(message: string, status: number = 400) {
    return { success: false, message, status };
  }
}
