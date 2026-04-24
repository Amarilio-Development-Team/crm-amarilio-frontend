export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const authenticatedFetcher = async ([url, token]: [string, string]) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    let errorMessage = 'Error fetching data';
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.message || errorMessage;
    } catch {}

    throw new ApiError(errorMessage, res.status);
  }

  return res.json();
};
