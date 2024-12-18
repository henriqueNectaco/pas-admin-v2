import React from 'react'
import { DateRangePicker, RangeValue } from '@nextui-org/react'
import { parseZonedDateTime, ZonedDateTime } from '@internationalized/date'

type PropsType = {
  setValue: (value: RangeValue<ZonedDateTime> | null) => void
}
export default function DateRangeWithTimer(props: PropsType) {
  const today = new Date()
  const startDate = parseZonedDateTime(
    today.toISOString().split('T')[0] + 'T00:00[America/Sao_Paulo]',
  )
  const endDate = parseZonedDateTime(
    today.toISOString().split('T')[0] + 'T23:59[America/Sao_Paulo]',
  )

  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DateRangePicker
        hourCycle={24}
        label="Event duration"
        hideTimeZone
        visibleMonths={2}
        defaultValue={{
          start: startDate,
          end: endDate,
        }}
        onChange={props.setValue}
      />
    </div>
  )
}
