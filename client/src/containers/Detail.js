import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

import DetailTopInfo from '../components/DetailTopInfo'

import { donutOptions, linearOptions } from '../constants/chart'
import { startFetchData } from '../actions/detail'
import { RANGE_ALL } from '../constants/common'

class Detail extends Component {
  state = {
    clicks: [{ name: 'Click', data: [] }],
    browserSeries: [],
    browserOptions: donutOptions,
    osSeries: [],
    osOptions: donutOptions
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    fetchStart: PropTypes.func.isRequired,
    longUrl: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    dayMap: PropTypes.shape().isRequired
  }

  static defaultProps = {
    longUrl: '',
    shortUrl: '',
    totalClick: 0,
    dayMap: {},
    browserMap: {},
    osMap: {}
  }

  componentDidMount() {
    const { id } = this.props
    this.props.fetchStart(id).then(() => {
      this.updateDaysMap()
      this.updateBrowserMap()
      this.updateOsMap()
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dayMap !== this.props.dayMap) this.updateDaysMap()
    if (prevProps.browserMap !== this.props.browserMap) this.updateBrowserMap()
    if (prevProps.osMap !== this.props.osMap) this.updateOsMap()
  }

  handleRangeChange = (range) => {
    const { id, fetchStart } = this.props
    fetchStart(id, true, range)
  }

  updateDaysMap = () => {
    const { dayMap } = this.props
    const data = []

    Object.keys(dayMap).forEach((key) => {
      data.push({ x: key, y: dayMap[key] })
    })

    this.setState({ clicks: [{ name: 'Click', data }] })
  }

  updateBrowserMap = () => {
    const { browserMap } = this.props
    const series = []
    const labels = []

    Object.keys(browserMap).forEach((key) => {
      labels.push(key)
      series.push(browserMap[key])
    })

    this.setState({
      browserOptions: {
        ...this.state.browserOptions
      }
    })
  }

  updateOsMap = () => {
    const { osMap } = this.props
    const series = []
    const labels = []

    Object.keys(osMap).forEach((key) => {
      labels.push(key)
      series.push(osMap[key])
    })
  }

  render() {
    const { longUrl, shortUrl, totalClick } = this.props
    const {
      clicks,
      browserSeries,
      browserOptions,
      osSeries,
      osOptions
    } = this.state

    return (
      <Fragment>
        <DetailTopInfo
          longUrl={longUrl}
          shortUrl={shortUrl}
          totalClick={totalClick}
          onRangeChange={this.handleRangeChange}
        />
        <div className="box">
          <Chart
            options={linearOptions}
            series={clicks}
            type="area"
            height="350"
          />
        </div>
        <div className="flex flex-space flex-stretch">
          <div className="box flex-grow m-right-x2">
            <Chart
              options={browserOptions}
              series={browserSeries}
              type="donut"
              width="380"
            />
          </div>
          <div className="box flex-grow m-left-x2">
            <Chart
              options={osOptions}
              series={osSeries}
              type="donut"
              width="380"
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ detail }) => ({
  shortUrl: detail.shortUrl,
  longUrl: detail.longUrl,
  totalClick: detail.totalClick,
  dayMap: detail.dayMap,
  browserMap: detail.browserMap
})

const mapDispatchToProps = (dispatch) => ({
  fetchStart: (externalId, hasRange = false, range = RANGE_ALL) =>
    dispatch(startFetchData(externalId, hasRange, range))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)
