# <img width="50" height="50" alt="adaptive-icon (1)" src="https://github.com/user-attachments/assets/ee108a2c-39bd-480e-a058-a9ab3e4dc905" /> PadFinder  

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

## App Logging System

### 1. Logger Implementation (Current)

- The app currently implements a custom in-app logging system using a persistent, rotated log storage:

- Logger Location: logger.ts

- Storage: react-native-mmkv (fast, persistent key-value storage)

- Console Override: All console.log, console.warn, and console.error calls are redirected to the logger.

- In-Memory Rotation: Keeps only the latest 500 logs in memory for efficiency.

- Persistence: Logs are saved in MMKV and survive app restarts.

- Log Viewer: LogViewer.tsx screen displays logs with timestamps, color-coded levels, and a “Clear” button.

### Why this approach for now:

- No backend required: Logs are stored and viewable directly in the app.

- Cost-efficient: Avoids running external services while still retaining visibility.

- Easy integration path: Sets up a uniform structure for logging, which will simplify sending logs to external systems like Grafana Cloud, Loki, or other visualization tools in the future.

### 2. Future Endeavors (Integration with External Loggers)

- Planned improvements and integrations:

- Grafana Cloud / Loki Integration

- Replace in-app MMKV persistence with a network logger.

- Send logs from the app directly to a Grafana Loki instance via HTTP or WebSocket.

- Use log levels (info, warn, error) for filtering in dashboards.

- Centralized Logging

- Aggregate logs from multiple app instances for analytics and debugging.

- Include device info, session identifiers, and user context in logs.

- Cost & Performance Optimizations

- Implement batching or throttling for network log uploads.

- Optionally store logs temporarily in MMKV if offline, then sync when online.

- Enhanced Log Viewer

- Real-time live updates with WebSocket subscription.

- Search, filter, and export logs for easier debugging.

#### Goal: Maintain a developer-friendly, cost-efficient, and scalable logging system, with the flexibility to integrate advanced logging and visualization tools as the app grows.

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
│       ├── adaptive-icon.png
│       ├── favicon.png
│       ├── icon.png
│       ├── no-image.png
│       ├── no-results.png
│       ├── splash-icon.png
│       └── welcome.png
│
├── components/                  # Shared reusable UI components
│   ├── Loader/
│   │   ├── LoaderOverlay.tsx
│   │   └── ...
│   ├── Container.tsx
│   ├── EmptyList.tsx
│   ├── ExternalLink.tsx
│   ├── StyledText.tsx
│   ├── Themed.tsx
│   ├── ThemedButton.tsx
│   └── ThemedCard.tsx
│
├── constants/                   # App-wide constant values
│   └── Colors.ts
│
├── services/                    # API service layer
│   ├── constants.ts
│   ├── LaunchesService.ts
│   └── LaunchpadService.ts
│
├── store/                       # Global state management (MMKV + Zustand)
│   ├── exampleStore.ts
│   ├── loaderStore.ts
│   ├── mmkv.ts
│   ├── spaceXStore.ts
│   └── variantStore.ts
│
├── types/                       # TypeScript types for services & data
│   ├── LaunchpadServiceTypes.ts
│   └── LaunchServiceTypes.ts
│
├── utils/                       # Utility functions
│   └── logger.ts                # Custom in-app logger with MMKV persistence
│
├── app.json                     # Expo app configuration
├── expo-env.d.ts                # Expo type declarations
├── package.json                 # Project dependencies & scripts
├── package-lock.json            # Dependency lockfile
└── tsconfig.json                # TypeScript configuration
```
---

## 🖼 Screenshots   

- ### Welcome Screen
  <img width="320" height="750" alt="image" src="https://github.com/user-attachments/assets/2aec57d8-8e42-48c7-920b-6a678269e250" />
- ### Launches List
  <img width="320" height="750" alt="image" src="https://github.com/user-attachments/assets/d11b2927-eeea-420b-bfc6-147efb345aa2" />
- ### Launch Details
  <img width="320" height="750" alt="image" src="https://github.com/user-attachments/assets/3ba6b470-6415-4362-adec-d069ad2b9cfb" />
- ### Launchpad Screen
  <img width="320" height="750" alt="image" src="https://github.com/user-attachments/assets/c8d1ae51-6843-4284-8b3c-d66b81aad578" />
- ### Favourites Empty
  <img width="320" height="750" alt="image" src="https://github.com/user-attachments/assets/1f15e0b7-5cd4-4092-95d8-8d75c03d5ec8" />
- ### Favourites
  <img width="320" height="750" alt="image" src="https://github.com/user-attachments/assets/4ad39b2d-b083-4694-ab9c-5ddae9ad56b1" />
---

## 🏁 Conclusion  

PadFinder is a modern React Native + Expo project showcasing **API integration, offline storage, theming, and native features** like location permissions. It’s designed as a learning playground and can be extended into a full-fledged space exploration companion app.  
