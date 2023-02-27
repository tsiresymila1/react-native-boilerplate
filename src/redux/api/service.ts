export const setDataFormat = (
  data: any,
  arg: ContentType = ContentType.JSON,
) => {
  if (arg === ContentType.JSON) {
    return JSON.stringify(data);
  } else if (arg === ContentType.FORM_DATA) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key])) {
        for (const d of data[key]) {
          formData.append(key, d);
        }
      } else {
        formData.append(key, data[key]);
      }
    });
    return formData;
  } else {
    return data;
  }
};

export enum ContentType {
  JSON = 'application/json',
  FORM_DATA = 'multipart/form-data',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
