import { api } from './client'

const reports = ['traffic', 'members', 'collection', 'subscriptions', 'renewal', 'followup', 'conversion', 'enquiry', 'expense', 'profit-loss', 'billing', 'sales-leaderboard', 'revenue-forecast', 'lead-source'] as const

type AnalysisApi = {
  [K in (typeof reports)[number] as K extends `${infer A}-${infer B}` ? `${A}${Capitalize<B>}` : K]: (params?: Record<string, string>) => Promise<unknown>
}

export const analysisApi = {} as AnalysisApi

reports.forEach(report => {
  const key = report.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) as keyof AnalysisApi
  analysisApi[key] = (params?: Record<string, string>) => api.get(`/analysis/${report}?${new URLSearchParams(params || {})}`)
})
