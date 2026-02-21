// 1) Mock modules dulu (Jest hoists ini)
jest.mock("@/lib/api", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const jsonMock = jest.fn();

jest.mock("next/server", () => ({
  NextResponse: {
    json: (...args: any[]) => jsonMock(...args),
  },
}));

// 2) Baru import route handlers setelah mock siap
import * as ProductsRoute from "../app/api/products/route";
import * as ProductByIdRoute from "../app/api/products/[id]/route";

// 3) Ambil api mock object dari module yang sudah dimock
import { api } from "@/lib/api";

function makeReqJson(body: any) {
  return {
    json: async () => body,
  } as any as Request;
}

describe("API Routes: /api/products", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/products", () => {
    it("returns list of products", async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({ data: [{ id: 1 }, { id: 2 }] });

      await ProductsRoute.GET();

      expect(api.get).toHaveBeenCalledWith("/products");
      expect(jsonMock).toHaveBeenCalledWith([{ id: 1 }, { id: 2 }]);
    });
  });

  describe("POST /api/products", () => {
    it("creates product and returns 201", async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({ data: { id: 99, title: "New" } });

      const req = makeReqJson({
        title: "New",
        price: 123,
        description: "desc",
        categoryId: 1,
        images: ["x"],
        extraField: "ignored",
      });

      await ProductsRoute.POST(req);

      expect(api.post).toHaveBeenCalledWith("/products", {
        title: "New",
        price: 123,
        description: "desc",
        categoryId: 1,
        images: ["x"],
      });

      expect(jsonMock).toHaveBeenCalledWith(
        { id: 99, title: "New" },
        { status: 201 },
      );
    });
  });
});

describe("API Routes: /api/products/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

  describe("GET /api/products/[id]", () => {
    it("returns 400 when id is invalid", async () => {
      await ProductByIdRoute.GET({} as any, ctx("abc") as any);

      expect(jsonMock).toHaveBeenCalledWith(
        { message: "Invalid id" },
        { status: 400 },
      );
      expect(api.get).not.toHaveBeenCalled();
    });

    it("returns product by id", async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({ data: { id: 1, title: "P" } });

      await ProductByIdRoute.GET({} as any, ctx("1") as any);

      expect(api.get).toHaveBeenCalledWith("/products/1");
      expect(jsonMock).toHaveBeenCalledWith({ id: 1, title: "P" });
    });

    it("propagates axios error response status/data", async () => {
      (api.get as jest.Mock).mockRejectedValueOnce({
        response: { status: 404, data: { message: "Not found" } },
      });

      await ProductByIdRoute.GET({} as any, ctx("999") as any);

      expect(jsonMock).toHaveBeenCalledWith(
        { message: { message: "Not found" } },
        { status: 404 },
      );
    });

    it("handles unknown error shape with 500", async () => {
      (api.get as jest.Mock).mockRejectedValueOnce(new Error("boom"));

      await ProductByIdRoute.GET({} as any, ctx("2") as any);

      expect(jsonMock).toHaveBeenCalledWith(
        { message: "boom" },
        { status: 500 },
      );
    });
  });

  describe("PUT /api/products/[id]", () => {
    it("returns 400 when id is invalid", async () => {
      const req = makeReqJson({ title: "x" });

      await ProductByIdRoute.PUT(req, ctx("nope") as any);

      expect(jsonMock).toHaveBeenCalledWith(
        { message: "Invalid id" },
        { status: 400 },
      );
      expect(api.put).not.toHaveBeenCalled();
    });

    it("updates product and returns data", async () => {
      (api.put as jest.Mock).mockResolvedValueOnce({ data: { id: 1, title: "Updated" } });

      const body = { title: "Updated", price: 200 };
      const req = makeReqJson(body);

      await ProductByIdRoute.PUT(req, ctx("1") as any);

      expect(api.put).toHaveBeenCalledWith("/products/1", body);
      expect(jsonMock).toHaveBeenCalledWith({ id: 1, title: "Updated" });
    });

    it("propagates axios error response status/data", async () => {
      (api.put as jest.Mock).mockRejectedValueOnce({
        response: { status: 400, data: { message: "Bad request" } },
      });

      const req = makeReqJson({ title: "" });

      await ProductByIdRoute.PUT(req, ctx("1") as any);

      expect(jsonMock).toHaveBeenCalledWith(
        { message: { message: "Bad request" } },
        { status: 400 },
      );
    });

    it("handles unknown error shape with 500", async () => {
      (api.put as jest.Mock).mockRejectedValueOnce(new Error("update boom"));

      const req = makeReqJson({ title: "x" });

      await ProductByIdRoute.PUT(req, ctx("1") as any);

      expect(jsonMock).toHaveBeenCalledWith(
        { message: "update boom" },
        { status: 500 },
      );
    });
  });

  describe("DELETE /api/products/[id]", () => {
    it("returns 400 when id is invalid", async () => {
      await ProductByIdRoute.DELETE({} as any, ctx("abc") as any);

      expect(jsonMock).toHaveBeenCalledWith(
        { message: "Invalid id" },
        { status: 400 },
      );
      expect(api.delete).not.toHaveBeenCalled();
    });

    it("deletes product and returns ok true if data is empty", async () => {
      (api.delete as jest.Mock).mockResolvedValueOnce({ data: undefined });

      await ProductByIdRoute.DELETE({} as any, ctx("1") as any);

      expect(api.delete).toHaveBeenCalledWith("/products/1");
      expect(jsonMock).toHaveBeenCalledWith({ ok: true });
    });

    it("returns delete response data when present", async () => {
      (api.delete as jest.Mock).mockResolvedValueOnce({ data: { success: true } });

      await ProductByIdRoute.DELETE({} as any, ctx("1") as any);

      expect(jsonMock).toHaveBeenCalledWith({ success: true });
    });

    it("propagates axios error response status/data", async () => {
      (api.delete as jest.Mock).mockRejectedValueOnce({
        response: { status: 403, data: { message: "Forbidden" } },
      });

      await ProductByIdRoute.DELETE({} as any, ctx("1") as any);

      expect(jsonMock).toHaveBeenCalledWith(
        { message: { message: "Forbidden" } },
        { status: 403 },
      );
    });

    it("handles unknown error shape with 500", async () => {
      (api.delete as jest.Mock).mockRejectedValueOnce(new Error("delete boom"));

      await ProductByIdRoute.DELETE({} as any, ctx("1") as any);

      expect(jsonMock).toHaveBeenCalledWith(
        { message: "delete boom" },
        { status: 500 },
      );
    });
  });
});