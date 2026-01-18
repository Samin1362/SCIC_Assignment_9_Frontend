"use client";

import Link from "next/link";
import Image from "next/image";

export default function ItemCard({ item, index = 0 }) {
  // Handle both MongoDB _id and regular id
  const itemId = item._id || item.id;
  // Handle both imageUrl (backend) and image (frontend)
  const imageUrl = item.imageUrl || item.image;

  // Calculate stagger delay based on index
  const delays = [
    "delay-0",
    "delay-75",
    "delay-150",
    "delay-200",
    "delay-250",
    "delay-300",
    "delay-350",
    "delay-400",
    "delay-450",
    "delay-500",
    "delay-550",
    "delay-600",
  ];
  const delayClass = delays[index % delays.length];

  return (
    <Link href={`/items/${itemId}`}>
      <div
        className={`group relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden cursor-pointer h-full transition-all duration-500 hover:bg-white/20 hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 animate-card-appear ${delayClass}`}
      >
        {/* Image Container */}
        <div className="relative w-full h-52 bg-white/5 overflow-hidden">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="text-white text-sm font-medium px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/20">
                  View Details
                </span>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-white/30 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-white/40 text-sm">No Image</span>
              </div>
            </div>
          )}

          {/* Category Badge */}
          {item.category && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full shadow-lg">
                {item.category}
              </span>
            </div>
          )}

          {/* Stock Badge */}
          {item.stock !== undefined && (
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  item.stock > 0
                    ? "bg-emerald-500/90 text-white"
                    : "bg-red-500/90 text-white"
                }`}
              >
                {item.stock > 0 ? `${item.stock} in stock` : "Out of Stock"}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Rating */}
          {item.rating !== undefined && item.rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(item.rating)
                      ? "text-yellow-400"
                      : "text-white/20"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-white/60 text-sm ml-1">
                ({item.rating.toFixed(1)})
              </span>
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-300 transition-colors duration-300">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ${item.price?.toFixed(2)}
              </span>
            </div>

            {/* Arrow Icon */}
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 transition-all duration-300">
              <svg
                className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Gradient Border Effect on Hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20"></div>
        </div>
      </div>
    </Link>
  );
}
