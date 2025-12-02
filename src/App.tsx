import UserSearch from "./components/UserSearch"
import { Toaster } from 'sonner'

export default function App() {
  return (
    <div className="container">
      <h1>DevProfile Explorer</h1>
      <UserSearch />
      <Toaster position="top-right" richColors />
    </div>
  )
}
