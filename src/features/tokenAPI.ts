export const fetchToken = (token: string | null) => {
  return new Promise<{data: string | null}>(resolve =>
    setTimeout(() => resolve({data: token}), 500),
  );
};
