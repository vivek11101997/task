import './App.css';
import Photo from './components/Photo.component';
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Photo />
      </div>
    </QueryClientProvider>
  );
}

export default App;
