# Quick Fix Reference

## 🔥 Firebase Auth Not Working?

### Quick Checks:
1. Open browser console (F12)
2. Look for "Firebase initialized successfully"
3. If not there, check internet connection
4. Go to Firebase Console → Authentication → Enable Email/Password and Google

### Common Errors:
```
❌ "auth/configuration-not-found"
✅ Enable Authentication in Firebase Console

❌ "auth/network-request-failed"  
✅ Check internet connection

❌ "auth/invalid-api-key"
✅ Verify API key in firebase.js

❌ "auth/popup-closed-by-user"
✅ User closed popup - try again
```

## 📱 Mobile Preview Not Aligned?

### Quick Fixes:
1. Clear cache: Ctrl+Shift+R (hard reload)
2. Check mobile-responsive.css is imported
3. Verify viewport meta tag in index.html
4. Test in Chrome DevTools device mode

### Expected Behavior:
```
✅ Single column on mobile (< 640px)
✅ Thumbnails: 160px height, scale 0.28
✅ No horizontal scrolling
✅ Smooth vertical scrolling
✅ Preview panel hidden on mobile
```

## 🎨 Dark Mode Not Working on Mobile?

### Quick Fixes:
1. Check html.dark class is applied
2. Verify mobile-responsive.css has theme rules
3. Clear localStorage: `localStorage.clear()`
4. Hard reload: Ctrl+Shift+R

## 🚀 Quick Test Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint

# Preview production build
npm run preview
```

## 📊 Quick Device Test

### Chrome DevTools:
```
1. F12 → DevTools
2. Ctrl+Shift+M → Device mode
3. Select iPhone 12 Pro
4. Test features
```

### Real Device:
```
1. Find IP: ipconfig
2. Mobile browser: http://YOUR_IP:5173
3. Test features
```

## 🔍 Quick Debug

### Check Console:
```javascript
// Should see:
"Firebase initialized successfully"

// Should NOT see:
"Firebase initialization error"
"auth/configuration-not-found"
```

### Check Network:
```
1. F12 → Network tab
2. Try signing in
3. Look for failed requests
4. Check response errors
```

## ✅ Quick Verification

### Firebase Auth:
- [ ] Can sign up with email
- [ ] Can sign in with email
- [ ] Can sign in with Google
- [ ] Error messages show correctly

### Mobile Preview:
- [ ] Single column on mobile
- [ ] Thumbnails aligned
- [ ] No horizontal scroll
- [ ] Smooth scrolling works
- [ ] Template selection works

### Dark Mode:
- [ ] Toggle works on desktop
- [ ] Toggle works on mobile
- [ ] Theme persists after reload
- [ ] All colors change properly

## 📞 Need More Help?

See detailed docs:
- **FIREBASE_AUTH_FIX.md** - Firebase troubleshooting
- **MOBILE_PREVIEW_FIX.md** - Mobile layout details
- **TESTING_GUIDE.md** - Complete testing guide
- **FINAL_FIX_SUMMARY.md** - Complete summary
