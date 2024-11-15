# Modern Portfolio

A beautiful, fully-featured portfolio website built with React, TypeScript, and Firebase.

## Setup Instructions

1. Clone this repository
2. Create a `.env.local` file in the root directory with your Firebase and Unsplash credentials:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_UNSPLASH_ACCESS_KEY=your-unsplash-key
```

3. Set up Firebase Storage Rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/profile/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Install dependencies:
```bash
npm install
```

5. Start the development server:
```bash
npm run dev
```

## Features

- 🎨 Beautiful, responsive design
- 🌙 Dark mode support
- 📱 Mobile-friendly
- 🔥 Firebase authentication and database
- 📝 Blog system
- 💼 Project showcase
- 📧 Contact form
- 📸 Image upload support
- 🖼️ Unsplash integration
- ⚡ Fast and optimized

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Firebase
- Vite
- Framer Motion
- Lucide Icons