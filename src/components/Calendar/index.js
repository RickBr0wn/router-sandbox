import React from 'react'
import './calendar.css'
import moment from 'moment'

export default class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.width = props.width || '350px'
    this.style = props.style || {}
  }

  state = {
    dateContext: moment(), // eg: moment("2019-06-17T12:14:58.472")
    today: moment(), // eg: moment("2019-06-17T12:14:58.472")
    showMonthPopUp: false,
    showYearPopUp: false,
    selectedDay: null,
    clickedDate: 'loading' // pass this as a prop, and will need a handler?
  }

  weekdays = moment.weekdays() // ['Sunday', 'Monday', 'Tuesday' ... ]
  weekdaysShort = moment.weekdaysShort() // ['Sun', 'Mon', 'Tues' ... ]
  months = moment.months() // eg: 5 => snapshot of current month

  year = () => this.state.dateContext.format('Y')
  month = () => this.state.dateContext.format('MMMM')
  daysInMonth = () => this.state.dateContext.daysInMonth()
  currentDate = () => this.state.dateContext.get('date')
  currentDay = () => this.state.dateContext.format('D')

  firstDayOfTheMonth = () => {
    const { dateContext } = this.state
    return moment(dateContext)
      .startOf('month')
      .format('d') // Day of week [number 0-6]
  }

  setMonth = month => {
    const monthNumber = this.months.indexOf(month)
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).set('month', monthNumber)
    this.setState({ dateContext: dateContext })
  }

  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).add(1, 'month')
    this.setState({ dateContext })
    this.props.onNextMonth && this.props.onNextMonth()
  }

  previousMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).subtract(1, 'month')
    this.setState({ dateContext })
    this.props.onPreviousMonth && this.props.onPreviousMonth()
  }

  onSelectChange = (e, month) => {
    this.setMonth(month)
    this.props.onChangeMonth && this.props.onChangeMonth()
  }

  SelectList = props => {
    let popup = props.data.map(month => {
      return (
        <div key={month}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
          <a
            onClick={e => {
              this.onSelectChange(e, month)
            }}
            href={null}>
            {month}
          </a>
        </div>
      )
    })
    return <div className='month-popup'>{popup}</div>
  }

  MonthNav = () => {
    return (
      <span
        onClick={e => {
          this.onChangeMonth(e, this.months)
        }}
        className='label-month'>
        {this.month()}
        {this.state.showMonthPopUp && <this.SelectList data={this.months} />}
      </span>
    )
  }

  showYearEditor = () => {
    this.setState({ showYearNav: true })
  }

  setYear = year => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).set('year', year)
    this.setState({ dateContext })
  }

  onYearChange = e => {
    this.setYear(e.target.value)
    this.props.onYearChange && this.props.onYearChange(e, e.target.value)
  }

  onKeyUpYear = e => {
    if (e.which === 13 || e.which === 27) {
      this.setYear(e.target.value)
      this.setState({ showYearNav: false })
    }
  }

  YearNav = () => {
    return this.state.showYearNav ? (
      <input
        defaultValue={this.year()}
        className='editor-year'
        ref={yearInput => (this.yearInput = yearInput)}
        onKeyUp={e => this.onKeyUpYear(e)}
        onChange={e => this.onYearChange(e)}
        type='number'
        placeholder='year'
      />
    ) : (
      <span
        className='label-year'
        onDoubleClick={e => {
          this.showYearEditor()
        }}>
        {this.year()}
      </span>
    )
  }

  onChangeMonth = (e, month) => {
    this.setState({ showMonthPopUp: !this.state.showMonthPopUp })
  }

  onDayClick = (e, day, month, year) => {
    const clickedDate = `${day} ${month} ${year}`
    this.setState(
      { clickedDate },
      () => this.props.onDayClick && this.props.onDayClick(e, day, month, year)
    )
  }

  render() {
    const weekdays = this.weekdaysShort.map(day => (
      <th key={day} className='week-day'>
        {day}
      </th>
    ))

    const blanks = []
    for (let i = 0; i < this.firstDayOfTheMonth(); i++) {
      blanks.push(
        <td key={i} className='empty-slot'>
          {''}
        </td>
      )
    }

    let datesInMonth = []
    for (let day = 1; day <= this.daysInMonth(); day++) {
      let className =
        day === this.currentDate() &&
        this.state.today.format('MMMM') === this.month() &&
        this.state.today.format('YYYY') === this.year()
          ? 'day current-day'
          : 'day'
      datesInMonth.push(
        <td key={Math.random()} className={className}>
          <span
            onClick={e => this.onDayClick(e, day, this.month(), this.year())}>
            {day}
          </span>
        </td>
      )
    }

    const totalSlots = [...blanks, ...datesInMonth]
    let rows = []
    let cells = []

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row)
      } else {
        let insertRow = cells.slice()
        rows.push(insertRow)
        cells = []
        cells.push(row)
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice()
        rows.push(insertRow)
      }
    })

    const trElems = rows.map((d, i) => {
      return <tr key={Math.random()}>{d}</tr>
    })
    console.log('props', this.props)
    return (
      <div className='calendar-container'>
        <table className='calendar'>
          <thead>
            <tr className='calendar-header'>
              <td colSpan='1' className='nav-month-left'>
                <i
                  className='prev fas fa-chevron-left left'
                  onClick={e => {
                    this.previousMonth()
                  }}
                />
              </td>
              <td colSpan='5'>
                <this.MonthNav /> <this.YearNav />
              </td>
              <td colSpan='1' className='nav-month'>
                <i
                  className='prev fas fa-chevron-right'
                  onClick={e => {
                    this.nextMonth()
                  }}
                />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: '#fff' }} />

            <tr>{weekdays}</tr>
            {trElems}
          </tbody>
        </table>
        {/* <code>
          <pre>PROPS: {JSON.stringify(this.props, null, 2)}</pre>
          <pre>STATE: {JSON.stringify(this.state, null, 2)}</pre>
        </code> */}
      </div>
    )
  }
}
