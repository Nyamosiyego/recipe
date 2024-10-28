
# Recipe Book App 🍽️

## Overview
The Recipe Book App is a simple mobile application built using React Native, designed to allow users to view, add, and explore various recipes. This project emphasizes component organization, state management, navigation, and creating a mobile-responsive layout.

## Features
1. **Recipe List:** 
   - Displays a list of recipe names with brief descriptions on the main screen.
   
2. **Add Recipe Form:** 
   - Users can add new recipes through a dedicated form with fields for:
     - Recipe Name 📝
     - Description 📖
     - Ingredients (comma-separated) 🥗
     - Instructions 🍳
   - Upon submission, the new recipe is added to the main recipe list.

3. **Recipe Details:** 
   - Users can tap on a recipe to view detailed information, including ingredients and cooking instructions.
   - A "Back" button allows easy navigation back to the main list. 🔙

4. **Styling:** 
   - The app features a clean, mobile-friendly design that adapts well to various screen sizes. 📱

5. **Optional Features:** 
   - A search bar for filtering recipes by name 🔍.
   - A "Favorite" button to mark recipes as favorites ⭐ and filter the list accordingly.

## Technologies Used
- **React Native:** The core framework for building the app.
- **Bun:** A fast and efficient JavaScript runtime used for package management and development. 🚀
  
## Key Packages
- **@react-navigation/native:** 
  - Used for navigation between different screens (e.g., Home, Add Recipe, Recipe Details). This package simplifies managing the navigation stack and enhances user experience.
  
- **@react-navigation/native-stack:** 
  - Enables the creation of a stack navigator for smooth transitions between screens. This is crucial for maintaining a logical flow in navigation.
  
- **react-native-reanimated:** 
  - Implemented for animations, enhancing the UI with smooth transitions and feedback on user interactions (e.g., when adding or viewing recipes). 🎉

- **@react-native-async-storage/async-storage:** 
  - Used to persist recipes locally, allowing users to retain their added recipes even after the app is closed and reopened. 💾

- **axios:** 
  - Utilized for making HTTP requests, particularly useful for fetching any external data, such as recipe details from an API if extended in future versions.

- **react-native-heroicons:** 
  - Provides icon components that are easy to use and integrate into the app, adding visual appeal to buttons and navigation elements. 🖼️

- **react-native-responsive-screen:** 
  - This package is used for creating responsive designs, ensuring the app looks great on devices of all sizes by adapting dimensions based on screen size.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Nyamosiyego/recipe.git
   cd recipe-book-app
   ```

2. Install dependencies using Bun:
   ```bash
   bun install
   ```

3. Run the app:
   ```bash
   bun start
   ```

## Contribution
Feel free to fork the repository and submit pull requests for enhancements or bug fixes. 🤝

## License
This project is licensed under the MIT License. 📜

## Acknowledgements
Special thanks to the [React Native community](https://reactnative.dev/) for providing such a robust framework and all the supporting libraries that enhance app development. 🙌
