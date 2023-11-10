import { isArray } from "lodash";
import IBook from "../../commons/IBook";
import { IWrapper } from "../../commons/IWrapper";
import { Params } from "../../commons/Params";
import { ResponseMessage } from "../../commons/ResponseMessage";
import api from "../../configs/api";

export default function useBook() {
  const DPath = "books";

  async function getBooks(params?: Params): Promise<IWrapper<IBook>> {
    try {
      const result = await api.get<IWrapper<IBook>>(`${DPath}`, { params });
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }
  async function getBook(id: string): Promise<IBook> {
    try {
      const result = await api.get<IBook>(`${DPath}/${id}`);
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function createBook(data: IBook<"CREATE">): Promise<ResponseMessage> {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo);
      formData.append("file", data.file);
      Object.entries(data).forEach(([key, value]) => {
        if (["id", "photo", "file"].includes(key)) return;
        if (isArray(value)) {
          value.forEach((obj, index) => {
            formData.append(`${key}[]`, obj.id);
          });
          return;
        }
        formData.append(key, value);
      });

      const result = await api.post<ResponseMessage>(`${DPath}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function updateBook(data: IBook<"UPDATE">): Promise<ResponseMessage> {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo);
      formData.append("file", data.file);
      Object.entries(data).forEach(([key, value]) => {
        if (
          [
            "id",
            "photo",
            "file",
            "createdAt",
            "updatedAt",
            "rating",
            "total_users_rating",
            "acquisition_id",
            "marked_page",
            "user",
            "free_pages",
          ].includes(key)
        )
          return;
        if (isArray(value)) {
          value.forEach((obj) => {
            formData.append(`${key}[]`, obj.id);
          });
          return;
        }
        formData.append(key, value);
      });
      const result = await api.put<ResponseMessage>(
        `${DPath}/${data.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function deleteBook(id: string): Promise<ResponseMessage> {
    try {
      const result = await api.delete<ResponseMessage>(`${DPath}/${id}`);
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    getBook,
  };
}
