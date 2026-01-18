"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getItemById } from "@/lib/api";

export default function ItemDetailsPage({ params }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const { id } = await params;
        const data = await getItemById(id);
        setItem(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch item:", err);
        setError("Failed to load item details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [params]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 mb-4">
          {error}
        </div>
        <Link
          href="/items"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Back to Items
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 mb-4">
          Item not found
        </div>
        <Link
          href="/items"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Back to Items
        </Link>
      </div>
    );
  }

  // Handle both imageUrl (backend) and image (frontend)
  const imageUrl = item.imageUrl || item.image;
  // Handle reviews - backend returns array, display count or list
  const reviewCount = Array.isArray(item.reviews) ? item.reviews.length : item.reviews;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link
        href="/items"
        className="text-blue-600 hover:text-blue-700 font-semibold mb-8 inline-block"
      >
        ← Back to Items
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-md">
        {/* Image */}
        <div className="flex items-center justify-center">
          <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <span className="text-gray-500 text-lg">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{item.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-blue-600">
              ${item.price?.toFixed(2)}
            </span>
            {item.stock !== undefined && (
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  item.stock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
              </span>
            )}
          </div>

          <div className="border-t pt-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-wrap">
              {item.description}
            </p>
          </div>

          {/* Additional Details */}
          {(item.category || item.rating || reviewCount) && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              {item.category && (
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">Category:</span>{" "}
                  {item.category}
                </p>
              )}
              {item.rating > 0 && (
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">Rating:</span>{" "}
                  {item.rating} / 5 ⭐
                </p>
              )}
              {reviewCount > 0 && (
                <p>
                  <span className="font-semibold text-gray-700">Reviews:</span>{" "}
                  {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                </p>
              )}
            </div>
          )}

          {/* Reviews Section */}
          {Array.isArray(item.reviews) && item.reviews.length > 0 && (
            <div className="border-t pt-4 mb-6">
              <h2 className="text-lg font-semibold mb-3">Customer Reviews</h2>
              <div className="space-y-3">
                {item.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">
                        {review.author}
                      </span>
                      <span className="text-yellow-500">
                        {"⭐".repeat(review.rating)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition">
              Add to Cart
            </button>
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
