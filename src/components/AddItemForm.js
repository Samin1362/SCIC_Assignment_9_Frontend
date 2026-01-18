"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { createItem, isLoggedIn } from "@/lib/api";

const itemSchema = z.object({
  name: z.string().min(3, "Item name must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  price: z.coerce
    .number()
    .min(0.01, "Price must be greater than 0")
    .max(999999, "Price is too high"),
  category: z.string().min(2, "Category is required"),
  stock: z.coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
  image: z
    .string()
    .url("Please provide a valid image URL")
    .optional()
    .or(z.literal("")),
});

// Icon Components
const TagIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const CurrencyIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CategoryIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const InventoryIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

const ImageIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

export default function AddItemForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    const loggedIn = isLoggedIn();
    setIsAuthenticated(loggedIn);

    if (!loggedIn) {
      toast.error("Please login to add items");
      router.push("/login");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      stock: 0,
      image: "",
    },
  });

  const imageUrl = watch("image");

  const onSubmit = async (data) => {
    if (!isLoggedIn()) {
      toast.error("Please login to add items");
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const itemData = {
        ...data,
        image: data.image || undefined,
      };

      await createItem(itemData);
      toast.success("Item added successfully!");
      reset();
      setTimeout(() => router.push("/items"), 1500);
    } catch (error) {
      console.error("Error adding item:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        router.push("/login");
      } else if (error.response?.data?.details) {
        const details = error.response.data.details;
        const errorMessages = Object.values(details).join(", ");
        toast.error(`Validation error: ${errorMessages}`);
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to add item. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 mt-4 font-medium">
            Verifying your session...
          </p>
        </div>
      </div>
    );
  }

  const inputBaseClass = `
    w-full px-4 py-3.5 pl-12
    bg-gray-50 border-2 border-gray-200
    rounded-xl
    text-gray-900 text-base
    placeholder:text-gray-400 placeholder:font-normal
    transition-all duration-300 ease-out
    focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
    hover:border-gray-300 hover:bg-gray-100/50
    outline-none
  `;

  const labelClass = `
    block text-sm font-semibold text-gray-700 mb-2
    flex items-center gap-2
  `;

  const iconWrapperClass = (fieldName) => `
    absolute left-4 top-1/2 -translate-y-1/2
    transition-colors duration-300
    ${
      focusedField === fieldName
        ? "text-blue-600"
        : errors[fieldName]
        ? "text-red-400"
        : "text-gray-400"
    }
  `;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Item Name */}
      <div
        className="transform transition-all duration-300 hover:translate-x-1"
        style={{ animationDelay: "0.1s" }}
      >
        <label htmlFor="name" className={labelClass}>
          <TagIcon />
          Product Name
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className={iconWrapperClass("name")}>
            <TagIcon />
          </div>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Enter a catchy product name..."
            className={inputBaseClass}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1 animate-shake">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="transform transition-all duration-300 hover:translate-x-1">
        <label htmlFor="description" className={labelClass}>
          <DocumentIcon />
          Description
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-4 text-gray-400 transition-colors duration-300">
            <DocumentIcon />
          </div>
          <textarea
            {...register("description")}
            id="description"
            placeholder="Describe your product in detail. Include features, specifications, and what makes it special..."
            rows={4}
            className={`${inputBaseClass} pt-4 resize-none`}
            onFocus={() => setFocusedField("description")}
            onBlur={() => setFocusedField(null)}
          />
        </div>
        {errors.description && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Price, Category, Stock Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Price */}
        <div className="transform transition-all duration-300 hover:translate-x-1">
          <label htmlFor="price" className={labelClass}>
            <CurrencyIcon />
            Price (USD)
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className={iconWrapperClass("price")}>
              <span className="text-lg font-bold">$</span>
            </div>
            <input
              {...register("price")}
              type="number"
              id="price"
              placeholder="99.99"
              step="0.01"
              className={inputBaseClass}
              onFocus={() => setFocusedField("price")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="transform transition-all duration-300 hover:translate-x-1">
          <label htmlFor="category" className={labelClass}>
            <CategoryIcon />
            Category
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className={iconWrapperClass("category")}>
              <CategoryIcon />
            </div>
            <input
              {...register("category")}
              type="text"
              id="category"
              placeholder="Electronics, Fashion..."
              className={inputBaseClass}
              onFocus={() => setFocusedField("category")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
          {errors.category && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Stock */}
        <div className="transform transition-all duration-300 hover:translate-x-1">
          <label htmlFor="stock" className={labelClass}>
            <InventoryIcon />
            Stock Quantity
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className={iconWrapperClass("stock")}>
              <InventoryIcon />
            </div>
            <input
              {...register("stock")}
              type="number"
              id="stock"
              placeholder="100"
              className={inputBaseClass}
              onFocus={() => setFocusedField("stock")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
          {errors.stock && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.stock.message}
            </p>
          )}
        </div>
      </div>

      {/* Image URL */}
      <div className="transform transition-all duration-300 hover:translate-x-1">
        <label htmlFor="image" className={labelClass}>
          <ImageIcon />
          Product Image URL
          <span className="text-gray-400 text-xs font-normal ml-1">
            (Optional)
          </span>
        </label>
        <div className="relative">
          <div className={iconWrapperClass("image")}>
            <ImageIcon />
          </div>
          <input
            {...register("image")}
            type="url"
            id="image"
            placeholder="https://example.com/your-product-image.jpg"
            className={inputBaseClass}
            onFocus={() => setFocusedField("image")}
            onBlur={() => setFocusedField(null)}
          />
        </div>
        {errors.image && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.image.message}
          </p>
        )}

        {/* Image Preview */}
        {imageUrl && (
          <div className="mt-3 p-3 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 animate-fade-in">
            <p className="text-xs text-gray-500 mb-2 font-medium">
              Image Preview:
            </p>
            <div className="relative w-full h-32 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="hidden w-full h-full items-center justify-center text-gray-400 text-sm">
                Unable to load image
              </div>
            </div>
          </div>
        )}

        <p className="text-gray-500 text-xs mt-2 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Provide a direct link to your product image for best results
        </p>
      </div>

      {/* Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500 flex items-center gap-2">
            <SparkleIcon />
            Ready to publish?
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-4 px-6
          bg-gradient-to-r from-blue-600 to-purple-600
          hover:from-blue-700 hover:to-purple-700
          disabled:from-gray-400 disabled:to-gray-500
          text-white font-semibold text-lg
          rounded-xl
          shadow-lg shadow-blue-500/30
          hover:shadow-xl hover:shadow-blue-500/40
          transform hover:-translate-y-0.5
          transition-all duration-300
          flex items-center justify-center gap-3
          group
        `}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Creating Product...</span>
          </>
        ) : (
          <>
            <SparkleIcon />
            <span>Add Product to Marketplace</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </>
        )}
      </button>

    </form>
  );
}
