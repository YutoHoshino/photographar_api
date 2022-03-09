// 時間フォーマット
import moment from 'moment'

interface Props {
  TargetDate: Date
  ComparisonDate: Date
}

export const UseDateComparison = (props:Props) => {

  const { TargetDate, ComparisonDate } = props

  return (moment(TargetDate).format('MM月DD日') == moment(ComparisonDate).format('MM月DD日'))
}