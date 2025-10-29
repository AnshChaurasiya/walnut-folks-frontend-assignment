const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://walnut-folks-frontend-assignment-backend.onrender.com'

/**
 * Get user's chart data from backend API
 * @param email User's email address
 * @returns Promise with chart data and existence flag
 */
export const getUserChartData = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/chart-data/${encodeURIComponent(email)}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching user chart data:', error)
    // Return default data on error
    return {
      data: {
        daily_call_volume: [45, 52, 48, 61, 55, 67, 59],
        average_call_duration: [120, 135, 142, 128, 151, 139, 145],
        call_sentiment: { positive: 68, neutral: 24, negative: 8 },
        agent_performance: [
          { name: "Agent Alpha", calls: 245, rating: 4.8 },
          { name: "Agent Beta", calls: 189, rating: 4.6 },
          { name: "Agent Gamma", calls: 167, rating: 4.7 },
          { name: "Agent Delta", calls: 203, rating: 4.5 }
        ],
        conversion_rate: [72, 68, 75, 71, 79, 74, 77]
      },
      is_existing: false
    }
  }
}

/**
 * Save user's chart data to backend API
 * @param email User's email address
 * @param chartData Chart data to save
 * @returns Promise with success status
 */
export const saveUserChartData = async (email: string, chartData: any): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/chart-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        chart_data: chartData
      })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Error saving chart data:', error)
    return false
  }
}

/**
 * Test backend connection
 * @returns Promise with health check status
 */
export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error testing backend connection:', error)
    return { status: 'error', message: 'Backend connection failed' }
  }
}

/**
 * Submit webhook transaction (for testing)
 * @param transactionData Transaction data
 * @returns Promise with transaction response
 */
export const submitWebhookTransaction = async (transactionData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/webhook/transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error submitting webhook transaction:', error)
    throw error
  }
}

/**
 * Check transaction status
 * @param transactionId Transaction ID to check
 * @returns Promise with transaction status
 */
export const getTransactionStatus = async (transactionId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/status/${transactionId}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching transaction status:', error)
    throw error
  }
}

/**
 * Validate email format
 * @param email Email to validate
 * @returns boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}