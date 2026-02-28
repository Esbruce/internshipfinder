'use client'

import { useMemo, useState } from 'react'
import { Prospect } from '@/app/components/dashboard/types'

type GraphProps = {
  prospects: Prospect[]
  loadingProspects: boolean
}

type ViewMode = 'day' | 'week' | 'month'

type ChartPoint = {
  dateLabel: string
  discoveredCount: number
  periodStart: number
}

const BAR_COLOR = '#334155'
const GRID_COLOR = '#E2E8F0'
const AXIS_TEXT_COLOR = '#64748B'

function getStartOfWeek(date: Date) {
  const startOfWeek = new Date(date)
  const dayOfWeek = (startOfWeek.getDay() + 6) % 7
  startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek)
  startOfWeek.setHours(0, 0, 0, 0)
  return startOfWeek
}

function getStartOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export default function Graph({ prospects, loadingProspects }: GraphProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('day')
  const chartData = useMemo<ChartPoint[]>(() => {
    const discoveredByPeriod = new Map<string, ChartPoint>()

    prospects.forEach((prospect) => {
      if (prospect.status?.toLowerCase() !== 'discovered') return

      const createdAt = new Date(prospect.created_at)

      if (Number.isNaN(createdAt.getTime())) return

      let periodStartDate = new Date(createdAt)
      let key = ''
      let dateLabel = ''

      if (viewMode === 'week') {
        periodStartDate = getStartOfWeek(createdAt)
        key = `week-${periodStartDate.toISOString().slice(0, 10)}`
        dateLabel = `Wk ${periodStartDate.toLocaleDateString(undefined, {
          day: '2-digit',
          month: 'short',
        })}`
      } else if (viewMode === 'month') {
        periodStartDate = getStartOfMonth(createdAt)
        key = `month-${periodStartDate.getFullYear()}-${String(periodStartDate.getMonth() + 1).padStart(2, '0')}`
        dateLabel = periodStartDate.toLocaleDateString(undefined, {
          month: 'short',
          year: 'numeric',
        })
      } else {
        periodStartDate.setHours(0, 0, 0, 0)
        key = `day-${periodStartDate.toISOString().slice(0, 10)}`
        dateLabel = periodStartDate.toLocaleDateString(undefined, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      }

      const existing = discoveredByPeriod.get(key)
      if (existing) {
        existing.discoveredCount += 1
        return
      }

      discoveredByPeriod.set(key, {
        dateLabel,
        discoveredCount: 1,
        periodStart: periodStartDate.getTime(),
      })
    })

    return [...discoveredByPeriod.values()].sort((left, right) => left.periodStart - right.periodStart)
  }, [prospects, viewMode])

  const maxValue = Math.max(...chartData.map((item) => item.discoveredCount), 1)

  const chartHeight = 220
  const chartWidth = 560
  const leftPadding = 46
  const rightPadding = 24
  const topPadding = 20
  const bottomPadding = 34
  const plotWidth = chartWidth - leftPadding - rightPadding
  const plotHeight = chartHeight - topPadding - bottomPadding
  const barWidth = chartData.length > 0 ? Math.max(16, plotWidth / (chartData.length * 1.8)) : 0
  const gap = chartData.length > 1 ? (plotWidth - chartData.length * barWidth) / (chartData.length - 1) : 0
  const gridSteps = 4

  return (
    <section className="flex h-full min-h-0 flex-col rounded-2xl border border-slate-300 bg-white p-6 dark:border-slate-600 dark:bg-slate-800">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Outreach</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: BAR_COLOR }} />
            <span>Discovered</span>
          </div>
          <div className="inline-flex rounded-lg border border-slate-300 bg-slate-50 p-1 dark:border-slate-600 dark:bg-slate-900">
            {(['day', 'week', 'month'] as const).map((mode) => {
              const isActive = viewMode === mode
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`rounded-md px-3 py-1 text-sm font-medium capitalize transition ${
                    isActive
                      ? 'bg-slate-700 text-white dark:bg-slate-600'
                      : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {mode}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {loadingProspects ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">Loading outreach chart...</p>
      ) : chartData.length === 0 ? (
        <div className="flex min-h-0 flex-1 items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">
          No discovered prospects yet.
        </div>
      ) : (
        <div className="min-h-0 flex-1 w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-label={`Discovered prospects by creation ${viewMode}`}
            className="h-full min-w-[560px]"
          >
            {Array.from({ length: gridSteps + 1 }).map((_, index) => {
              const y = topPadding + (plotHeight / gridSteps) * index
              const yAxisValue = (maxValue * (gridSteps - index)) / gridSteps
              const yAxisLabel = Number.isInteger(yAxisValue) ? String(yAxisValue) : yAxisValue.toFixed(1)
              return (
                <g key={`grid-${index}`}>
                  <line
                    x1={leftPadding}
                    y1={y}
                    x2={chartWidth - rightPadding}
                    y2={y}
                    stroke={GRID_COLOR}
                    strokeWidth="0.5"
                  />
                  <text
                    x={leftPadding - 8}
                    y={y + 4}
                    textAnchor="end"
                    fill={AXIS_TEXT_COLOR}
                    fontSize="8"
                  >
                    {yAxisLabel}
                  </text>
                </g>
              )
            })}

            {chartData.map((point, index) => {
              const valueHeight = (point.discoveredCount / maxValue) * plotHeight
              const x = leftPadding + index * (barWidth + gap)
              const y = topPadding + (plotHeight - valueHeight)
              const labelX = x + barWidth / 2

              return (
                <g key={`${point.dateLabel}-${index}`}>
                  <rect x={x} y={y} width={barWidth} height={valueHeight} rx="4" fill={BAR_COLOR} />
                  <text
                    x={labelX}
                    y={chartHeight - 10}
                    textAnchor="middle"
                    fill={AXIS_TEXT_COLOR}
                    fontSize="8"
                  >
                    {point.dateLabel}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      )}
    </section>
  )
}
