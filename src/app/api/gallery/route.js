import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const galleryPath = path.join(process.cwd(), "public/images/gallery");

  try {
    const files = fs
      .readdirSync(galleryPath)
      .filter((file) =>
        /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
      );

    const images = files.map((file) => ({
      name: file,
      url: `/images/gallery/${file}`,
    }));

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: "Gallery folder not found." },
      { status: 500 }
    );
  }
}