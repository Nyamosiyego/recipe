import "./global.css"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AppNavigation from './src/navigation';


const Stack = createNativeStackNavigator();

function App() {
  return (
   <AppNavigation />
  );
}

export default App;

