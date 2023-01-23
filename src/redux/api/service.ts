export const setDataFormat = (data: any, arg = 'application/json') => {
  if (arg === 'application/json') {
    return JSON.stringify(data);
  } else if (arg === 'multipart/form-data') {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return formData;
  } else {
    return data;
  }
};

export enum ContentType {
    JSON ="application/json",
    FORM_DATA="multipart/form-data"
}

export enum Method {
    GET="GET",
    POST="POST",
    PUT="PUT",
    PATCH="PATCH",
    DELETE="DELETE"
}
