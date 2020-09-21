import * as moment from 'moment';

export const formatDate = (dateNum: string | number, isDue = false): string => {
  if (!/^\d+$/.test(dateNum.toString())) {
    throw new TypeError(`${dateNum}传递的数据格式化错误`);
  }
  if (isDue) {
    return moment(dateNum).format('YYYY-MM-DD');
  } else {
    return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
  }
};

export const getDay = (date: Date = new Date()): string => {
  return moment(date).format('YYYYMMDD');
};

export const getTime = (): number => {
  return new Date().getTime();
};
