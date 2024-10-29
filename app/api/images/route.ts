import prisma from '@/lib/prisma';
import { TestImage, TestImageApiResponse } from '@/lib/testImage/testImageSlice';
import { NextResponse } from 'next/server';

// 查询所有镜像库
export async function GET() {
  const imagesView = await getTestImags();
  const response: TestImageApiResponse = {
    images: imagesView,
    total: 20,
    pageSize: 10,
    current: 1,
  };

  return NextResponse.json(response);
}

async function getTestImags(): Promise<TestImage[]> {
  const images = await prisma.testImage.findMany({ include: { user: true } });

  return images.map((item) => ({
    id: item.id,
    imageName: item.name,
    user: item.user.name,
    count: item.count,
  }));
}
