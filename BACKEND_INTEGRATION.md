# Backend Integration Guide

This guide explains how to integrate the frontend with your backend API for authentication.

## Environment Configuration

Create a `.env.local` file in the root directory with your backend URL:

```env
VITE_API_URL=http://localhost:4000
```

Replace `http://localhost:4000` with your actual backend URL.

## Backend API Endpoints Required

Your backend should implement the following endpoints:

### 1. User Registration
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string", 
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "msg": "User registered successfully"
  }
  ```

### 2. User Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "msg": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

### 3. Token Verification (Optional)
- **Endpoint**: `GET /api/auth/verify`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "valid": true,
    "user": {
      "id": "string",
      "username": "string", 
      "email": "string"
    }
  }
  ```

### 4. User Logout (Optional)
- **Endpoint**: `POST /api/auth/logout`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "msg": "Logged out successfully"
  }
  ```

## Error Handling

The frontend expects error responses in this format:

```json
{
  "success": false,
  "msg": "Error message here"
}
```

## Features Implemented

### ✅ Authentication Context
- Manages user state globally
- Handles token storage and verification
- Automatic logout on token expiry

### ✅ Login Page
- Form validation
- Error handling
- Loading states
- Redirects to home page on success

### ✅ Signup Page  
- Form validation
- Password confirmation
- Error handling
- Loading states
- Redirects to login page on success

### ✅ Navbar
- Shows username when logged in
- Shows "Crypto Tax Mate" when not logged in
- Logout functionality
- Loading state during auth check

### ✅ Token Management
- Automatic token storage in localStorage
- Token verification on app load
- Automatic cleanup on logout

## Testing the Integration

1. Start your backend server
2. Update the `VITE_API_URL` in `.env.local`
3. Run the frontend: `npm run dev`
4. Test registration and login flows

## Security Notes

- Tokens are stored in localStorage (consider using httpOnly cookies for production)
- All API calls include proper error handling
- Token verification happens on app initialization
- Automatic logout when token is invalid

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend allows requests from your frontend URL
2. **Network Errors**: Check that `VITE_API_URL` points to the correct backend URL
3. **Token Issues**: Ensure your backend returns the expected response format
4. **TypeScript Errors**: Make sure all imports are using the correct paths

### Debug Mode:

Check the browser console for detailed error messages. The auth service logs all API calls and errors.
