interface IWrapper<T> {
  totalPages?: number;
  totalItems?: number;
  current?: number;
  limit?: number;
  items?: T[];
}

interface IFindAndCountAllObject<T> {
  count: number | any[];
  rows: T[];
}

function paginationWrapper<T>(
  findAndCountAllObject: IFindAndCountAllObject<T>,
  page: number,
  limit: number
) {
  const wrapper: IWrapper<T> = {};
  let count;

  if (Array.isArray(findAndCountAllObject.count)) {
    count = findAndCountAllObject.count.length;
  } else {
    count = findAndCountAllObject.count;
  }

  wrapper.totalPages = Math.ceil(count / limit);
  wrapper.totalItems = parseInt(count as unknown as string);
  wrapper.current = page;
  wrapper.limit = limit;
  wrapper.items = findAndCountAllObject.rows;

  return wrapper;
}

export default paginationWrapper;
