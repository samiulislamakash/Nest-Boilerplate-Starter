import { diskStorage } from 'multer';
import { getConnection, ILike } from 'typeorm';

//? To Number
export function toNumber(value: string): number {
  return parseInt(value, 10);
}

//? To Bool
export function toBool(value: string): boolean {
  return value === 'true';
}

export const storageOptions = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  const fileType: string =
    file.originalname.split('.')[file.originalname.split('.').length - 1];
  return `${Date.now()}.${fileType}`;
}

export function entityMapper(entity: any, dto: any) {
  const model = new entity();
  const fields = getConnection()
    .getMetadata(entity)
    .ownColumns.map((column) => column.propertyName);
  const keys = Object.keys(dto);

  for (const key of keys) {
    if (fields.indexOf(key) != -1) {
      model[key] = dto[key];
    }
  }
  return model;
}

export function filterEntityFieldsFromDto(entity: any, dto: any) {
  let filteredDto = {};

  const fields = getConnection()
    .getMetadata(entity)
    .ownColumns.map((column) => column.propertyName);
  const keys = Object.keys(dto);

  for (const key of keys) {
    if (fields.indexOf(key) != -1) {
      if (dto[key] == null || dto[key] == undefined || dto[key]?.length == 0)
        continue;
      // if (typeof dto[key] === 'string') filteredDto[key] = ILike(`%${dto[key]}%`);
      else filteredDto[key] = dto[key];
    }
  }
  return filteredDto;
}

/**
 *
 * @param object Main Class
 * @param dto Request Object
 * @returns filter Object
 */
export function filterDtoFieldsFromObject(object: any, dto: any) {
  let filteredObject = {};

  Object.keys(dto).map((key) => {
    let field = object[key];
    if (dto[field] !== undefined) {
      if (typeof dto[field] != 'string') filteredObject[key] = dto[key];
      else {
        if (dto[field]?.length > 0) filteredObject[key] = dto[key];
      }
    }
  });

  return filteredObject;
}

export function getPaginationParameters(param: any) {
  try {
    const take = param.take != undefined ? +param.take : 20;
    const page = param.page != undefined ? +param.page : 1;
    const skip = (page - 1) * take;

    return { take, page, skip };
  } catch (error) {
    throw new Error('invalid pagination parameters.');
  }
}

export function generateOTP() {
  let digits: string = '0123456789';
  let OTP: string = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export function getMonthRangeWithIndexFromStartDateAndEndDate(
  startDateString: string,
  endDateString: string,
) {
  let response = {};
  let index = 0;
  let startDate = new Date(startDateString);
  let endDate = new Date(endDateString);

  while (startDate <= endDate) {
    response[`${startDate.getMonth()}-${startDate.getFullYear()}`] = index++;
    startDate.setMonth(startDate.getMonth() + 1);
  }

  return response;
}

export function roundNumber(number: number, decimalPlaces: number) {
  if (Number.isInteger(number)) return number.toFixed(0);
  else if (number == null || isNaN(number)) return null;
  else return number.toFixed(decimalPlaces);
}

export function arrayOfArrayVerticalSum(array: any) {
  var sum = [];
  var columns = array[0].length;

  for (var i = 0; i < columns; i++) sum.push(0);

  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < columns; j++) {
      let d = parseFloat(array[i][j]);
      if (isNaN(d)) continue;
      sum[j] += parseFloat(array[i][j]);
    }
  }

  return sum;
}

export function getYearsArrayFromStartDateAndEndDate(
  startDate: any,
  endDate: any,
) {
  let years = [];
  let startYear = new Date(startDate).getFullYear();
  let endYear = new Date(endDate).getFullYear();
  for (var i = startYear; i <= endYear; i++) years.push(i);

  return years;
}

export function getValidNumberOrZero(number: any) {
  if (
    number != null &&
    number != undefined &&
    number != Infinity &&
    !isNaN(number)
  )
    return number;
  else return 0;
}

export function generateStartDateEndDateFromYear(year: number) {
  let startDate = new Date(`1-01-${year}`);
  let endDate = new Date(`12-01-${year}`);

  return { startDate, endDate };
}

export function isSameDate(date1, date2): boolean {
  return (
    new Date(new Date(date1).setHours(0, 0, 0, 0)).getTime() ==
    new Date(new Date(date2).setHours(0, 0, 0, 0)).getTime()
  );
}

export function setTimeZero(date): Date {
  return new Date(new Date(date).setHours(0, 0, 0, 0));
}
