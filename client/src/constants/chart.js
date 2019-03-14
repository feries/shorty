export const linearOptions = {
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
    type: 'datetime'
  },
  yaxis: {
    forceNiceScale: true,
    title: {
      text: 'Hint'
    }
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy'
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
