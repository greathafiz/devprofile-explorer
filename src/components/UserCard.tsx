import type { GitHubUser } from "../types"
import { PiGithubLogoBold } from "react-icons/pi"
import { ContributionChart } from "./ContributionChart"

export const UserCard = ({ user }: { user: GitHubUser }) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.name} className="avatar" />
      <h2>{user.name || user.login}</h2>
      <p className="bio">{user.bio}</p>

      <div className="user-card-buttons">
        <a
          href={user.html_url}
          className="profile-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PiGithubLogoBold /> View GitHub Profile
        </a>
      </div>

      <ContributionChart username={user.login} />
    </div>
  )
}

