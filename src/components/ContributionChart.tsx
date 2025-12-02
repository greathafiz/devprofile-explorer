import { useState } from "react"

interface ContributionChartProps {
    username: string
}

export const ContributionChart = ({ username }: ContributionChartProps) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    const chartUrl = `https://ghchart.rshah.org/${username}`

    return (
        <div className="contribution-chart">
            <h3>📊 Contribution Activity (Last 12 Months)</h3>
            {!imageLoaded && !imageError && (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#6b7280',
                    fontSize: '0.9rem'
                }}>
                    Loading contribution chart...
                </div>
            )}
            {imageError && (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#ef4444',
                    fontSize: '0.9rem'
                }}>
                    Unable to load contribution chart
                </div>
            )}
            <img
                src={chartUrl}
                alt={`${username}'s GitHub contribution chart`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                style={{ display: imageLoaded ? 'block' : 'none' }}
            />
        </div>
    )
}
