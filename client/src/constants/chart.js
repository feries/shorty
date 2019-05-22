import dayjs from 'dayjs'

export const linearOptions = {
  grid: {
    padding: {
      right: 35
    }
  },
  stroke: {
    curve: 'smooth'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100]
    }
  },
  noData: {
    text: 'NO DATA',
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: '#38b1c4',
      fontSize: '14px'
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      formatter: (value) => dayjs(value).format('DD/MM/YY')
    }
  },
  yaxis: {
    decimalsInFloat: 0,
    title: {
      text: 'Hint'
    }
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy'
    }
  },
  markers: {
    size: 3,
    colors: '#38b1c4',
    strokeColor: '#e3f4f7',
    strokeWidth: 1,
    strokeOpacity: 0.9,
    fillOpacity: 1,
    discrete: [],
    shape: 'circle',
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    hover: {
      size: 5,
      sizeOffset: 3
    }
  }
}

export const donutOptions = {
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
