import AddItemForm from "@/components/AddItemForm";

export const metadata = {
  title: "Add Item - ItemHub",
  description: "Add a new item to ItemHub",
};

export default function AddItemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
            Add New Product
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Create a new listing for your marketplace. Fill in the details below
            to get started.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-slide-up">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-white/30"></div>
              <div className="w-3 h-3 rounded-full bg-white/30"></div>
              <div className="w-3 h-3 rounded-full bg-white/30"></div>
              <span className="ml-4 text-white/80 text-sm font-medium">
                Product Details Form
              </span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-10">
            <AddItemForm />
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center text-gray-500 text-sm animate-fade-in delay-300">
          <p>
            Need help?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Check our guidelines
            </a>{" "}
            for adding products.
          </p>
        </div>
      </div>

    </div>
  );
}
