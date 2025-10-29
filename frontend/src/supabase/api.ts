import { supabase, TABLES, ChartData, DEFAULT_CHART_DATA } from './client'

/**
 * Get user's chart data from Supabase
 * @param email User's email address
 * @returns Promise with chart data or null if not found
 */
export const getUserChartData = async (email: string): Promise<ChartData | null> => {
  try {
    const { data, error } = await supabase
      .from(TABLES.CHART_DATA)
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found
        return null
      }
      throw error
    }

    return data as ChartData
  } catch (error) {
    console.error('Error fetching user chart data:', error)
    return null
  }
}

/**
 * Save or update user's chart data in Supabase
 * @param email User's email address
 * @param chartData Chart configuration and data to save
 * @returns Promise with success status
 */
export const saveUserChartData = async (
  email: string,
  chartData: ChartData['chart_data']
): Promise<boolean> => {
  try {
    // Check if user data already exists
    const existingData = await getUserChartData(email)

    if (existingData) {
      // Update existing record
      const { error } = await supabase
        .from(TABLES.CHART_DATA)
        .update({
          chart_data: chartData,
          updated_at: new Date().toISOString(),
        })
        .eq('email', email)

      if (error) throw error
    } else {
      // Create new record
      const { error } = await supabase
        .from(TABLES.CHART_DATA)
        .insert({
          email,
          chart_data: chartData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
    }

    return true
  } catch (error) {
    console.error('Error saving chart data:', error)
    return false
  }
}

/**
 * Get chart data for user or return default data
 * @param email User's email address
 * @returns Promise with chart data (either saved or default)
 */
export const getChartDataWithDefaults = async (email: string): Promise<{
  data: ChartData['chart_data']
  isExisting: boolean
}> => {
  try {
    const userData = await getUserChartData(email)

    if (userData) {
      return {
        data: userData.chart_data,
        isExisting: true,
      }
    } else {
      return {
        data: DEFAULT_CHART_DATA,
        isExisting: false,
      }
    }
  } catch (error) {
    console.error('Error getting chart data:', error)
    return {
      data: DEFAULT_CHART_DATA,
      isExisting: false,
    }
  }
}

/**
 * Check if email is valid format
 * @param email Email address to validate
 * @returns boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Clean and validate chart data before saving
 * @param data Raw chart data from user input
 * @returns Cleaned and validated chart data
 */
export const validateChartData = (data: any): ChartData['chart_data'] | null => {
  try {
    // Validate daily_call_volume
    const daily_call_volume = Array.isArray(data.daily_call_volume)
      ? data.daily_call_volume.filter((n: any) => typeof n === 'number' && n >= 0)
      : DEFAULT_CHART_DATA.daily_call_volume

    // Validate average_call_duration
    const average_call_duration = Array.isArray(data.average_call_duration)
      ? data.average_call_duration.filter((n: any) => typeof n === 'number' && n >= 0)
      : DEFAULT_CHART_DATA.average_call_duration

    // Validate call_sentiment
    const call_sentiment = {
      positive: typeof data.call_sentiment?.positive === 'number' 
        ? Math.max(0, Math.min(100, data.call_sentiment.positive))
        : DEFAULT_CHART_DATA.call_sentiment.positive,
      neutral: typeof data.call_sentiment?.neutral === 'number'
        ? Math.max(0, Math.min(100, data.call_sentiment.neutral))
        : DEFAULT_CHART_DATA.call_sentiment.neutral,
      negative: typeof data.call_sentiment?.negative === 'number'
        ? Math.max(0, Math.min(100, data.call_sentiment.negative))
        : DEFAULT_CHART_DATA.call_sentiment.negative,
    }

    // Validate agent_performance
    const agent_performance = Array.isArray(data.agent_performance)
      ? data.agent_performance.filter((agent: any) => 
          agent && 
          typeof agent.name === 'string' && 
          typeof agent.calls === 'number' && 
          typeof agent.rating === 'number'
        )
      : DEFAULT_CHART_DATA.agent_performance

    // Validate conversion_rate
    const conversion_rate = Array.isArray(data.conversion_rate)
      ? data.conversion_rate.filter((n: any) => typeof n === 'number' && n >= 0)
      : DEFAULT_CHART_DATA.conversion_rate

    return {
      daily_call_volume,
      average_call_duration,
      call_sentiment,
      agent_performance,
      conversion_rate,
    }
  } catch (error) {
    console.error('Error validating chart data:', error)
    return null
  }
}