# Travel Map Application Specification

## Project Overview

- **Project name**: TravelMap
- **Type**: Next.js Web Application
- **Core functionality**: Interactive travel location map with Google Maps integration, displaying travel spots with name, coordinates, description, price, and external search links (Google Reviews, TikTok)
- **Target users**: Travelers looking to discover and explore locations

---

## UI/UX Specification

### Layout Structure

**Page Sections**:
1. **Header** - Fixed top navigation with app title
2. **Sidebar** - Left panel (320px) with location list/details
3. **Map Area** - Right main area with interactive map
4. **Location Cards** - Detailed view in sidebar

**Responsive Breakpoints**:
- Desktop: > 1024px (sidebar + map side by side)
- Tablet: 768px - 1024px (collapsible sidebar)
- Mobile: < 768px (stacked layout, map on top, list below)

### Visual Design

**Color Palette**:
- Background: `#0f0f0f` (deep black)
- Surface: `#1a1a1a` (card background)
- Surface Elevated: `#242424` (hover states)
- Primary: `#ff6b35` (vibrant orange - travel/exploration vibe)
- Primary Hover: `#ff8c5a`
- Accent: `#00d4aa` (teal for highlights)
- Text Primary: `#ffffff`
- Text Secondary: `#a0a0a0`
- Text Muted: `#666666`
- Border: `#333333`
- Price Tag: `#ffd700` (gold)

**Typography**:
- Font Family: `'Outfit', sans-serif` (headings), `'DM Sans', sans-serif` (body)
- Headings:
  - H1: 28px, weight 700
  - H2: 20px, weight 600
  - H3: 16px, weight 600
- Body: 14px, weight 400
- Small: 12px, weight 400

**Spacing System**:
- Base unit: 4px
- Padding: 16px (cards), 24px (sections)
- Gap: 12px (list items), 16px (sections)
- Border Radius: 12px (cards), 8px (buttons), 20px (pills)

**Visual Effects**:
- Card shadows: `0 4px 20px rgba(0,0,0,0.3)`
- Hover transitions: 200ms ease-out
- Map marker pulse animation
- Subtle gradient overlays on cards

### Components

**1. Header**
- App logo/title on left
- Search input (optional, for future)
- Theme: dark with subtle bottom border

**2. Location Card**
- Thumbnail image (16:9 ratio)
- Location name (H3)
- Description (2 lines, truncated)
- Price badge (top-right corner)
- Coordinates display
- Action buttons row

**3. Map Markers**
- Custom marker with price indicator
- Active marker state (scaled up)
- Popup on click with quick info

**4. Action Buttons**
- "View on Google Maps" - Opens external link
- "Google Reviews" - Searches reviews
- "TikTok Videos" - Searches TikTok

**5. Sidebar**
- Scrollable location list
- Selected location detail view
- Empty state with illustration

---

## Functionality Specification

### Core Features

1. **Interactive Map**
   - Display map using Leaflet (OpenStreetMap - free, no API key needed)
   - Custom markers for each location
   - Click marker to select location
   - Map controls (zoom, fullscreen)

2. **Location List**
   - Display all locations in sidebar
   - Click to select and center map
   - Show location preview (name, price, thumbnail)

3. **Location Details**
   - Full info display when location selected
   - Image gallery (single image for now)
   - Complete description
   - Price with currency
   - Lat/Lng coordinates

4. **External Links**
   - Google Maps: `https://www.google.com/maps/search/?api=1&query={lat},{lng}`
   - Google Reviews: `https://www.google.com/search?q={name}+reviews`
   - TikTok: `https://www.tiktok.com/search?q={name}+travel`

5. **Data Structure**
   ```typescript
   interface Location {
     id: string;
     name: string;
     lat: number;
     lng: number;
     description: string;
     price: number;
     currency: string;
     image: string;
     address: string;
   }
   ```

### Static Demo Data

5-6 sample locations with:
- Real coordinates (popular travel destinations)
- Placeholder images (Unsplash)
- Realistic prices

### Future-Ready Architecture

- API route structure: `/api/locations` (GET all, GET by id)
- Environment variable for Baserow API URL
- Toggle between static/demo data and API data
- Clean separation of data layer

---

## Acceptance Criteria

1. ✅ Next.js app runs without errors
2. ✅ Map displays with OpenStreetMap tiles (no API key required)
3. ✅ All locations show as markers on map
4. ✅ Clicking marker selects location and shows details
5. ✅ Clicking location in list centers map on that location
6. ✅ "View on Google Maps" opens correct Google Maps link
7. ✅ "Google Reviews" opens Google search for reviews
8. ✅ "TikTok" opens TikTok search
9. ✅ Price displays with proper formatting
10. ✅ Responsive layout works on mobile/tablet/desktop
11. ✅ API route structure ready for Baserow integration
12. ✅ Static data renders by default