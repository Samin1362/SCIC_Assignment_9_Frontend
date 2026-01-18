# ItemHub - Next.js Frontend

A modern, full-featured e-commerce frontend built with **Next.js 16**, featuring authentication, item management, and a responsive user interface.

## 📋 Project Overview

ItemHub is a Next.js application that demonstrates:

- **Public Landing Page** with 7+ informational sections
- **Authentication System** with cookie-based session management
- **Item Listing & Details** pages fetching from an Express API
- **Protected Routes** for authenticated users
- **Add Item Form** for creating new products (protected route)
- **Toast Notifications** for user feedback
- **Fully Responsive Design** with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Express server running on `http://localhost:5000` (for API)

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create/edit `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📂 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication routes
│   │   ├── login/
│   │   │   └── page.js      # Login page
│   │   └── layout.js        # Auth layout
│   ├── (public)/            # Public routes
│   │   ├── items/
│   │   │   ├── page.js      # Items list page
│   │   │   └── [id]/
│   │   │       └── page.js  # Item details page
│   │   └── layout.js        # Public layout (Navbar + Footer)
│   ├── (protected)/         # Protected routes (auth required)
│   │   ├── items/
│   │   │   └── add/
│   │   │       └── page.js  # Add item page
│   │   └── layout.js        # Protected layout
│   ├── api/
│   │   └── auth/
│   │       ├── login.js     # Login API route
│   │       └── logout.js    # Logout API route
│   ├── layout.js            # Root layout
│   ├── page.js              # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── Navbar.js            # Navigation bar
│   ├── Footer.js            # Footer
│   ├── ItemCard.js          # Item card component
│   ├── LoginForm.js         # Login form
│   └── AddItemForm.js       # Add item form
├── lib/
│   ├── api.js               # API client utilities
│   └── auth.js              # Authentication utilities
├── middleware.js            # Route protection middleware
└── .env.local              # Environment variables
```

## 🔐 Authentication

### Mock Login

The application uses **hardcoded credentials** for development:

**Demo Credentials:**

- **Email:** `user@example.com`
- **Password:** `password123`

### How It Works

1. User submits login form
2. Server validates credentials
3. HTTP-only cookie is set for session
4. Middleware protects routes based on cookie
5. Logout clears the session cookie

### Protected Routes

- `/items/add` - Add new item (requires authentication)
- Unauthenticated users are automatically redirected to login page

## 📄 Route Summary

| Route         | Type      | Authentication | Purpose           |
| ------------- | --------- | -------------- | ----------------- |
| `/`           | Public    | No             | Landing page      |
| `/items`      | Public    | No             | Browse all items  |
| `/items/[id]` | Public    | No             | View item details |
| `/login`      | Public    | No             | User login        |
| `/items/add`  | Protected | Yes            | Add new item      |

## ✨ Implemented Features

### ✅ Core Features

- [x] **Landing Page** - 7 sections (Hero, Features, How It Works, Testimonials, CTA, FAQ, Newsletter)
- [x] **Navbar & Footer** - Navigation and footer on all pages
- [x] **Authentication** - Mock login with hardcoded credentials
- [x] **Cookie-based Sessions** - HTTP-only cookies for security
- [x] **Route Protection** - Middleware prevents unauthorized access
- [x] **Item List Page** - Fetches items from Express API
- [x] **Item Details Page** - Dynamic routing for individual items
- [x] **Item Card Component** - Reusable card displaying item info
- [x] **Protected Add Item Page** - Form to create new items
- [x] **Form Validation** - Client-side validation with Zod
- [x] **Toast Notifications** - User feedback with Sonner
- [x] **Responsive Design** - Mobile-first Tailwind CSS styling
- [x] **Error Handling** - Graceful error states and messages

### 📚 Additional Features

- [x] Loading states for async operations
- [x] Error boundaries and fallback UI
- [x] Image support with Next.js Image component
- [x] Environment variable configuration
- [x] Code documentation

## 🛠️ Technologies Used

| Category          | Technology                 |
| ----------------- | -------------------------- |
| **Framework**     | Next.js 16 (App Router)    |
| **Styling**       | Tailwind CSS v4            |
| **Forms**         | react-hook-form            |
| **Validation**    | Zod                        |
| **HTTP Client**   | Axios                      |
| **Notifications** | Sonner                     |
| **Font**          | Geist (Google Fonts)       |
| **Linting**       | ESLint with Next.js config |

## 📦 Dependencies

### Core Dependencies

```json
{
  "next": "16.1.3",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "tailwindcss": "^4",
  "axios": "latest",
  "react-hook-form": "latest",
  "zod": "latest",
  "sonner": "latest"
}
```

## 🔄 API Integration

### Base URL

Configured via `NEXT_PUBLIC_API_URL` environment variable.

### Available Endpoints

**Items:**

- `GET /items` - Fetch all items
- `GET /items/:id` - Get item details
- `POST /items` - Create new item

**Authentication:**

- `POST /auth/login` - Authenticate user
- `POST /auth/logout` - Destroy session

## 🎨 Styling

- **Framework:** Tailwind CSS v4
- **Colors:** Blue primary (#0066FF), Gray neutral palette
- **Responsive:** Mobile-first approach with breakpoints (sm, md, lg, xl)
- **Components:** Pre-styled cards, buttons, forms, modals

## ⚙️ Environment Variables

| Variable              | Purpose              | Example                     |
| --------------------- | -------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | Express API base URL | `http://localhost:5000/api` |

## 🧪 Testing Routes Locally

1. **Start Express API:**

   ```bash
   # In backend project directory
   npm start
   ```

2. **Start Next.js frontend:**

   ```bash
   npm run dev
   ```

3. **Test in browser:**
   - Home: http://localhost:3000
   - Items: http://localhost:3000/items
   - Login: http://localhost:3000/login
   - Add Item (after login): http://localhost:3000/items/add

## 📋 Form Specifications

### Login Form

- **Fields:** Email, Password
- **Validation:** Email format, minimum 6 characters for password
- **Submit:** POST to `/api/auth/login`

### Add Item Form

- **Fields:** Name, Description, Price, Category, Stock, Image URL
- **Validation:** Minimum lengths, positive numbers, valid URLs
- **Submit:** POST to `/api/items` via API client

## 🔒 Security Considerations

- ✅ HTTP-only cookies for session storage
- ✅ Secure flag for cookies in production
- ✅ SameSite protection against CSRF
- ✅ Client-side form validation
- ✅ Error messages don't expose sensitive data
- ⚠️ Mock authentication is for development only

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

This is an assignment project. To make improvements:

1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit for review

## 📝 Notes

- **Demo credentials are hardcoded** for development - replace with real auth in production
- **API URL is configurable** via `.env.local` - change to match your backend
- **Image URLs must be absolute** - relative paths won't display properly
- **Middleware protects `/items/add`** - customize route patterns as needed

## 🐛 Troubleshooting

**Items not loading?**

- Verify Express API is running on correct port
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Open browser console for error details

**Login not working?**

- Ensure you're using correct credentials: `user@example.com` / `password123`
- Check if cookies are enabled in browser
- Verify API route is responding

**Images not displaying?**

- Ensure image URL is fully qualified (http://... or https://...)
- Check if image domain is allowed in Next.js config

## 📞 Support

For issues or questions, refer to:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hook Form Guide](https://react-hook-form.com/)

---

**Assignment 9 - ItemHub Frontend** | Built with ❤️ using Next.js 16
