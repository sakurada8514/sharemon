//共通使用関数
export function setRequestParams(formData: any): FormData {
  const params = new FormData();
  for (let key in formData) {
    params.append(`${key}`, formData[key]);
  }
  return params;
}

export function formatDate(date: Date, format: string): string {
  date = new Date(date);
  format = format.replace(/yyyy/g, "" + date.getFullYear());
  format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ("00" + date.getMilliseconds()).slice(-3));
  return format;
}
