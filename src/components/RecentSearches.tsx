import { useQueryClient } from "@tanstack/react-query"
import { PiClockBold, PiUserBold } from "react-icons/pi"
import { fetchGithubUser } from "../api/github"

interface RecentSearchesProps {
  users: string[]
  onSelect: (username: string) => void
}

export const RecentSearches = ({ users, onSelect }: RecentSearchesProps) => {
  const queryClient = useQueryClient()

  return (
    <div className="recent-searches">
      <div className="recent-header">
        <PiClockBold /> <h3>Recent Searches</h3>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <button
              onClick={() => onSelect(user)}
              onMouseEnter={() => {
                queryClient.prefetchQuery({
                  queryKey: ["users", user],
                  queryFn: () => fetchGithubUser(user),
                })
              }}
            >
              <PiUserBold className="user-icon" />
              {user}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
