import type z from "zod";

export type DataServiceError = {
  error: {
    message: string;
  };
};

export const DATA_URL = import.meta.env.VITE_DATA_ENDPOINT;

export const processResponse = async <T>(
  response: Response,
  schema: z.ZodType<T>,
): Promise<T> => {
  if (!response.ok) {
    const errorData = (await response.json()) as DataServiceError;
    const errorMessage =
      errorData.error.message ||
      `Failed to fetch stocks pct changes. Status ${response.status}`;
    throw new Error(errorMessage);
  }
  const responseData = await response.json();
  const parsedResult = schema.safeParse(responseData.data);
  if (parsedResult.success) {
    return parsedResult.data;
  }
  throw new Error(parsedResult.error.message);
};
