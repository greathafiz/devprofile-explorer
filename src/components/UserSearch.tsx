import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchGithubUser, searchGithubUser } from "../api/github"
import { UserCard } from "./UserCard"
import { RecentSearches } from "./RecentSearches"
import { useDebounce } from "use-debounce"
import { SuggestionDropdown } from "./SuggestionDropdown"

const UserSearch = () => {
  const [username, setUsername] = useState("")
  const [submittedUsername, setSubmittedUsername] = useState("")
  const [recentUsers, setRecentUsers] = useState<string[]>(() => {
    const stored = localStorage.getItem("recentUsers")
    return stored ? JSON.parse(stored) : []
  })
  const [debouncedUsername] = useDebounce(username, 300)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername,
  })

  const { data: suggestions } = useQuery({
    queryKey: ["github-user-suggestions", debouncedUsername],
    queryFn: () => searchGithubUser(debouncedUsername),
    enabled: debouncedUsername.length > 1,
  })

  const handleSelectSuggestion = (selected: string) => {
    setUsername(selected)
    setShowSuggestions(false)
    if (submittedUsername !== selected) {
      setSubmittedUsername(selected)
    } else {
      refetch()
    }

    setRecentUsers((prev) => {
      const updated = [
        selected,
        ...prev.filter((username) => username !== selected),
      ]
      return updated.slice(0, 5)
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedUsername = username.trim()
    if (!trimmedUsername) return
    setSubmittedUsername(trimmedUsername)
    setUsername("")

    setRecentUsers((prev) => {
      const updated = [
        trimmedUsername,
        ...prev.filter((username) => username !== trimmedUsername),
      ]
      return updated.slice(0, 5)
    })
  }

  useEffect(() => {
    localStorage.setItem("recentUsers", JSON.stringify(recentUsers))
  }, [recentUsers])

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="dropdown-wrapper">
          <input
            type="text"
            placeholder="Enter GitHub Username..."
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value
              setUsername(val)
              setShowSuggestions(val.trim().length > 1)
            }}
          />

          {showSuggestions && suggestions?.items?.length > 0 && (
            <SuggestionDropdown
              show={showSuggestions}
              suggestions={suggestions.items}
              onSelect={handleSelectSuggestion}
            />
          )}
        </div>
        <button type="submit">Search</button>
      </form>

      {isLoading && <p className="status">Loading...</p>}
      {isError && <p className="status error">{error.message}</p>}

      {data && <UserCard user={data} />}

      {recentUsers.length > 0 && (
        <RecentSearches
          users={recentUsers}
          onSelect={(username) => {
            setUsername(username)
            setSubmittedUsername(username)
          }}
        />
      )}
    </>
  )
}

export default UserSearch
