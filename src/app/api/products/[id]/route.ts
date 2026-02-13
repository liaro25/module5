import { NextResponse } from "next/server";
import { api } from "@/lib/api";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const pid = Number(id);

  if (Number.isNaN(pid)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  try {
    const res = await api.get(`/products/${pid}`);
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.response?.data ?? err?.message ?? "Failed to fetch" },
      { status: err?.response?.status ?? 500 }
    );
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const pid = Number(id);

  if (Number.isNaN(pid)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  const body = await req.json();

  try {
    const res = await api.put(`/products/${pid}`, body);
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.response?.data ?? err?.message ?? "Update failed" },
      { status: err?.response?.status ?? 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const pid = Number(id);

  if (Number.isNaN(pid)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  try {
    const res = await api.delete(`/products/${pid}`);
    return NextResponse.json(res.data ?? { ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.response?.data ?? err?.message ?? "Delete failed" },
      { status: err?.response?.status ?? 500 }
    );
  }
}
