# 🚀 PadFinder  

**PadFinder** is a mobile app built with **Expo** and **React Native** that allows users to explore SpaceX launches, view launch details, explore launchpads, and manage their favourite missions. It provides a themed UI, offline storage for favourites, and smooth navigation using **Expo Router**.  

---

## ✨ Features  

- **Search & Filter** – Search launches by name and sort by date.  
- **Launch Details** – View detailed info about any launch including failures, images, and date.  
- **Launchpad Screen** – See launchpad locations on an embedded Google Maps iframe and calculate distance from your location.  
- **Favourites** – Save launches as favourites and access them anytime.  
- **Themed UI** – Custom theme system with dark/light modes, styled components, and variant-based theming.  
- **Persistent State** – Offline persistence using Zustand storage.  
- **Fallback Assets** – Default illustrations for missing launch images and "No Results" screens.  

---

## ⚙️ Local Setup  

1. Clone the repo:  
   ```bash
   git clone https://github.com/your-username/padfinder.git
   cd padfinder
   ```

2. Install dependencies:  
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the app:  
   ```bash
   npx expo start
   ```

4. Build for production (Expo prebuild required):  
   ```bash
   expo prebuild
   ```

   > ⚠️ **Why Prebuild?**  
   Some dependencies (like `expo-location` and `react-native-webview`) require **native configuration**, which Expo Go does not support out of the box. That’s why you cannot simply use Expo Go to run this project—you need to **prebuild** to generate native iOS/Android projects.  

---

## 🤝 Contribution Guide  

We welcome contributions!  

1. Fork the repository.  
2. Create a feature branch:  
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. Commit changes:  
   ```bash
   git commit -m "Add awesome feature"
   ```
4. Push branch and create a PR.  

Please follow the existing **code style** (Themed components, Zustand for state, Expo Router conventions).  

---

## 📂 File Structure  

Here’s a high-level structure of the project:

```
.
├── app/                         # All screens & navigation routes
│   ├── (first_time)/            # Screens shown only during the first launch
│   │   ├── _layout.tsx          # Layout wrapper for first-time screens
│   │   └── index.tsx            # Welcome / onboarding screen
│   │
│   ├── (individual)/            # Individual launch or launchpad detail screens
│   │   ├── _layout.tsx          # Layout wrapper for individual screens
│   │   ├── launchDetails.tsx    # Launch details screen (with favourites)
│   │   └── launchpad.tsx        # Launchpad details screen (with map + distance)
│   │
│   ├── (tabs)/                  # Main tab navigation screens
│   │   ├── _layout.tsx          # Tab layout (navigation between tabs)
│   │   ├── favourite.tsx        # User’s favourite launches list
│   │   └── index.tsx            # Main launches list with search & filters
│   │
│   ├── _layout.tsx              # Root layout for the entire app
│   ├── +html.tsx                # HTML document customization
│   └── +not-found.tsx           # 404-like not found screen
│
├── assets/                      # Static assets (images, fonts, icons)
│   ├── fonts/
│   │   └── SpaceMono-Regular.ttf
│   └── images/
│       ├── adaptive-icon.png    # App adaptive icon
│       ├── favicon.png          # Favicon for web build
│       ├── icon.png             # App icon
│       ├── no-image.png         # Default placeholder image for launches
│       ├── no-results.png       # Image shown for empty search results
│       ├── splash-icon.png      # Splash screen icon
│       └── welcome.png          # Onboarding / welcome illustration
│
├── components/                  # Shared reusable UI components
│   ├── Loader/                  # Loading indicators & overlays
│   │   ├── LoaderOverlay.tsx
│   │   └── ...
│   ├── Container.tsx            # Page container with theming
│   ├── EmptyList.tsx            # Empty state component for lists
│   ├── ExternalLink.tsx         # Opens external links safely
│   ├── StyledText.tsx           # Styled text wrapper
│   ├── Themed.tsx               # Themed View & Text components
│   ├── ThemedButton.tsx         # Themed button component
│   └── ThemedCard.tsx           # Themed card component
│
├── constants/                   # App-wide constant values
│   └── Colors.ts                # Theme colors & palette
│
├── services/                    # API service layer
│   ├── constants.ts             # API constants (base URLs, etc.)
│   ├── LaunchesService.ts       # Fetch launches data from SpaceX API
│   └── LaunchpadService.ts      # Fetch launchpad data from SpaceX API
│
├── store/                       # Global state management (MMKV + Zustand)
│   ├── exampleStore.ts          # Example store (template)
│   ├── loaderStore.ts           # Store for loader overlay state
│   ├── mmkv.ts                  # MMKV storage initialization
│   ├── spaceXStore.ts           # Store for favourites & first-time logic
│   └── variantStore.ts          # Store for theme variants
│
├── types/                       # TypeScript types for services & data
│   ├── LaunchpadServiceTypes.ts # Types for launchpad data
│   └── LaunchServiceTypes.ts    # Types for launches data
│
├── app.json                     # Expo app configuration
├── expo-env.d.ts                # Expo type declarations
├── package.json                 # Project dependencies & scripts
├── package-lock.json            # Dependency lockfile
└── tsconfig.json                # TypeScript configuration

```

---

## 🖼 Screenshots   

- ![Welcome Screen](assets/screenshots/launch-list.png)  
- ![Launches List](assets/screenshots/launch-list.png)  
- ![Launch Details](assets/screenshots/launch-details.png)  
- ![Launchpad Screen](assets/screenshots/launchpad.png)  
- ![Favourites](assets/screenshots/favourites.png)  

---

## 🏁 Conclusion  

PadFinder is a modern React Native + Expo project showcasing **API integration, offline storage, theming, and native features** like location permissions. It’s designed as a learning playground and can be extended into a full-fledged space exploration companion app.  
