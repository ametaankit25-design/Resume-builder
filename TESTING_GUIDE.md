# Mobile Responsiveness Testing Guide

## Quick Test Instructions

### 1. Start Development Server
```bash
cd resume-builder
npm run dev
```

### 2. Test Dark Mode on Mobile

#### Using Chrome DevTools:
1. Open http://localhost:5173
2. Press `F12` to open DevTools
3. Press `Ctrl+Shift+M` (or click device icon) to toggle device mode
4. Select a mobile device (e.g., iPhone 12 Pro)
5. Click the moon/sun icon in navbar
6. **Expected**: Background should change from light to dark instantly
7. **Verify**: 
   - Navbar background changes
   - Page background changes
   - Text colors invert properly

#### Test on Real Device:
1. Find your computer's local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On mobile browser, visit: `http://YOUR_IP:5173`
3. Toggle dark mode
4. **Expected**: Instant theme change with smooth transition

### 3. Test Navbar on Mobile

1. Open site on mobile view
2. Click hamburger menu (three lines)
3. **Expected**:
   - Menu slides down smoothly
   - Menu is scrollable if content overflows
   - All buttons are easily tappable (44px minimum)
   - Menu closes when clicking outside or selecting item

4. **Verify**:
   - Navbar stays at top when scrolling
   - No content overlap
   - Theme toggle works in mobile menu
   - Color palette selector works

### 4. Test Templates Page on Mobile

1. Navigate to templates page
2. **Expected on Mobile (< 640px)**:
   - Templates display in scrollable grid
   - Only template thumbnails visible (no preview panel)
   - Smooth scrolling
   - Templates are tappable
   - Selected template shows checkmark

3. **Expected on Tablet (641-1024px)**:
   - Templates in 2-column grid
   - Preview panel hidden
   - More spacing

4. **Expected on Desktop (> 1024px)**:
   - Split layout: templates left, preview right
   - Both sections independently scrollable
   - Edit and Download buttons visible

### 5. Test Form Inputs on Mobile

1. Go to form page
2. Tap any input field
3. **Expected**:
   - No zoom-in on iOS (font-size: 16px prevents this)
   - Keyboard appears smoothly
   - Input is fully visible
   - No horizontal scrolling

### 6. Test Theme Persistence

1. Toggle dark mode ON
2. Refresh page
3. **Expected**: Dark mode persists (saved in localStorage)
4. Change color theme (palette icon)
5. Refresh page
6. **Expected**: Color theme persists

## Common Issues & Solutions

### Issue: Dark mode not working on mobile
**Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: Navbar overlapping content
**Solution**: Verify navbar has `position: sticky` and `z-index: 100`

### Issue: Horizontal scrolling on mobile
**Solution**: Check `body { overflow-x: hidden; max-width: 100vw; }`

### Issue: Templates not scrolling
**Solution**: Verify `.templates-scroll-container` has `overflow-y: auto`

### Issue: Buttons too small on mobile
**Solution**: All buttons should have `min-height: 44px` and `min-width: 44px`

## Browser-Specific Testing

### iOS Safari
- Test input zoom prevention
- Test sticky navbar behavior
- Test dark mode toggle
- Test viewport height (`-webkit-fill-available`)

### Android Chrome
- Test theme switching
- Test navbar menu
- Test template scrolling
- Test touch targets

### Samsung Internet
- Test all core features
- Verify theme persistence
- Check navbar behavior

## Performance Testing

### Mobile Performance:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Mobile" device
4. Run audit
5. **Target Scores**:
   - Performance: > 80
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90

### Network Testing:
1. Open DevTools Network tab
2. Throttle to "Slow 3G"
3. Reload page
4. **Expected**: Page loads within 5 seconds

## Automated Testing Commands

```bash
# Build test
npm run build

# Lint test
npm run lint

# Preview production build
npm run preview
```

## Visual Regression Testing

### Before/After Comparison:
1. Take screenshots on mobile before changes
2. Take screenshots after changes
3. Compare:
   - Dark mode toggle
   - Navbar appearance
   - Templates layout
   - Form inputs

## Accessibility Testing

### Keyboard Navigation:
1. Use Tab key to navigate
2. **Expected**: All interactive elements focusable
3. Use Enter/Space to activate buttons
4. Use Escape to close modals/menus

### Screen Reader Testing:
1. Enable screen reader (VoiceOver on iOS, TalkBack on Android)
2. Navigate through app
3. **Expected**: All elements properly announced

## Sign-Off Checklist

- [ ] Dark mode works on mobile
- [ ] Navbar doesn't overlap content
- [ ] Mobile menu opens/closes properly
- [ ] Templates page is scrollable on mobile
- [ ] All buttons are easily tappable (44px+)
- [ ] No horizontal scrolling
- [ ] Theme persists after refresh
- [ ] Forms work without zoom on iOS
- [ ] Build completes successfully
- [ ] No ESLint errors
- [ ] Tested on real mobile device

## Reporting Issues

If you find any issues:
1. Note the device/browser
2. Note the screen size
3. Describe the expected vs actual behavior
4. Take a screenshot if possible
5. Check browser console for errors (F12)
