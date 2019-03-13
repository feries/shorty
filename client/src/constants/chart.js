export const linearOptions = {
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
    categories: []
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy'
    }
  }
}

export const donutOptions = {
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
