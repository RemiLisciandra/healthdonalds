import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug, category, price, image } = body;

    const existingItem = await prisma.item.findUnique({
      where: { slug },
    });

    if (existingItem) {
      return NextResponse.json(
        { error: "A product with this slug already exists." },
        { status: 400 },
      );
    }

    const imageBuffer = image ? Buffer.from(image, "base64") : null;

    const newItem = await prisma.item.create({
      data: {
        name,
        slug,
        category,
        price,
        image: imageBuffer,
      },
    });

    return NextResponse.json(newItem, { status: 200 });
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
