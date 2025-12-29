# Frontend-Backend Integration Guide 🎵

## Kya Ho Gaya? (What's Done?)

### 1. **Frontend Integration** ✅
- **File**: `moody/frontend/src/components/FacialExpression.jsx`
- **Changes**:
  - ✅ Axios import kiya gaya
  - ✅ `detectMood()` function mein axios GET request add ho gaya
  - ✅ Jab user "Detect Mood" button click kare:
    - Face detection ho jayegi
    - Emotion detect ho jayegi (happy, sad, neutral, etc)
    - Axios ke through backend ko call hoga: `http://localhost:3000/songs?mood=detected_emotion`
    - Backend se response milega aur songs fetch hongi

### 2. **Backend API Fix** ✅
- **File**: `moody/backend/src/routes/song.routes.js`
- **Changes**:
  - ✅ GET `/songs` endpoint ko fix kiya (syntax error tha)
  - ✅ Proper error handling add ki
  - ✅ Response structure improve kiya
  - ✅ Console logging add ki debugging ke liye

### 3. **Backend CORS Setup** ✅
- **File**: `moody/backend/src/app.js`
- **Changes**:
  - ✅ CORS middleware add ki
  - ✅ Frontend (http://localhost:5173) se request accept hongi
  - ✅ JSON & URL-encoded data support

### 4. **Dependencies** ✅
- **Backend**: `cors` package add kiya package.json mein

---

## Kaise Chalayenge? (How to Run?)

### **Step 1: Backend Setup**
```bash
cd moody/backend
pnpm install  # CORS package install ho jayegi
```

### **Step 2: Backend Start**
```bash
node server.js
# Server will run on: http://localhost:3000
```

### **Step 3: Frontend Setup (New Terminal)**
```bash
cd moody/frontend
pnpm install
```

### **Step 4: Frontend Start**
```bash
pnpm run dev
# Frontend will run on: http://localhost:5173
```

---

## Flow Diagram 📊

```
User Face
    ↓
Detect Button Click (Frontend)
    ↓
Face-API detect emotion (happy, sad, neutral, angry, etc)
    ↓
Axios GET request to Backend:
    GET http://localhost:3000/songs?mood=happy
    ↓
Backend receives query & finds songs with same mood
    ↓
MongoDB se songs fetch hongi
    ↓
Response frontend ko milega:
    {
        message: "Songs fetched successfully",
        mood: "happy",
        totalSongs: 3,
        songs: [...]
    }
    ↓
Frontend me alert dikhai degi
Console me response dekh sakte ho
```

---

## Console Logs dekho Debugging ke liye 🔍

### Frontend Console (DevTools mein F12 press karo):
```
"Sending mood to backend: HAPPY"
"Backend response: {message: "Songs fetched successfully", ...}"
```

### Backend Terminal:
```
"Fetching songs for mood: happy"
```

---

## API Endpoint

### GET `/songs`
**Query Parameter**: `mood` (happy, sad, neutral, angry, surprised, disgusted, fearful)

**Example**:
```
http://localhost:3000/songs?mood=happy
```

**Response**:
```json
{
    "message": "Songs fetched successfully",
    "mood": "happy",
    "totalSongs": 5,
    "songs": [
        {
            "_id": "...",
            "title": "Song Name",
            "artist": "Artist Name",
            "audio": "url_from_imagekit",
            "mood": "happy"
        }
    ]
}
```

---

## Agar Kuch Ghalat Ho To... 🛠️

### Error: "CORS Error"
- ✅ Backend mein CORS add hua hai, check karke restart karo

### Error: "Cannot connect to server"
- ✅ Backend running hai? `http://localhost:3000` mein check karo
- ✅ Frontend port sahi hai? `http://localhost:5173`

### Error: "Mood songs nahi mil rahe"
- ✅ Database mein songs add kiye ho?
- ✅ Mood name exactly match ho rahi hai? (lowercase mein bhejo)

---

## Files Modified 📝

1. `moody/frontend/src/components/FacialExpression.jsx` - Axios integration
2. `moody/backend/src/routes/song.routes.js` - API fix & error handling
3. `moody/backend/src/app.js` - CORS middleware
4. `moody/backend/package.json` - CORS dependency

---

**Ready to go! Just follow the steps above and enjoy the mood-based music! 🎉**
