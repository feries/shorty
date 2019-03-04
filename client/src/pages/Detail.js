import React, { Component } from 'react'
import Logo from '../components/Logo'
import BackToHome from '../components/BackToHome'
import DetailTopInfo from '../components/DetailTopInfo'

import Chart from 'react-apexcharts'

const varOption = {
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.6,
      opacityTo: 0.9,
      stops: [0, 90, 100]
    }
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-09-19T00:00:00',
      '2018-09-19T01:30:00',
      '2018-09-19T02:30:00',
      '2018-09-19T03:30:00',
      '2018-09-19T04:30:00',
      '2018-09-19T05:30:00',
      '2018-09-19T06:30:00'
    ]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    }
  }
}
const varSeries = [
  {
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }
]

const varOptionDonut = {
  options: {
    dataLabels: {
      enabled: false
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }
    ],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230
    }
  }
}
const varSeriesDonut = [44, 55, 13, 33]

const varOptionBar = {
  options: {
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: [
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct'
      ]
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return '$ ' + val + ' thousands'
        }
      }
    }
  }
}

const varSeriesBar = [
  {
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  },
  {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  },
  {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }
]

class Detail extends Component {
  render() {
    return (
      <div className="container">
        <div id="content" className="content m-top-x4">
          <div className="flex flex-space">
            <Logo className="logosmall" />
            <BackToHome />
          </div>
          <DetailTopInfo />
          <div className="box">
            <Chart
              options={varOption}
              series={varSeries}
              type="area"
              height="350"
            />
          </div>
          <div className="flex flex-space flex-stretch">
            <div className="box flex-grow m-right-x2">
              <Chart
                options={varOptionDonut}
                series={varSeriesDonut}
                type="donut"
                width="380"
              />
            </div>
            <div className="box flex-grow m-left-x2">
              <Chart
                options={varOptionDonut}
                series={varSeriesDonut}
                type="donut"
                width="380"
              />
            </div>
          </div>
          <div className="box">
            <Chart
              options={varOptionBar}
              series={varSeriesBar}
              type="bar"
              height="350"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Detail
