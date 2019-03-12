import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

import DetailTopInfo from '../components/DetailTopInfo'

import { donutOptions, linearOptions } from '../constants/chart'
import { startFetchData } from '../actions/detail'
import { RANGE_ALL } from '../constants/common'

const varSeries = [
  {
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }
]
const varSeriesDonut = [44, 55, 13, 33]

class Detail extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    fetchStart: PropTypes.func.isRequired,
    longUrl: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired
  }

  static defaultProps = {
    longUrl: '',
    shortUrl: '',
    totalClick: 0
  }

  componentDidMount() {
    const { id } = this.props
    this.props.fetchStart(id)
  }

  handleRangeChange = (range) => {
    const { id, fetchStart } = this.props
    fetchStart(id, true, range)
  }

  render() {
    const { longUrl, shortUrl, totalClick } = this.props

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
            series={varSeries}
            type="area"
            height="350"
          />
        </div>
        <div className="flex flex-space flex-stretch">
          <div className="box flex-grow m-right-x2">
            <Chart
              options={donutOptions}
              series={varSeriesDonut}
              type="donut"
              width="380"
            />
          </div>
          <div className="box flex-grow m-left-x2">
            <Chart
              options={donutOptions}
              series={varSeriesDonut}
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
  totalClick: detail.totalClick
})

const mapDispatchToProps = (dispatch) => ({
  fetchStart: (externalId, hasRange = false, range = RANGE_ALL) =>
    dispatch(startFetchData(externalId, hasRange, range))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)
