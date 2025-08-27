import { getReviews } from '@/actions/review';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId')!;
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 5);

  const reviews = await getReviews(productId, {
    limit,
    page,
  });

  return NextResponse.json(reviews);
}
